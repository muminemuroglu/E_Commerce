using ECommerce.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Order;

public class OrderUpdateDto
{
    [Required]
    public Guid Id { get; set; }

    [Required]
    public OrderStatus Status { get; set; }
}