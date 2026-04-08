using Ggs.Api.DTOs;
using Ggs.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Ggs.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
	private readonly AuthService _authService;

	public AuthController(AuthService authService)
	{
		_authService = authService;
	}

	[HttpPost("register")]
	public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request)
	{
		var response = await _authService.RegisterAsync(request);
		if (response is null)
		{
			return Conflict("email already in use");
		}
		return Ok(response);
	}

	[HttpPost("login")]
	public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
	{
		var response = await _authService.LoginAsync(request);
		if (response is null)
		{
			return Unauthorized();
		}
		return Ok(response);
	}
}
