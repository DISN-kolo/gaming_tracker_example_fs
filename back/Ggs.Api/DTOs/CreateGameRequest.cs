using System.ComponentModel.DataAnnotations;

namespace Ggs.Api.DTOs;

public class CreateGameRequest
{
	[Required]
	[MaxLength(200)]
	public string Title { get; set; }

	public int? ReleaseYear { get; set; }

	[MaxLength(512)]
	public string? Description { get; set; }
}
