using Ggs.Domain.Models;

namespace Ggs.Api.Data;

public class AppDbContext : DbContext
{
	public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
	{
	}

	public DbSet<Game> Games { get; set; }
	public DbSet<User> Users { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);

		modelBuilder.Entity<Game>(entity =>
		{
			entity.HasKey(g => g.Id);

			entity.Property(g => g.Title)
			.IsRequired()
			.HasMaxLength(512);

			entity.HasOne(g => g.Owner)
			.WithMany(u => u.Games)
			.HasForeignKey(g => g.UserId);
		});

		modelBuilder.Entity<User>(entity =>
		{
			entity.HasKey(u => u.Id);

			entity.Property(u => u.Email)
			.IsRequired()
			.HasMaxLength(256);

			entity.HasIndex(u => u.Email)
			.IsUnique();
		});
	}
}
