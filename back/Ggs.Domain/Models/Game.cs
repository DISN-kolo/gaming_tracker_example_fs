namespace Ggs.Domain.Models;

public class Game
{
	public Guid Id { get; set; }
	public string Title { get; set; }
	public int? ReleaseYear { get; set; }
	public string? Description { get; set; }

	public Guid? SubmittedById { get; set; }
	public User? SubmittedBy { get; set; }

	public ICollection<User> LibraryUsers { get; set; }
}
