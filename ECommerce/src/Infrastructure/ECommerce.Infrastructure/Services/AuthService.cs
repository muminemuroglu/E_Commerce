using AutoMapper;
using ECommerce.Application.DTOs.Auth;
using ECommerce.Application.Helpers;
using ECommerce.Application.Interfaces;
using ECommerce.Application.Responses;
using ECommerce.Domain.Entities;
using ECommerce.Domain.Interfaces;

namespace ECommerce.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public AuthService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<ApiResponse<string>> LoginAsync(LoginDto dto)
    {
        // 1. Kullanıcıyı bul
        var users = await _unitOfWork.Users.FindAsync(u => u.Email == dto.Email);
        var user = users.FirstOrDefault();

        if (user == null)
            return ApiResponse<string>.ErrorResult("E-posta veya şifre hatalı.");

        // 2. Şifreyi doğrula
        if (!PasswordHasher.VerifyPassword(dto.Password, user.PasswordHash))
            return ApiResponse<string>.ErrorResult("E-posta veya şifre hatalı.");

        // 3. Token Üret
        //  Ad ve Soyadı birleştiriyoruz
        string fullName = $"{user.FirstName} {user.LastName}";

        var token = JwtTokenHelper.GenerateToken(
            user.Id,
            user.Email,
            fullName, //Parametre olarak gönderiyoruz
            user.CompanyId ?? Guid.Empty,
            new List<string> { user.Role }
        );

        return ApiResponse<string>.SuccessResult(token, "Giriş başarılı.");
    }

    public async Task<ApiResponse<Guid>> RegisterWithCompanyAsync(RegisterCompanyDto dto)
    {
        // 1. Email kontrolü
        var existingUser = await _unitOfWork.Users.FindAsync(u => u.Email == dto.Email);
        if (existingUser.Any()) return ApiResponse<Guid>.ErrorResult("Email zaten kayıtlı.");

        // 2. Önce şirketi oluşturuyoruz, çünkü kullanıcı kaydında CompanyId'ye ihtiyacımız var
        var newCompany = new Company
        {
            Id = Guid.NewGuid(),
            Name = dto.CompanyName,
            Phone = dto.Phone,
            TaxNumber = dto.TaxNumber,
            City = dto.City,
            District = dto.District,
            FullAddress = dto.FullAddress,
            Status = true
        };
        await _unitOfWork.Companies.AddAsync(newCompany);

        // 3. Sonra kullanıcıyı oluşturuyoruz ve yeni şirketin Id'sini atıyoruz
        var user = new User
        {
            Id = Guid.NewGuid(),
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            PasswordHash = PasswordHasher.HashPassword(dto.Password),
            Role = "Staff", // Kayıt olan kişi Staff
            CompanyId = newCompany.Id 
        };

        await _unitOfWork.Users.AddAsync(user);

        // UnitOfWork sayesinde ikisi birden aynı anda kaydedilir (Transaction)
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse<Guid>.SuccessResult(user.Id, "Şirket ve yönetici kaydı başarılı.");
    }


    //Giriş yapan şirkete kullanıcı ekleme metodu
    public async Task<ApiResponse<Guid>> RegisterForCompanyAsync(RegisterDto dto, Guid companyId)
    {
        // 1. Email kontrolü
        var existingUser = await _unitOfWork.Users.FindAsync(u => u.Email == dto.Email);
        if (existingUser.Any()) return ApiResponse<Guid>.ErrorResult("Email zaten kayıtlı.");

        // 2. Kullanıcıyı oluşturuyoruz ve şirket Id'sini atıyoruz
        var user = new User
        {
            Id = Guid.NewGuid(),
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            PasswordHash = PasswordHasher.HashPassword(dto.Password),
            Role = "Staff", // Rol dışarıdan alınır
            CompanyId = companyId // Giriş yapan kullanıcının şirketi atanır
        };

        await _unitOfWork.Users.AddAsync(user);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse<Guid>.SuccessResult(user.Id, "Şirket personeli kaydı başarılı.");
    }

   

    public async Task<ApiResponse<bool>> ChangePasswordAsync(ChangePasswordDto dto)
    {
        var user = await _unitOfWork.Users.GetByIdAsync(dto.UserId);
        if (user == null) return ApiResponse<bool>.ErrorResult("Kullanıcı bulunamadı.");

        // 1. Mevcut şifreyi doğruluyrouz (DB'deki Hash ile girilen şifreyi karşılaştırıyoruz)
        if (!PasswordHasher.VerifyPassword(dto.CurrentPassword, user.PasswordHash))
        {
            return ApiResponse<bool>.ErrorResult("Mevcut şifreniz hatalı.");
        }

        // 2. Yeni şifreyi hash'leyip ve kaydediyoruz
        user.PasswordHash = PasswordHasher.HashPassword(dto.NewPassword);
        user.UpdatedDate = DateTime.UtcNow;

        _unitOfWork.Users.Update(user);
        await _unitOfWork.SaveChangesAsync();

        return ApiResponse<bool>.SuccessResult(true, "Şifreniz başarıyla güncellendi.");
    }

    public async Task<ApiResponse<Guid>> RegisterCustomerAsync(RegisterDto dto)
{
    var existingUser = await _unitOfWork.Users.FindAsync(u => u.Email == dto.Email);
    if (existingUser.Any()) return ApiResponse<Guid>.ErrorResult("Email zaten kayıtlı.");

    var user = new User
    {
        Id = Guid.NewGuid(),
        FirstName = dto.FirstName,
        LastName = dto.LastName,
        Email = dto.Email,
        PasswordHash = PasswordHasher.HashPassword(dto.Password),
        Role = "Customer", // Rolü Müşteri yapıyoruz
        CompanyId = null // Bireysel müşteri olduğu için şirket yok
    };

    await _unitOfWork.Users.AddAsync(user);
    await _unitOfWork.SaveChangesAsync();

    return ApiResponse<Guid>.SuccessResult(user.Id, "Kayıt başarılı.");
}


}
