using PlayerManagement.Models;

namespace PlayerManagement.DTOs
{

    public class PlayerEvaluationDetailReadDto
    {
        public int EvaluationTypeId { get; set; }
        public string TypeName { get; set; }
        public int? MatchId { get; set; }
        public string Title { get; set; }
        public int EvaluationCategoryId { get; set; }
        public string CategoryName { get; set; }

        public int OverNumber { get; set; }
        public int? BallNumber { get; set; }

        // Batting
        public int? RunsScored { get; set; }
        public int? BallsFaced { get; set; }
        public int? Boundaries { get; set; }
        public bool? IsOut { get; set; }
        public string? DismissalType { get; set; }

        // Bowling
        public int? BallsBowled { get; set; }
        public int? RunsConceded { get; set; }
        public int? WicketsTaken { get; set; }
        public int? NoBalls { get; set; }
        public int? Wides { get; set; }
        public bool? IsBoundary { get; set; }

        // Fielding
        public int? CatchesTaken { get; set; }
        public int? RunOuts { get; set; }
        public int? Misfields { get; set; }
        public int? Stumpings { get; set; }
    }
    public class PlayerEvaluationDetailDto
    {
        public int EvaluationTypeId { get; set; }
        public string TypeName { get; set; } = null!;
        public int? MatchId { get; set; }
        public string Title { get; set; } = null!;
        public int EvaluationCategoryId { get; set; }
        public string CategoryName { get; set; } = null!;

        public int OverNumber { get; set; }
        public int? BallNumber { get; set; }

        // Batting
        public int? RunsScored { get; set; }
        public int? BallsFaced { get; set; }
        public int? Boundaries { get; set; }
        public bool? IsOut { get; set; }
        public string? DismissalType { get; set; }

        // Bowling
        public int? BallsBowled { get; set; }
        public int? RunsConceded { get; set; }
        public int? WicketsTaken { get; set; }
        public int? NoBalls { get; set; }
        public int? Wides { get; set; }
        public bool? IsBoundary { get; set; }

        // Fielding
        public int? CatchesTaken { get; set; }
        public int? RunOuts { get; set; }
        public int? Misfields { get; set; }
        public int? Stumpings { get; set; }
    }
    public class PlayerEvaluationReadDto
    {
        public int PlayerEvaluationId { get; set; }
        public DateTime EvaluationDate { get; set; }
        public bool IsCompleted { get; set; }
        public string? Remarks { get; set; }
        public virtual PlayerMini Player { get; set; } = null!;
        public virtual TrainerMini Trainer { get; set; } = null!;
        public List<PlayerEvaluationDetailReadDto> PlayerEvaluationDetails { get; set; }
    }
    public class PlayerEvaluationCreateUpdateDto
    {
        public int? PlayerEvaluationId { get; set; }
        public int PlayerId { get; set; }
        public int TrainerId { get; set; }
        public DateTime EvaluationDate { get; set; }
        public bool IsCompleted { get; set; }
        public string? Remarks { get; set; }
        public string PlayerEvaluationDetailsJson { get; set; }
    }

    public class PlayerMini
    {
        public int PlayerId { get; set; }
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
    public class TrainerMini
    {
        public int TrainerId { get; set; }
        public string TrainerName { get; set; } = null!;
    }
    public class EvaluationTypeReadDto
    {
        public int EvaluationTypeId { get; set; }

        public string TypeName { get; set; } = null!;
    }
}
