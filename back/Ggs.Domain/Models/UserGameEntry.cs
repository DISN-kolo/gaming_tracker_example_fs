namespace Ggs.Domain.Models;

public class UserGameEntry
{
	public Guid UserId { get; set; }
	public User User { get; set; }

	public Guid GameId { get; set; }
	public Game Game { get; set; }

	public CompletionStatus Status { get; set; }
	public int? Rating { get; set; }
}
