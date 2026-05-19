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
		// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Debug purposes split of return and select
		return result;
	}

	public async Task<IEnumerable<LibraryEntryResponse>> GetLibraryAsync(Guid userId)
	{
		return await _context.UserGameEntries
			.Where(e => e.UserId == userId)
			.Select(e => new LibraryEntryResponse
			{
				Id = e.Game.Id,
				Title = e.Game.Title,
				ReleaseYear = e.Game.ReleaseYear,
				Description = e.Game.Description,
				SubmittedById = e.Game.SubmittedById,
				Status = e.Status,
				Rating = e.Rating,
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

	public async Task<bool> AddToLibraryAsync(Guid userId, Guid gameId, CreateLibraryEntryRequest request)
	{
		var user = await _context.Users.FindAsync(userId);
		if (user is null)
		{
			return false;
		}

		var game = await _context.Games.FindAsync(gameId);
		if (game is null)
		{
			return false;
		}

		var existing = await _context.UserGameEntries
			.FirstOrDefaultAsync(e => e.UserId == userId && e.GameId == gameId);

		if (existing is not null)
		{
			return true;
		}

		_context.UserGameEntries.Add(new UserGameEntry
		{
			UserId = userId,
			GameId = gameId,
			Status = request.Status,
			Rating = request.Rating,
		});
		await _context.SaveChangesAsync();
		return true;
	}

	public async Task<bool> UpdateLibraryEntryAsync(Guid userId, Guid gameId, EditLibraryEntryRequest request)
	{
		var entry = await _context.UserGameEntries
			.FirstOrDefaultAsync(e => e.UserId == userId && e.GameId == gameId);

		if (entry is null)
		{
			return false;
		}

		entry.Status = request.Status;
		entry.Rating = request.Rating;

		await _context.SaveChangesAsync();
		return true;
	}

	public async Task<bool> RemoveFromLibraryAsync(Guid userId, Guid gameId)
	{
		var entry = await _context.UserGameEntries
			.FirstOrDefaultAsync(e => e.UserId == userId && e.GameId == gameId);

		if (entry is null) return false;

		_context.UserGameEntries.Remove(entry);
		await _context.SaveChangesAsync();
		return true;
	}

	public async Task<double?> GetAverageRatingAsync(Guid gameId)
	{
		var ratings = await _context.UserGameEntries
			.Where(e => e.GameId == gameId && e.Rating != null)
			.Select(e => (double) e.Rating!)
			.ToListAsync();

		if (ratings.Count == 0)
		{
			return null;
		}

		return ratings.Average();
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
