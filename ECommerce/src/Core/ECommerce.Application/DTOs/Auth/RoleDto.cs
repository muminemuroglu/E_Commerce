namespace ECommerce.Application.DTOs.Auth;

public class RoleDto
{
    public Guid UserId { get; set; }
    public string RoleName { get; set; } = string.Empty;
}