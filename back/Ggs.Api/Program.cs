using Ggs.Api.Services;
using Ggs.Api.Data;
using Ggs.Api.DTOs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddControllers();
// the default connection string should be received from env
builder.Services.AddDbContext<AppDbContext>(
	options =>
	options.UseNpgsql(
		builder.Configuration.GetConnectionString("Default")
	)
);
builder.Services.AddScoped<GameService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
