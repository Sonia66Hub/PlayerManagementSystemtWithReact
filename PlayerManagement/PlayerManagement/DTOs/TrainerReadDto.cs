namespace PlayerManagement.DTOs
{
    public class TrainerReadDto
    {
        public int TrainerId { get; set; }
        public string TrainerName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string? Picture { get; set; }
        public bool IsExperienced { get; set; }
        public List<TrainerSkillReadDto> TrainerSkills { get; set; }
    }

    public class TrainerCreateUpdateDto
    {
        public int TrainerId { get; set; }
        public string TrainerName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public bool IsExperienced { get; set; }
        public IFormFile? PictureFile { get; set; }
        public string? Picture { get; set; }
        public string TrainerSkillsJson { get; set; }
    }

    public class TrainerSkillDto
    {
        public int SkillId { get; set; }
        public int Experience { get; set; }
    }
    public class TrainerSkillReadDto
    {
        public int SkillId { get; set; }
        public string SkillName { get; set; }
        public int Experience { get; set; }
    }
    public class SkillReadDto
    {
        public int SkillId { get; set; }
        public string SkillName { get; set; }
    }
}
