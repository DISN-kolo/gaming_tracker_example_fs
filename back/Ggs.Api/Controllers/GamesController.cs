using Ggs.Api.Services;
using Ggs.Api.DTOs;

namespace Ggs.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GamesController : ControllerBase
{
	private readonly GameService _gameService;

	public GamesController(GameService gameService)
	{
		_gameService = gameService;
	}

	[HttpGet]
	public async Task<ActionResult<IEnumerable<GameDto>>> GetAll()
	{
		var games = await _gameService.GetAllAsync();
		return Ok(games);
	}

	[HttpGet("{id}")]
	public async Task<ActionResult<GameDto>> GetById(Guid id)
	{
		var game = await _gameService.GetByIdAsync(id);
		if (game is null)
		{
			return NotFound();
		}
		return Ok(game);
	}

	[HttpPost]
	[Authorize]
	public async Task<ActionResult<GameDto>> Create(CreateGameRequest request)
	{
		var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
		var game = await _gameService.CreateAsync(userId, request);
		return CreatedAtAction(nameof(GetById), new { id = game.Id }, game);
	}

	[HttpPut("{id}")]
	public async Task<ActionResult<GameDto>> Update(Guid id, UpdateGameRequest request)
	{
		var game = await _gameService.UpdateAsync(id, request);
		if (game is null)
		{
			return NotFound();
		}
		return Ok(game);
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
