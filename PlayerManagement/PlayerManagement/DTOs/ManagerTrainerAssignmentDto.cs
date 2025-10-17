namespace PlayerManagement.DTOs
{
     public class ManagerTrainerAssignmentDto
    {
        public int TrainerId { get; set; }
        public string SkillName { get; set; }
        public DateTime JoiningDate { get; set; }
    }
    public class ManagerTrainerAssignmentReadDto
    {
        public int TrainerId { get; set; }
        public string TrainerName { get; set; } = null!;
        public string SkillName { get; set; }
        public DateTime JoiningDate { get; set; }
    }
    public class ManagerReadDto
    {
        public int ManagerId { get; set; }

        public string Name { get; set; } = null!;

        public DateTime Dob { get; set; }

        public string? ImageUrl { get; set; }

        public string ContactNumber { get; set; } = null!;

        public string Email { get; set; } = null!;

        public bool IsActive { get; set; }
        public List<ManagerTrainerAssignmentReadDto> ManagerTrainerAssignments { get; set; }
    }
    public class ManagerCreateUpdateDto
    {
        public int? ManagerId { get; set; }

        public string Name { get; set; } = null!;

        public DateTime Dob { get; set; }

        public string? ImageUrl { get; set; }
        public IFormFile? PictureFile { get; set; }

        public string ContactNumber { get; set; } = null!;

        public string Email { get; set; } = null!;

        public bool IsActive { get; set; }
        public string ManagerTrainerAssignmentsJson { get; set; }
    }
   
}
