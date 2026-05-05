namespace Ggs.Domain.Models;

public class User
{
	public Guid Id { get; set; }
	public string Email { get; set; }
	public string PasswordHash { get; set; }
	public string Name { get; set; }
	public ICollection<Game> SubmittedGames { get; set; }
	public ICollection<Game> Library { get; set; }
}
