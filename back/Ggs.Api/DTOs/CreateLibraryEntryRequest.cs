using System.ComponentModel.DataAnnotations;
using Ggs.Domain.Models;

namespace Ggs.Api.DTOs;

public class CreateLibraryEntryRequest
{
	[Required]
	public CompletionStatus Status { get; set; }

	[Range(1, 10)]
	public int? Rating { get; set; }
}
