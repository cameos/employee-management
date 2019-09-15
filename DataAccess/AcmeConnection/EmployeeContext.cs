using DataAccess.Models;
using DataAccess.ModelConfiguration;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.Entity;

namespace DataAccess.AcmeConnection
{
    public class EmployeeContext:DbContext
    {
        public EmployeeContext()
            : base()
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<EmployeeContext, DataAccess.Migrations.Configuration>());
        }

        public DbSet<Person> Person { get; set; }
        public DbSet<Employee> Employee { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Configurations.Add<Person>(new PersonConfiguration());
            modelBuilder.Configurations.Add<Employee>(new EmployeeConfiguration());


            base.OnModelCreating(modelBuilder);
        }
    }
}
