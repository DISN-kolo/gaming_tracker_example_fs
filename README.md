# gaming\_tracker\_example\_fs
A fullstack project to learn Angular and .NET Core

## used to set the project up:

- `cd back`
- `docker run --rm -v $(pwd):/app -w /app mcr.microsoft.com/dotnet/sdk:10.0 dotnet new webapi -n Ggs.Api`
- the rest of the commands share their start but have different `dotnet...` tails:
	- `dotnet new classlib -n Ggs.Domain`
	- `dotnet new sln -n Ggs`
	- `dotnet sln add Ggs.Api/Ggs.Api.csproj`
	- `dotnet sln add Ggs.Domain/Ggs.Domain.csproj`
	- `dotnet add Ggs.Api/Ggs.Api.csproj reference Ggs.Domain/Ggs.Domain.csproj`
- adding the specific packages for specific projects is done similarly, but `$(pwd)` (the `...../back` folder) should be `$(pwd)/Specific.Project`:
	- for the `Ggs.Api`:
		- `dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 10.0.0`
		- `dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL --version 10.0.0`

## start the back-only version up:

- launch the docker: `docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build back db`
- connect for testing: `openssl s_client -connect localhost:8443`
