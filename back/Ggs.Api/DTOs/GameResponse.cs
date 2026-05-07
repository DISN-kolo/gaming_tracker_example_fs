namespace Ggs.Api.DTOs;

public class GameResponse
{
	public Guid Id { get; set; }
	public string Title { get; set; }
	public int? ReleaseYear { get; set; }
	public string? Description { get; set; }
	public Guid? SubmittedById { get; set; }
}
