using Microsoft.EntityFrameworkCore;
using PlayerManagement.Models;

namespace PlayerManagement.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> op) : base(op)
        {

        }

        public virtual DbSet<BloodGroup> BloodGroups { get; set; }

        public virtual DbSet<EvaluationCategory> EvaluationCategories { get; set; }

        public virtual DbSet<EvaluationType> EvaluationTypes { get; set; }

        public virtual DbSet<Gender> Genders { get; set; }

        public virtual DbSet<Manager> Managers { get; set; }

        public virtual DbSet<ManagerTrainerAssignment> ManagerTrainerAssignments { get; set; }

        public virtual DbSet<Match> Matches { get; set; }

        public virtual DbSet<MatchFormat> MatchFormats { get; set; }

        public virtual DbSet<Player> Players { get; set; }

        public virtual DbSet<PlayerEvaluation> PlayerEvaluations { get; set; }

        public virtual DbSet<PlayerEvaluationDetail> PlayerEvaluationDetails { get; set; }

        public virtual DbSet<PlayerTrainingAssignment> PlayerTrainingAssignments { get; set; }

        public virtual DbSet<Religion> Religions { get; set; }

        public virtual DbSet<Skill> Skills { get; set; }

        public virtual DbSet<SportsType> SportsTypes { get; set; }

        public virtual DbSet<Trainer> Trainers { get; set; }

        public virtual DbSet<TrainerSkill> TrainerSkills { get; set; }

        public virtual DbSet<Training> Training { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BloodGroup>(entity =>
            {
                entity.HasKey(e => e.BloodGroupId).HasName("PK__BloodGro__4398C68FDE0DDF3E");

                entity.ToTable("BloodGroup");

                entity.Property(e => e.GroupName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<EvaluationCategory>(entity =>
            {
                entity.HasKey(e => e.EvaluationCategoryId).HasName("PK__Evaluati__964127FDD9F71159");

                entity.ToTable("EvaluationCategory");

                entity.Property(e => e.CategoryName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<EvaluationType>(entity =>
            {
                entity.HasKey(e => e.EvaluationTypeId).HasName("PK__Evaluati__AE65CEC7163FDF53");

                entity.ToTable("EvaluationType");

                entity.Property(e => e.TypeName)
                    .IsRequired()
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Gender>(entity =>
            {
                entity.HasKey(e => e.GenderId).HasName("PK__Gender__4E24E9F788C32ACD");

                entity.ToTable("Gender");

                entity.Property(e => e.GenderName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Manager>(entity =>
            {
                entity.Property(e => e.ContactNumber).IsRequired();
                entity.Property(e => e.Email).IsRequired();
                entity.Property(e => e.Name).IsRequired();
            });

            modelBuilder.Entity<ManagerTrainerAssignment>(entity =>
            {
                entity.HasOne(d => d.Manager).WithMany(p => p.ManagerTrainerAssignments)
                    .HasForeignKey(d => d.ManagerId)
                    .HasConstraintName("FK_managerTrainerAssignments_Managers_ManagerId");

                entity.HasOne(d => d.Trainer).WithMany(p => p.ManagerTrainerAssignments)
                    .HasForeignKey(d => d.TrainerId)
                    .HasConstraintName("FK_managerTrainerAssignments_Trainers_TrainerId");
            });

            modelBuilder.Entity<Match>(entity =>
            {
                entity.Property(e => e.Title).IsRequired();
                entity.Property(e => e.Venue).IsRequired();

                entity.HasOne(d => d.MatchFormat).WithMany(p => p.Matches).HasForeignKey(d => d.MatchFormatId);
            });

            modelBuilder.Entity<MatchFormat>(entity =>
            {
                entity.Property(e => e.FormatName).IsRequired();
            });

            modelBuilder.Entity<Player>(entity =>
            {
                entity.HasKey(e => e.PlayerId).HasName("PK__Player__4A4E74C8446FF317");

                entity.ToTable("Player");

                entity.Property(e => e.DateOfBirth).HasColumnType("datetime");
                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.FathersName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
                entity.Property(e => e.Height).HasColumnType("decimal(18, 0)");
                entity.Property(e => e.ImageUrl)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.LastEducationalQualification)
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);
                entity.Property(e => e.MobileNo)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);
                entity.Property(e => e.MothersName)
                    .HasMaxLength(50)
                    .IsUnicode(false);
                entity.Property(e => e.PlayerWeight).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.BloodGroup).WithMany(p => p.Players)
                    .HasForeignKey(d => d.BloodGroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Player__BloodGro__300424B4");

                entity.HasOne(d => d.Gender).WithMany(p => p.Players)
                    .HasForeignKey(d => d.GenderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Player__GenderId__2E1BDC42");

                entity.HasOne(d => d.Religion).WithMany(p => p.Players)
                    .HasForeignKey(d => d.ReligionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Player__Religion__30F848ED");

                entity.HasOne(d => d.SportsType).WithMany(p => p.Players)
                    .HasForeignKey(d => d.SportsTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Player__SportsTy__2F10007B");
            });

            modelBuilder.Entity<PlayerEvaluation>(entity =>
            {
                entity.HasKey(e => e.PlayerEvaluationId).HasName("PK__PlayerEv__C805209CBCD00737");

                entity.ToTable("PlayerEvaluation");

                entity.HasOne(d => d.Player).WithMany(p => p.PlayerEvaluations)
                    .HasForeignKey(d => d.PlayerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PlayerEva__Playe__5EBF139D");

                entity.HasOne(d => d.Trainer).WithMany(p => p.PlayerEvaluations)
                    .HasForeignKey(d => d.TrainerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PlayerEva__Train__5FB337D6");
            });

            modelBuilder.Entity<PlayerEvaluationDetail>(entity =>
            {
                entity.HasKey(e => e.PlayerEvaluationDetailsId).HasName("PK__PlayerEv__AE490EFB6DDD0AF6");

                entity.Property(e => e.DismissalType).HasMaxLength(100);

                entity.HasOne(d => d.EvaluationCategory).WithMany(p => p.PlayerEvaluationDetails)
                    .HasForeignKey(d => d.EvaluationCategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PlayerEva__Evalu__6754599E");

                entity.HasOne(d => d.EvaluationType).WithMany(p => p.PlayerEvaluationDetails)
                    .HasForeignKey(d => d.EvaluationTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PlayerEva__Evalu__656C112C");

                entity.HasOne(d => d.Match).WithMany(p => p.PlayerEvaluationDetails)
                    .HasForeignKey(d => d.MatchId)
                    .HasConstraintName("FK__PlayerEva__Match__66603565");

                entity.HasOne(d => d.PlayerEvaluation).WithMany(p => p.PlayerEvaluationDetails)
                    .HasForeignKey(d => d.PlayerEvaluationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PlayerEva__Playe__6477ECF3");
            });

            modelBuilder.Entity<PlayerTrainingAssignment>(entity =>
            {
                entity.HasKey(e => e.PlayerTrainingAssignmentId).HasName("PK__PlayerTr__055FA1881DFFF5DE");

                entity.ToTable("PlayerTrainingAssignment");

                entity.Property(e => e.TrainingDate).HasColumnType("datetime");
                entity.Property(e => e.Venue)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Player).WithMany(p => p.PlayerTrainingAssignments)
                    .HasForeignKey(d => d.PlayerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PlayerTra__Playe__34C8D9D1");

                entity.HasOne(d => d.Training).WithMany(p => p.PlayerTrainingAssignments)
                    .HasForeignKey(d => d.TrainingId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PlayerTra__Train__35BCFE0A");
            });

            modelBuilder.Entity<Religion>(entity =>
            {
                entity.HasKey(e => e.ReligionId).HasName("PK__Religion__D3ADAB6A825E3C0E");

                entity.ToTable("Religion");

                entity.Property(e => e.ReligionName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Skill>(entity =>
            {
                entity.Property(e => e.SkillName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<SportsType>(entity =>
            {
                entity.HasKey(e => e.SportsTypeId).HasName("PK__SportsTy__8F679832FD582307");

                entity.ToTable("SportsType");

                entity.Property(e => e.TypeName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Trainer>(entity =>
            {
                entity.Property(e => e.DateOfBirth).HasColumnType("datetime");
                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100);
                entity.Property(e => e.MobileNo)
                    .IsRequired()
                    .HasMaxLength(15);
                entity.Property(e => e.Picture).IsRequired();
                entity.Property(e => e.TrainerName)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<TrainerSkill>(entity =>
            {
                entity.HasOne(d => d.Skill).WithMany(p => p.TrainerSkills).HasForeignKey(d => d.SkillId);

                entity.HasOne(d => d.Trainer).WithMany(p => p.TrainerSkills).HasForeignKey(d => d.TrainerId);
            });

            modelBuilder.Entity<Training>(entity =>
            {
                entity.HasKey(e => e.TrainingId).HasName("PK__Training__E8D71D828C6BE2AD");

                entity.Property(e => e.TrainingName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Skill>().HasData(
                new Skill { SkillId = 1, SkillName = "Batting" },
                new Skill { SkillId = 2, SkillName = "Bowling" },
                new Skill { SkillId = 3, SkillName = "Fielding" }
            );


            modelBuilder.Entity<Training>().HasData(
                new Training { TrainingId = 1, TrainingName = "Batting" },
                new Training { TrainingId = 2, TrainingName = "Bowling" },
                new Training { TrainingId = 3, TrainingName = "Fielding" },
                new Training { TrainingId = 4, TrainingName = "Tactical" },
                new Training { TrainingId = 5, TrainingName = "Strength" }
            );

            modelBuilder.Entity<BloodGroup>().HasData(
                new BloodGroup { BloodGroupId = 1, GroupName = "A+" },
                new BloodGroup { BloodGroupId = 2, GroupName = "A-" },
                new BloodGroup { BloodGroupId = 3, GroupName = "B+" },
                new BloodGroup { BloodGroupId = 4, GroupName = "B-" }
            );

            modelBuilder.Entity<SportsType>().HasData(
                new SportsType { SportsTypeId = 1, TypeName = "Cricket" },
                new SportsType { SportsTypeId = 2, TypeName = "Football" },
                new SportsType { SportsTypeId = 3, TypeName = "Badminton" },
                new SportsType { SportsTypeId = 4, TypeName = "Swimming" }
            );

            modelBuilder.Entity<Religion>().HasData(
                new Religion { ReligionId = 1, ReligionName = "Islam" },
                new Religion { ReligionId = 2, ReligionName = "Hinduism" },
                new Religion { ReligionId = 3, ReligionName = "Christianism" },
                new Religion { ReligionId = 4, ReligionName = "Buddism" }

            );
            modelBuilder.Entity<Gender>().HasData(
                new Gender { GenderId = 1, GenderName = "Male" },
                new Gender { GenderId = 2, GenderName = "Female" },
                new Gender { GenderId = 3, GenderName = "Other" }
            );
            modelBuilder.Entity<MatchFormat>().HasData(
                new MatchFormat { MatchFormatId = 1, FormatName = "T20" },
                new MatchFormat { MatchFormatId = 2, FormatName = "ODI" },
                new MatchFormat { MatchFormatId = 3, FormatName = "Test" }
            );


            //modelBuilder.Entity<Trainer>().HasData(
            //   new Trainer { TrainerId = 1, Name = "Rahul Sharma", SkillName = "Batting" },
            //   new Trainer { TrainerId = 2, Name = "Kamrul Islam", SkillName = "Bowling" },
            //   new Trainer { TrainerId = 3, Name = "Jaber Haque", SkillName = "Bowling" },
            //   new Trainer { TrainerId = 4, Name = "Ashraful Ahmed", SkillName = "Batting" },
            //   new Trainer { TrainerId = 5, Name = "Habibul Bashar", SkillName = "Batting" });
            //base.OnModelCreating(modelBuilder);

        }
    }
}
    