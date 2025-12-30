using ECommerce.Application.DTOs.Category;
using ECommerce.Application.DTOs.Customer;
using ECommerce.Application.Responses;

namespace ECommerce.Application.Interfaces;
public interface ICustomerService {
    //Task<ApiResponse<CustomerDto>> GetByUserIdAsync(Guid userId);
    //Task<ApiResponse<bool>> UpdateProfileAsync(CustomerUpdateDto dto);

    Task<ApiResponse<IEnumerable<CustomerDto>>> GetAllAsync();
   
    Task<ApiResponse<Guid>> CreateAsync(CustomerCreateDto dto);

    Task<ApiResponse<IEnumerable<CustomerDto>>> SearchAsync(string keyword);


    
}