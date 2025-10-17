using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PlayerManagement.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BloodGroup",
                columns: table => new
                {
                    BloodGroupId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupName = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__BloodGro__4398C68FDE0DDF3E", x => x.BloodGroupId);
                });

            migrationBuilder.CreateTable(
                name: "EvaluationCategory",
                columns: table => new
                {
                    EvaluationCategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Evaluati__964127FDD9F71159", x => x.EvaluationCategoryId);
                });

            migrationBuilder.CreateTable(
                name: "EvaluationType",
                columns: table => new
                {
                    EvaluationTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeName = table.Column<string>(type: "varchar(max)", unicode: false, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Evaluati__AE65CEC7163FDF53", x => x.EvaluationTypeId);
                });

            migrationBuilder.CreateTable(
                name: "Gender",
                columns: table => new
                {
                    GenderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GenderName = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Gender__4E24E9F788C32ACD", x => x.GenderId);
                });

            migrationBuilder.CreateTable(
                name: "Managers",
                columns: table => new
                {
                    ManagerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Dob = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Managers", x => x.ManagerId);
                });

            migrationBuilder.CreateTable(
                name: "MatchFormats",
                columns: table => new
                {
                    MatchFormatId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FormatName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchFormats", x => x.MatchFormatId);
                });

            migrationBuilder.CreateTable(
                name: "Religion",
                columns: table => new
                {
                    ReligionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReligionName = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Religion__D3ADAB6A825E3C0E", x => x.ReligionId);
                });

            migrationBuilder.CreateTable(
                name: "Skills",
                columns: table => new
                {
                    SkillId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SkillName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skills", x => x.SkillId);
                });

            migrationBuilder.CreateTable(
                name: "SportsType",
                columns: table => new
                {
                    SportsTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeName = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__SportsTy__8F679832FD582307", x => x.SportsTypeId);
                });

            migrationBuilder.CreateTable(
                name: "Trainers",
                columns: table => new
                {
                    TrainerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrainerName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime", nullable: false),
                    MobileNo = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Picture = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsExperienced = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trainers", x => x.TrainerId);
                });

            migrationBuilder.CreateTable(
                name: "Training",
                columns: table => new
                {
                    TrainingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrainingName = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Training__E8D71D828C6BE2AD", x => x.TrainingId);
                });

            migrationBuilder.CreateTable(
                name: "Matches",
                columns: table => new
                {
                    MatchId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MatchDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Venue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TeamA = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TeamB = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Result = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MatchFormatId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matches", x => x.MatchId);
                    table.ForeignKey(
                        name: "FK_Matches_MatchFormats_MatchFormatId",
                        column: x => x.MatchFormatId,
                        principalTable: "MatchFormats",
                        principalColumn: "MatchFormatId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Player",
                columns: table => new
                {
                    PlayerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
                    LastName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime", nullable: true),
                    FathersName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    MothersName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    MobileNo = table.Column<string>(type: "varchar(15)", unicode: false, maxLength: 15, nullable: false),
                    ImageUrl = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    ImageName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NidNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    Height = table.Column<decimal>(type: "decimal(18,0)", nullable: true),
                    PlayerWeight = table.Column<decimal>(type: "decimal(18,0)", nullable: true),
                    LastEducationalQualification = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    SportsTypeId = table.Column<int>(type: "int", nullable: false),
                    BloodGroupId = table.Column<int>(type: "int", nullable: false),
                    ReligionId = table.Column<int>(type: "int", nullable: false),
                    GenderId = table.Column<int>(type: "int", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Player__4A4E74C8446FF317", x => x.PlayerId);
                    table.ForeignKey(
                        name: "FK__Player__BloodGro__300424B4",
                        column: x => x.BloodGroupId,
                        principalTable: "BloodGroup",
                        principalColumn: "BloodGroupId");
                    table.ForeignKey(
                        name: "FK__Player__GenderId__2E1BDC42",
                        column: x => x.GenderId,
                        principalTable: "Gender",
                        principalColumn: "GenderId");
                    table.ForeignKey(
                        name: "FK__Player__Religion__30F848ED",
                        column: x => x.ReligionId,
                        principalTable: "Religion",
                        principalColumn: "ReligionId");
                    table.ForeignKey(
                        name: "FK__Player__SportsTy__2F10007B",
                        column: x => x.SportsTypeId,
                        principalTable: "SportsType",
                        principalColumn: "SportsTypeId");
                });

            migrationBuilder.CreateTable(
                name: "ManagerTrainerAssignments",
                columns: table => new
                {
                    ManagerTrainerAssignmentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ManagerId = table.Column<int>(type: "int", nullable: false),
                    TrainerId = table.Column<int>(type: "int", nullable: false),
                    JoiningDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ManagerTrainerAssignments", x => x.ManagerTrainerAssignmentId);
                    table.ForeignKey(
                        name: "FK_managerTrainerAssignments_Managers_ManagerId",
                        column: x => x.ManagerId,
                        principalTable: "Managers",
                        principalColumn: "ManagerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_managerTrainerAssignments_Trainers_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "Trainers",
                        principalColumn: "TrainerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrainerSkills",
                columns: table => new
                {
                    TrainerSkillId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TrainerId = table.Column<int>(type: "int", nullable: false),
                    SkillId = table.Column<int>(type: "int", nullable: false),
                    Experience = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainerSkills", x => x.TrainerSkillId);
                    table.ForeignKey(
                        name: "FK_TrainerSkills_Skills_SkillId",
                        column: x => x.SkillId,
                        principalTable: "Skills",
                        principalColumn: "SkillId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrainerSkills_Trainers_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "Trainers",
                        principalColumn: "TrainerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlayerEvaluation",
                columns: table => new
                {
                    PlayerEvaluationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlayerId = table.Column<int>(type: "int", nullable: false),
                    TrainerId = table.Column<int>(type: "int", nullable: false),
                    EvaluationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PlayerEv__C805209CBCD00737", x => x.PlayerEvaluationId);
                    table.ForeignKey(
                        name: "FK__PlayerEva__Playe__5EBF139D",
                        column: x => x.PlayerId,
                        principalTable: "Player",
                        principalColumn: "PlayerId");
                    table.ForeignKey(
                        name: "FK__PlayerEva__Train__5FB337D6",
                        column: x => x.TrainerId,
                        principalTable: "Trainers",
                        principalColumn: "TrainerId");
                });

            migrationBuilder.CreateTable(
                name: "PlayerTrainingAssignment",
                columns: table => new
                {
                    PlayerTrainingAssignmentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlayerId = table.Column<int>(type: "int", nullable: false),
                    TrainingId = table.Column<int>(type: "int", nullable: false),
                    TrainingDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    Venue = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PlayerTr__055FA1881DFFF5DE", x => x.PlayerTrainingAssignmentId);
                    table.ForeignKey(
                        name: "FK__PlayerTra__Playe__34C8D9D1",
                        column: x => x.PlayerId,
                        principalTable: "Player",
                        principalColumn: "PlayerId");
                    table.ForeignKey(
                        name: "FK__PlayerTra__Train__35BCFE0A",
                        column: x => x.TrainingId,
                        principalTable: "Training",
                        principalColumn: "TrainingId");
                });

            migrationBuilder.CreateTable(
                name: "PlayerEvaluationDetails",
                columns: table => new
                {
                    PlayerEvaluationDetailsId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlayerEvaluationId = table.Column<int>(type: "int", nullable: false),
                    EvaluationTypeId = table.Column<int>(type: "int", nullable: false),
                    MatchId = table.Column<int>(type: "int", nullable: true),
                    EvaluationCategoryId = table.Column<int>(type: "int", nullable: false),
                    OverNumber = table.Column<int>(type: "int", nullable: false),
                    BallNumber = table.Column<int>(type: "int", nullable: true),
                    RunsScored = table.Column<int>(type: "int", nullable: true),
                    BallsFaced = table.Column<int>(type: "int", nullable: true),
                    Boundaries = table.Column<int>(type: "int", nullable: true),
                    IsOut = table.Column<bool>(type: "bit", nullable: true),
                    DismissalType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    BallsBowled = table.Column<int>(type: "int", nullable: true),
                    RunsConceded = table.Column<int>(type: "int", nullable: true),
                    WicketsTaken = table.Column<int>(type: "int", nullable: true),
                    NoBalls = table.Column<int>(type: "int", nullable: true),
                    Wides = table.Column<int>(type: "int", nullable: true),
                    IsBoundary = table.Column<bool>(type: "bit", nullable: true),
                    CatchesTaken = table.Column<int>(type: "int", nullable: true),
                    RunOuts = table.Column<int>(type: "int", nullable: true),
                    Misfields = table.Column<int>(type: "int", nullable: true),
                    Stumpings = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PlayerEv__AE490EFB6DDD0AF6", x => x.PlayerEvaluationDetailsId);
                    table.ForeignKey(
                        name: "FK__PlayerEva__Evalu__656C112C",
                        column: x => x.EvaluationTypeId,
                        principalTable: "EvaluationType",
                        principalColumn: "EvaluationTypeId");
                    table.ForeignKey(
                        name: "FK__PlayerEva__Evalu__6754599E",
                        column: x => x.EvaluationCategoryId,
                        principalTable: "EvaluationCategory",
                        principalColumn: "EvaluationCategoryId");
                    table.ForeignKey(
                        name: "FK__PlayerEva__Match__66603565",
                        column: x => x.MatchId,
                        principalTable: "Matches",
                        principalColumn: "MatchId");
                    table.ForeignKey(
                        name: "FK__PlayerEva__Playe__6477ECF3",
                        column: x => x.PlayerEvaluationId,
                        principalTable: "PlayerEvaluation",
                        principalColumn: "PlayerEvaluationId");
                });

            migrationBuilder.InsertData(
                table: "BloodGroup",
                columns: new[] { "BloodGroupId", "GroupName" },
                values: new object[,]
                {
                    { 1, "A+" },
                    { 2, "A-" },
                    { 3, "B+" },
                    { 4, "B-" }
                });

            migrationBuilder.InsertData(
                table: "Gender",
                columns: new[] { "GenderId", "GenderName" },
                values: new object[,]
                {
                    { 1, "Male" },
                    { 2, "Female" },
                    { 3, "Other" }
                });

            migrationBuilder.InsertData(
                table: "MatchFormats",
                columns: new[] { "MatchFormatId", "FormatName" },
                values: new object[,]
                {
                    { 1, "T20" },
                    { 2, "ODI" },
                    { 3, "Test" }
                });

            migrationBuilder.InsertData(
                table: "Religion",
                columns: new[] { "ReligionId", "ReligionName" },
                values: new object[,]
                {
                    { 1, "Islam" },
                    { 2, "Hinduism" },
                    { 3, "Christianism" },
                    { 4, "Buddism" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "SkillId", "SkillName" },
                values: new object[,]
                {
                    { 1, "Batting" },
                    { 2, "Bowling" },
                    { 3, "Fielding" }
                });

            migrationBuilder.InsertData(
                table: "SportsType",
                columns: new[] { "SportsTypeId", "TypeName" },
                values: new object[,]
                {
                    { 1, "Cricket" },
                    { 2, "Football" },
                    { 3, "Badminton" },
                    { 4, "Swimming" }
                });

            migrationBuilder.InsertData(
                table: "Training",
                columns: new[] { "TrainingId", "TrainingName" },
                values: new object[,]
                {
                    { 1, "Batting" },
                    { 2, "Bowling" },
                    { 3, "Fielding" },
                    { 4, "Tactical" },
                    { 5, "Strength" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ManagerTrainerAssignments_ManagerId",
                table: "ManagerTrainerAssignments",
                column: "ManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_ManagerTrainerAssignments_TrainerId",
                table: "ManagerTrainerAssignments",
                column: "TrainerId");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_MatchFormatId",
                table: "Matches",
                column: "MatchFormatId");

            migrationBuilder.CreateIndex(
                name: "IX_Player_BloodGroupId",
                table: "Player",
                column: "BloodGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Player_GenderId",
                table: "Player",
                column: "GenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Player_ReligionId",
                table: "Player",
                column: "ReligionId");

            migrationBuilder.CreateIndex(
                name: "IX_Player_SportsTypeId",
                table: "Player",
                column: "SportsTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerEvaluation_PlayerId",
                table: "PlayerEvaluation",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerEvaluation_TrainerId",
                table: "PlayerEvaluation",
                column: "TrainerId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerEvaluationDetails_EvaluationCategoryId",
                table: "PlayerEvaluationDetails",
                column: "EvaluationCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerEvaluationDetails_EvaluationTypeId",
                table: "PlayerEvaluationDetails",
                column: "EvaluationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerEvaluationDetails_MatchId",
                table: "PlayerEvaluationDetails",
                column: "MatchId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerEvaluationDetails_PlayerEvaluationId",
                table: "PlayerEvaluationDetails",
                column: "PlayerEvaluationId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerTrainingAssignment_PlayerId",
                table: "PlayerTrainingAssignment",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerTrainingAssignment_TrainingId",
                table: "PlayerTrainingAssignment",
                column: "TrainingId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainerSkills_SkillId",
                table: "TrainerSkills",
                column: "SkillId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainerSkills_TrainerId",
                table: "TrainerSkills",
                column: "TrainerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ManagerTrainerAssignments");

            migrationBuilder.DropTable(
                name: "PlayerEvaluationDetails");

            migrationBuilder.DropTable(
                name: "PlayerTrainingAssignment");

            migrationBuilder.DropTable(
                name: "TrainerSkills");

            migrationBuilder.DropTable(
                name: "Managers");

            migrationBuilder.DropTable(
                name: "EvaluationType");

            migrationBuilder.DropTable(
                name: "EvaluationCategory");

            migrationBuilder.DropTable(
                name: "Matches");

            migrationBuilder.DropTable(
                name: "PlayerEvaluation");

            migrationBuilder.DropTable(
                name: "Training");

            migrationBuilder.DropTable(
                name: "Skills");

            migrationBuilder.DropTable(
                name: "MatchFormats");

            migrationBuilder.DropTable(
                name: "Player");

            migrationBuilder.DropTable(
                name: "Trainers");

            migrationBuilder.DropTable(
                name: "BloodGroup");

            migrationBuilder.DropTable(
                name: "Gender");

            migrationBuilder.DropTable(
                name: "Religion");

            migrationBuilder.DropTable(
                name: "SportsType");
        }
    }
}
