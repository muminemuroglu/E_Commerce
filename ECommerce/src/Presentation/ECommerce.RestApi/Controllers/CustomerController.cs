using ECommerce.Application.DTOs.Customer;
using ECommerce.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ECommerce.RestApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CustomerController : ControllerBase
{
    private readonly ICustomerService _customerService;
    public CustomerController(ICustomerService customerService) => _customerService = customerService;

    [HttpPost]
    public async Task<IActionResult> Create(CustomerCreateDto dto) => Ok(await _customerService.CreateAsync(dto));

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _customerService.GetAllAsync());


   [HttpGet("Search")]
   public async Task<IActionResult> Search([FromQuery] string keyword)
   {
    var result = await _customerService.SearchAsync(keyword);
    return Ok(result);
   }
}