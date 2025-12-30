using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Banner;
    public class BannerDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string? TargetUrl { get; set; }
        public int Order { get; set; } 

        public Guid CompanyId { get; set; }

        // BaseEntity
        public bool Status { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }