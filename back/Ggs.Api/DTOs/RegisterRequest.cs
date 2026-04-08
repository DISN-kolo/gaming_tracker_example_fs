using System.ComponentModel.DataAnnotations;

namespace Ggs.Api.DTOs;

public class RegisterRequest
{
	[Required]
	[EmailAddress]
	[MaxLength(256)]
	public string Email { get; set; }

	[Required]
	[MinLength(8)]
	public string Password { get; set; }
}
