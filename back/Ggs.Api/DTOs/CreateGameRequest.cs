namespace Ggs.Api.DTOs;

public class CreateGameRequest
{
	[Required]
	[MaxLength(200)]
	public string Title { get; set; }
}
