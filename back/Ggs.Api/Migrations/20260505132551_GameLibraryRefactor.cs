using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ggs.Api.Migrations
{
    /// <inheritdoc />
    public partial class GameLibraryRefactor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Users_UserId",
                table: "Games");

            migrationBuilder.DropIndex(
                name: "IX_Games_UserId",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Games");

            migrationBuilder.AddColumn<Guid>(
                name: "SubmittedById",
                table: "Games",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserGame",
                columns: table => new
                {
                    LibraryId = table.Column<Guid>(type: "uuid", nullable: false),
                    LibraryUsersId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGame", x => new { x.LibraryId, x.LibraryUsersId });
                    table.ForeignKey(
                        name: "FK_UserGame_Games_LibraryId",
                        column: x => x.LibraryId,
                        principalTable: "Games",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserGame_Users_LibraryUsersId",
                        column: x => x.LibraryUsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Games_SubmittedById",
                table: "Games",
                column: "SubmittedById");

            migrationBuilder.CreateIndex(
                name: "IX_UserGame_LibraryUsersId",
                table: "UserGame",
                column: "LibraryUsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Users_SubmittedById",
                table: "Games",
                column: "SubmittedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Games_Users_SubmittedById",
                table: "Games");

            migrationBuilder.DropTable(
                name: "UserGame");

            migrationBuilder.DropIndex(
                name: "IX_Games_SubmittedById",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "SubmittedById",
                table: "Games");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Games",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Games_UserId",
                table: "Games",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Games_Users_UserId",
                table: "Games",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
