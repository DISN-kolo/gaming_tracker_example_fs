namespace Ggs.Domain.Models;

public class Game
{
	public Guid Id { get; set; }
	public string Title { get; set; }

	public Guid UserId { get; set; }
	public User Owner { get; set; }
}
