using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Brand;
public class BrandDeleteDto
    {
        [Required]
        public Guid Id { get; set; }

        // Soft-delete için (istersen controller sadece Id ile de silebilir)
        public bool IsDeleted { get; set; } = true;
    }