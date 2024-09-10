using Infrastructure.Model;
using System.Data.SqlTypes;

namespace TaskManagement.Model.Dtos.User
{
    public class UserPutDto : IDto
    {
        public int UserId { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
        private DateTime _createdAt;
        public DateTime CreatedAt
        {
            get => _createdAt;
            set => _createdAt = value < SqlDateTime.MinValue.Value ? SqlDateTime.MinValue.Value : value;
        }

        private DateTime _updatedAt;
        public DateTime UpdatedAt
        {
            get => _updatedAt;
            set => _updatedAt = value < SqlDateTime.MinValue.Value ? SqlDateTime.MinValue.Value : value;
        }
    }
}
