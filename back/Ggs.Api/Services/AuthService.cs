using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Ggs.Api.Data;
using Ggs.Api.DTOs;
using Ggs.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Ggs.Api.Services;

public class AuthService
{
	private readonly AppDbContext _context;
	private readonly IConfiguration _configuration;

	public AuthService(AppDbContext context, IConfiguration configuration)
	{
		_context = context;
		_configuration = configuration;
	}

	public async Task<AuthResponse?> RegisterAsync(RegisterRequest request)
	{
		if (await _context.Users.AnyAsync(u => u.Email == request.Email))
		{
			return null;
		}

		var user = new User
		{
			Id = Guid.NewGuid(),
			Email = request.Email,
			Name = request.Name,
			Games = new List<Game>(),
		};
		var hasher = new PasswordHasher<User>();
		user.PasswordHash = hasher.HashPassword(user, request.Password);

		_context.Users.Add(user);
		await _context.SaveChangesAsync();

		return new AuthResponse { Token = GenerateToken(user) };
	}

	public async Task<AuthResponse?> LoginAsync(LoginRequest request)
	{
		var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == request.Email);
		if (user is null)
		{
			return null;
		}

		var hasher = new PasswordHasher<User>();
		var result = hasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
		if (result == PasswordVerificationResult.Failed)
		{
			return null;
		}

		return new AuthResponse { Token = GenerateToken(user) };
	}

	public async Task<MeResponse?> MeAsync(Guid userId)
	{
		return await _context.Users
			.Where(u => u.Id == userId)
			.Select(u => new MeResponse
			{
				Name = u.Name,
				Email = u.Email,
			})
			.SingleOrDefaultAsync();
	}

	private string GenerateToken(User user)
	{
		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
		var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

		var claims = new[]
		{
			new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
			new Claim(ClaimTypes.Email, user.Email),
		};

		var token = new JwtSecurityToken(
			issuer: _configuration["Jwt:Issuer"],
			audience: _configuration["Jwt:Audience"],
			claims: claims,
			expires: DateTime.UtcNow.AddDays(7),
			signingCredentials: creds
		);

		return new JwtSecurityTokenHandler().WriteToken(token);
	}
}
