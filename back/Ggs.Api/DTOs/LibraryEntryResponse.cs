using Ggs.Domain.Models;

namespace Ggs.Api.DTOs;

public class LibraryEntryResponse
{
	public Guid Id { get; set; }
	public string Title { get; set; }
	public int? ReleaseYear { get; set; }
	public string? Description { get; set; }
	public Guid? SubmittedById { get; set; }
	public CompletionStatus Status { get; set; }
	public int? Rating { get; set; }
}
