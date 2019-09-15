using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using DataAccess.Models;

namespace DataAccess.ModelConfiguration
{
    public class PersonConfiguration:EntityTypeConfiguration<Person>
    {
        public PersonConfiguration()
        {
            this.HasKey<int>(c => c.PersonId).Property(c => c.PersonId).HasColumnType("int").HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity).IsRequired();
            this.Property(c => c.FirstName).HasColumnType("nvarchar").HasMaxLength(128).IsFixedLength().IsRequired();
            this.Property(c => c.LastName).HasColumnType("nvarchar").HasMaxLength(128).IsFixedLength().IsRequired();
            this.Property(c => c.BirthDate).HasColumnType("datetime2").HasPrecision(0).IsRequired();

            //set the foreign keys
            this.HasMany<Employee>(c => c.Employees).WithRequired(c => c.Person).HasForeignKey<int>(c => c.PersonId).WillCascadeOnDelete(true);
        }
    }
}
