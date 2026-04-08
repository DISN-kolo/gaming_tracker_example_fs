using Ggs.Api.Data;
using Ggs.Api.DTOs;
using Ggs.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Ggs.Api.Services;

public class GameService
{
	private readonly AppDbContext _context;

	public GameService(AppDbContext context)
	{
		_context = context;
	}

	public async Task<IEnumerable<GameDto>> GetAllAsync(Guid userId)
	{
		return await _context.Games
			.Where(g => g.UserId == userId)
			.Select(g => new GameDto
			{
				Id = g.Id,
				Title = g.Title,
			})
			.ToListAsync();
	}

	public async Task<GameDto?> GetByIdAsync(Guid id)
	{
		var game = await _context.Games.FindAsync(id);
		if (game is null)
		{
			return null;
		}
		return new GameDto
		{
			Id = game.Id,
			Title = game.Title,
		};
	}

	public async Task<GameDto> CreateAsync(Guid userId, CreateGameRequest request)
	{
		var game = new Game
		{
			Id = Guid.NewGuid(),
			Title = request.Title,
			UserId = userId,
		};
		_context.Games.Add(game);
		await _context.SaveChangesAsync();

		return new GameDto
		{
			Id = game.Id,
			Title = game.Title,
		};
	}

	public async Task<bool> DeleteAsync(Guid id)
	{
		var game = await _context.Games.FindAsync(id);
		if (game is null)
		{
			return false;
		}
		_context.Games.Remove(game);
		await _context.SaveChangesAsync();
		return true;
	}
}
