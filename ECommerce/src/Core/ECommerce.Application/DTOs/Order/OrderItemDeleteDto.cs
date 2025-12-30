namespace ECommerce.Application.DTOs.Order;


using System.ComponentModel.DataAnnotations;

public class OrderItemDeleteDto
{ 
    [Required]
    public Guid Id { get; set; }

    public bool IsDeleted { get; set; } = true;
 }