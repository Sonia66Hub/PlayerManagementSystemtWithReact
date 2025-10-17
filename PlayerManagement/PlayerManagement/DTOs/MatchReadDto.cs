namespace PlayerManagement.DTOs
{    
        public class MatchCreateUpdateDTO
    {
            public int MatchId { get; set; }
            public string Title { get; set; } = null!;
            public DateTime MatchDate { get; set; }
            public string Venue { get; set; } = null!;
            public string? TeamA { get; set; }
            public string? TeamB { get; set; }
            public string? Result { get; set; }
            public int MatchFormatId { get; set; }
        }

        public class MatchReadDTO
        {
            public int MatchId { get; set; }
            public string Title { get; set; } = null!;
            public DateTime MatchDate { get; set; }
            public string Venue { get; set; } = null!;
            public string? TeamA { get; set; }
            public string? TeamB { get; set; }
            public string? Result { get; set; }
            public virtual MatchFormatMini MatchFormat { get; set; } = null!;
        }
        public class MatchFormatMini
    {
        public int MatchFormatId { get; set; }
        public string FormatName { get; set; } = null!;

        }
   
}
