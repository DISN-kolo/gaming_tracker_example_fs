using System.Security.Claims;
using Ggs.Api.DTOs;
using Ggs.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ggs.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class GamesController : ControllerBase
{
	private readonly GameService _gameService;

	public GamesController(GameService gameService)
	{
		_gameService = gameService;
	}

	[HttpGet]
	public async Task<ActionResult<IEnumerable<GameResponse>>> GetCatalog()
	{
		var games = await _gameService.GetCatalogAsync();
		return Ok(games);
	}

	[HttpGet("library")]
	public async Task<ActionResult<IEnumerable<LibraryEntryResponse>>> GetLibrary()
	{
		var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
		var games = await _gameService.GetLibraryAsync(userId);
		return Ok(games);
	}

	[HttpGet("{id}")]
	public async Task<ActionResult<GameResponse>> GetById(Guid id)
	{
		var game = await _gameService.GetByIdAsync(id);
		if (game is null)
		{
			return NotFound();
		}
		return Ok(game);
	}

	[HttpPost]
	public async Task<ActionResult<GameResponse>> Submit(CreateGameRequest request)
	{
		var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
		var game = await _gameService.SubmitAsync(userId, request);
		return CreatedAtAction(nameof(GetById), new { id = game.Id }, game);
	}

	[HttpPost("{id}/library")]
	public async Task<IActionResult> AddToLibrary(Guid id, CreateLibraryEntryRequest request)
	{
		var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
		var success = await _gameService.AddToLibraryAsync(userId, id, request);
		if (!success)
		{
			return NotFound();
		}
		return NoContent();
	}

	[HttpDelete("{id}/library")]
	public async Task<IActionResult> RemoveFromLibrary(Guid id)
	{
		var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
		var success = await _gameService.RemoveFromLibraryAsync(userId, id);
		if (!success)
		{
			return NotFound();
		}
		return NoContent();
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(Guid id)
	{
		var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
		var success = await _gameService.DeleteAsync(id, userId);
		if (!success)
		{
			return NotFound();
		}
		return NoContent();
	}
}
