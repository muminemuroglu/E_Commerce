using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Cargo;
public class CargoDto
{
    public Guid Id { get; set; }

    [Required(ErrorMessage = "Ürün adı zorunludur.")]
    [MaxLength(150)]
    public string Name { get; set; } = string.Empty;
    public string? TrackingUrlPrefix { get; set; }

    [Required(ErrorMessage = "Fiyat zorunludur.")]
    [Range(0.01, double.MaxValue, ErrorMessage = "Fiyat 0'dan büyük olmalıdır.")]
    public decimal BasePrice { get; set; }
    public Guid CompanyId { get; set; }

    // BaseEntity
    public bool Status { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
}