using System;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.Application.DTOs.Request;

    public class RequestDeleteDto
    {
        [Required]
        public Guid Id { get; set; }

        public bool IsDeleted { get; set; } = true;
    }

    
    public class RequestResolveDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required, MinLength(2)]
        public string Feedback { get; set; } = string.Empty;

        public bool IsResolved { get; set; } = true;
    }