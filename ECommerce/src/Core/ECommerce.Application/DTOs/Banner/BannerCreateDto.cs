using System;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Banner;

    public class BannerCreateDto
    {
        [Required, MinLength(2)]
        public string Title { get; set; } = string.Empty;

        public string? ImageUrl { get; set; }
        public string? TargetUrl { get; set; }

        [Range(0, int.MaxValue)]
        public int Order { get; set; }

        public bool Status { get; set; }

        [Required]
        public Guid CompanyId { get; set; }
    }

