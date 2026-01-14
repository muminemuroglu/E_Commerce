using ECommerce.Application.DTOs.Dashboard;
using ECommerce.Application.Responses;

namespace ECommerce.Application.Interfaces;

public interface IDashboardService
{
    Task<ApiResponse<DashboardStatsDto>> GetStatsAsync(Guid? companyId, string role);
}