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

	public async Task<IEnumerable<GameResponse>> GetCatalogAsync()
	{
		var result = await _context.Games
			.Select(g => new GameResponse
			{
				Id = g.Id,
				Title = g.Title,
				ReleaseYear = g.ReleaseYear,
				Description = g.Description,
				SubmittedById = g.SubmittedById,
			})
			.ToListAsync();
		// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Debug purposes split of return and await
		return result;
	}

	public async Task<IEnumerable<GameResponse>> GetLibraryAsync(Guid userId)
	{
		return await _context.Users
			.Where(u => u.Id == userId)
			.SelectMany(u => u.Library)
			.Select(g => new GameResponse
			{
				Id = g.Id,
				Title = g.Title,
				ReleaseYear = g.ReleaseYear,
				Description = g.Description,
				SubmittedById = g.SubmittedById,
			})
			.ToListAsync();
	}

	public async Task<GameResponse?> GetByIdAsync(Guid id)
	{
		var game = await _context.Games.FindAsync(id);
		if (game is null)
		{
			return null;
		}
		return new GameResponse
		{
			Id = game.Id,
			Title = game.Title,
			ReleaseYear = game.ReleaseYear,
			Description = game.Description,
			SubmittedById = game.SubmittedById,
		};
	}

	public async Task<GameResponse> SubmitAsync(Guid userId, CreateGameRequest request)
	{
		var game = new Game
		{
			Id = Guid.NewGuid(),
			Title = request.Title,
			ReleaseYear = request.ReleaseYear,
			Description = request.Description,
			SubmittedById = userId,
		};
		_context.Games.Add(game);
		await _context.SaveChangesAsync();

		return new GameResponse
		{
			Id = game.Id,
			Title = game.Title,
			ReleaseYear = game.ReleaseYear,
			Description = game.Description,
			SubmittedById = game.SubmittedById,
		};
	}

	public async Task<bool> AddToLibraryAsync(Guid userId, Guid gameId)
	{
		var user = await _context.Users
			.Include(u => u.Library)
			.FirstOrDefaultAsync(u => u.Id == userId);

		if (user is null)
		{
			return false;
		}

		var game = await _context.Games.FindAsync(gameId);
		if (game is null)
		{
			return false;
		}

		if (user.Library.Any(g => g.Id == gameId))
		{
			return true;
		}

		user.Library.Add(game);
		await _context.SaveChangesAsync();
		return true;
	}

	public async Task<bool> RemoveFromLibraryAsync(Guid userId, Guid gameId)
	{
		var user = await _context.Users
			.Include(u => u.Library)
			.FirstOrDefaultAsync(u => u.Id == userId);

		if (user is null)
		{
			return false;
		}

		var game = user.Library.FirstOrDefault(g => g.Id == gameId);
		if (game is null)
		{
			return false;
		}

		user.Library.Remove(game);
		await _context.SaveChangesAsync();
		return true;
	}

	public async Task<bool> DeleteAsync(Guid gameId, Guid userId)
	{
		var game = await _context.Games.FindAsync(gameId);
		if (game is null || game.SubmittedById != userId)
		{
			return false;
		}
		_context.Games.Remove(game);
		await _context.SaveChangesAsync();
		return true;
	}
}
