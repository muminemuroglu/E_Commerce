using ECommerce.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Order;

public class OrderDto
{
    [Required]
    public Guid Id { get; set; }

    [Required(ErrorMessage = "Sipariş numarası zorunludur.")]
    public string OrderNumber { get; set; } = string.Empty;
    [Required(ErrorMessage = "Toplam tutar zorunludur.")]
    public decimal TotalAmount { get; set; }
    [Required(ErrorMessage = "Sipariş durumu zorunludur.")]
    public OrderStatus Status { get; set; }

    public List<OrderItemDto> OrderItems { get; set; } = new();


    // BaseEntity
    public bool StatusFlag { get; set; } // çakışma olmasın diye isim verdim (aşağıdaki notu oku)
    public bool IsDeleted { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }
}
