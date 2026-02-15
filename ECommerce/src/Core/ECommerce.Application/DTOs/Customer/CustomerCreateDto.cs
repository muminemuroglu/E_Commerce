using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Customer;

public class CustomerCreateDto
{

    [Required(ErrorMessage = "Adınızı yazınız.")]
    [MaxLength(150)]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Soyadınızı yazınız.")]
    [MaxLength(150)]
    public string LastName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email adresi zorunludur.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Telefon numarası zorunludur.")]
    public string PhoneNumber { get; set; } = string.Empty;

    [Required(ErrorMessage = "Adres zorunludur.")]
    public string? Address { get; set; }

    [Required(ErrorMessage = "Şehir zorunludur.")]
    public string City { get; set; } = string.Empty;

   
    [Required]
    public Guid UserId { get; set; }


}