using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Ggs.Api.Migrations
{
    /// <inheritdoc />
    public partial class LibraryEntryStatusAndRating : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserGame_Games_LibraryId",
                table: "UserGame");

            migrationBuilder.DropForeignKey(
                name: "FK_UserGame_Users_LibraryUsersId",
                table: "UserGame");

            migrationBuilder.RenameColumn(
                name: "LibraryUsersId",
                table: "UserGame",
                newName: "GameId");

            migrationBuilder.RenameColumn(
                name: "LibraryId",
                table: "UserGame",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserGame_LibraryUsersId",
                table: "UserGame",
                newName: "IX_UserGame_GameId");

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "UserGame",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "UserGame",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGame_Games_GameId",
                table: "UserGame",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGame_Users_UserId",
                table: "UserGame",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserGame_Games_GameId",
                table: "UserGame");

            migrationBuilder.DropForeignKey(
                name: "FK_UserGame_Users_UserId",
                table: "UserGame");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "UserGame");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "UserGame");

            migrationBuilder.RenameColumn(
                name: "GameId",
                table: "UserGame",
                newName: "LibraryUsersId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserGame",
                newName: "LibraryId");

            migrationBuilder.RenameIndex(
                name: "IX_UserGame_GameId",
                table: "UserGame",
                newName: "IX_UserGame_LibraryUsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserGame_Games_LibraryId",
                table: "UserGame",
                column: "LibraryId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGame_Users_LibraryUsersId",
                table: "UserGame",
                column: "LibraryUsersId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
