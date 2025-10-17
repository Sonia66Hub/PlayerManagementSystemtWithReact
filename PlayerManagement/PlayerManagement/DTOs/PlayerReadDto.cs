using Newtonsoft.Json;
using PlayerManagement.Models;

namespace PlayerManagement.DTOs
{
    public class PlayerReadDto
    {
        public int PlayerId { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;

        public DateTime? DateOfBirth { get; set; }

        public string? FathersName { get; set; }

        public string? MothersName { get; set; }

        public string MobileNo { get; set; } = null!;

        public string? ImageUrl { get; set; } = null!;

        public string? ImageName { get; set; } = null!;

        public string? NidNumber { get; set; }

        public string? Email { get; set; }

        public decimal? Height { get; set; }

        public decimal? PlayerWeight { get; set; }

        public string? LastEducationalQualification { get; set; }

        public virtual BloodGroupMini BloodGroup { get; set; } = null!;

        public virtual ICollection<PlayerTrainingAssignmentReadDto> PlayerTrainingAssignments { get; set; } = new List<PlayerTrainingAssignmentReadDto>();

        public virtual ReligionMini Religion { get; set; } = null!;

        public virtual SportsTypeMini SportsType { get; set; } = null!;

        public virtual GenderMini Gender { get; set; } = null!;
    }

    public class GenderMini
    {
        public int GenderId { get; set; }
        public string GenderName { get; set; } = null!;
    }

    public class SportsTypeMini
    {
        public int SportsTypeId { get; set; }

        public string TypeName { get; set; } = null!;
    }

    public class ReligionMini
    {
        public int ReligionId { get; set; }

        public string ReligionName { get; set; } = null!;
    }

    public class BloodGroupMini
    {
        public int BloodGroupId { get; set; }

        public string GroupName { get; set; } = null!;
    }

    public class PlayerCreateUpdateDto
    {
        public int PlayerId { get; set; }

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public DateTime? DateOfBirth { get; set; }

        public string? FathersName { get; set; }

        public string? MothersName { get; set; }

        public string MobileNo { get; set; } = null!;

        public IFormFile? PictureFile { get; set; }

        public string? ImageName { get; set; } = null!;

        public string? NidNumber { get; set; }

        public string? Email { get; set; }

        public decimal? Height { get; set; }

        public decimal? PlayerWeight { get; set; }

        public string? LastEducationalQualification { get; set; }

        public int SportsTypeId { get; set; }

        public int BloodGroupId { get; set; }

        public int ReligionId { get; set; }
        public int GenderId { get; set; }

        public string PlayerTrainingAssignmentsJson { get; set; }
    }

    public class TrainingReadDto
    {
        public int TrainingId { get; set; }

        public string TrainingName { get; set; } = null!;
    }

    public class PlayerTrainingAssignmentDto
    {
        public int TrainingId { get; set; }
        public string TrainingName { get; set; } = null!;
        public DateTime? TrainingDate { get; set; }
        public int Duration { get; set; }
        public string? Venue { get; set; } = null!;
    }
    public class PlayerTrainingAssignmentReadDto
    {
        public int TrainingId { get; set; }
        public string TrainingName { get; set; }
        public DateTime? TrainingDate { get; set; }
        public int Duration { get; set; }
        public string? Venue { get; set; }
    }
}
