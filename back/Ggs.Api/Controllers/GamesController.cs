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
	public async Task<ActionResult<IEnumerable<GameResponse>>> GetAll()
	{
		// these 'User's actually come from ControllerBase.
		var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
		var games = await _gameService.GetAllAsync(userId);
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
	public async Task<ActionResult<GameResponse>> Create(CreateGameRequest request)
	{
		var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
		var game = await _gameService.CreateAsync(userId, request);
		return CreatedAtAction(nameof(GetById), new { id = game.Id }, game);
	}

	[HttpDelete("{id}")]
	public async Task<IActionResult> Delete(Guid id)
	{
		var success = await _gameService.DeleteAsync(id);
		if (!success)
		{
			return NotFound();
		}
		return NoContent();
	}
}
