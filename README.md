# gaming\_tracker\_example\_fs
A fullstack project to learn Angular and .NET Core

## used to set the project up:

- `cd back`
- `docker run --rm -v $(pwd):/app -w /app mcr.microsoft.com/dotnet/sdk:10.0 dotnet new webapi -n Ggs.Api`
- the rest of the commands share their start but have different `dotnet...` tails:
	- `dotnet new classlib -n Ggs.Domain`
	- `dotnet new sln -n Ggs`
	- `dotnet snl add Ggs.Api/Ggs.Api.csproj`
	- `dotnet snl add Ggs.Domain/Ggs.Domain.csproj`
	- `dotnet add Ggs.Api/Ggs.Api.csproj reference Ggs.Domain/Ggs.Domain.csproj`
