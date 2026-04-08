namespace Ggs.Api.Services;

public class GameService
{
	private readonly AppDbContext _context;

	public GameService(AppDbContext context)
	{
		_context = context;
	}

	public async Task<IEnumerable<GameDto>> GetAllAsync()
	{
		return await _context.Games
			.Select(g => new GameDto
			{
				Id = g.Id,
				Title = g.Title,
			})
			.ToListAsync();
	}

	public async Task<GameDto> GetByIdAsync(Guid id)
	{
		return _context.Games
			.Where(g =>
				g.Id == id
			);
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
}
