# gaming\_tracker\_example\_fs
A fullstack project to learn Angular and .NET Core

## used to set the project up:

### for the back:
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
		- `dotnet add package Microsoft.EntityFrameworkCore.Design --version 10.0.0`
- adding dotnet local tools (from `back/`):
	- `docker run --rm -v $(pwd):/app -w /app mcr.microsoft.com/dotnet/sdk:10.0 dotnet new tool-manifest`
	- `docker run --rm -v $(pwd):/app -w /app mcr.microsoft.com/dotnet/sdk:10.0 dotnet tool install dotnet-ef`
	- keep in mind - it somehow created the config file plainly, while it needs to be in the `...../back/.config` folder. mv if the same thing happenned to you


### for the front:
- `cd front`
- `docker run --rm -v $(pwd):/app -w /app node:24.14.1-alpine sh -c "npm install -g @angular/cli@21.2.7 && ng new ggs-front --directory . --skip-git --style css --no-ssr"`

## start the back-only version up if you need to:

- launch the docker: `docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build back db`
- connect for testing: `openssl s_client -connect localhost:8443`
