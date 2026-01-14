using ECommerce.Domain.Entities;
using ECommerce.Domain.Interfaces;
using ECommerce.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ECommerce.Infrastructure.Repositories;

public class CargoRepository : GenericRepository<Cargo>, ICargoRepository
{
    private new readonly AppDbContext _context;

    public CargoRepository(AppDbContext context) : base(context)
     {
        _context = context;
    }

    /*public async Task<IEnumerable<Cargo>> GetAllWithDetailsAsync(Guid? companyId)
{
    return await _context.Cargoes
        .Include(c => c.Order)                  // Kargonun bağlı olduğu siparişi getir
            .ThenInclude(o => o.Customer)       // Siparişin bağlı olduğu müşteriyi getir
                .ThenInclude(cust => cust.User) // Müşterinin isim bilgilerini (User tablosu) getir
        .Where(c => !c.IsDeleted && (!companyId.HasValue || c.CompanyId == companyId.Value))
        .AsNoTracking()
        .ToListAsync();
}*/
    
    
}