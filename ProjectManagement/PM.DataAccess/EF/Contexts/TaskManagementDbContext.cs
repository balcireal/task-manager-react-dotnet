using Microsoft.EntityFrameworkCore;
using TaskManagement.Model.Entities;
using FileEntity = TaskManagement.Model.Entities.File;

namespace TaskManagement.DataAccess.EF.Contexts
{
    public class TaskManagementDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"server=.\SQLEXPRESS;database=TaskManagementDB;trusted_connection=true;");
        }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<FileEntity> Files { get; set; }
        public DbSet<Mission> Missions { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
