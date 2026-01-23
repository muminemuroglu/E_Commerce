using ECommerce.Application.DTOs.Category;
using ECommerce.Application.DTOs.Customer;
using ECommerce.Application.Responses;

namespace ECommerce.Application.Interfaces;
public interface ICustomerService {
    //Task<ApiResponse<CustomerDto>> GetByUserIdAsync(Guid userId);
    //Task<ApiResponse<bool>> UpdateProfileAsync(CustomerUpdateDto dto);

   Task<ApiResponse<Guid>> CreateAsync(CustomerCreateDto dto);
    
    // Değişen kısım: Parametreleri ekledik
    Task<ApiResponse<IEnumerable<CustomerDto>>> GetAllAsync(Guid? currentCompanyId, string role);
    
    Task<ApiResponse<IEnumerable<CustomerDto>>> SearchAsync(string keyword);
    
    // Bu metoda gerek kalmadı çünkü GetAllAsync zaten bu işi rol bazlı yapıyor
    // Task<ApiResponse<IEnumerable<CustomerDto>>> GetByCompanyIdAsync(Guid companyId);

    Task<ApiResponse<CustomerDto>> GetByIdAsync(Guid id);

    Task<ApiResponse<bool>> UpdateProfileAsync(CustomerUpdateDto dto);
    Task<ApiResponse<CustomerDto>> GetProfileByUserIdAsync(Guid userId);

}



