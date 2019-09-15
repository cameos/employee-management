using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using DataAccess.Models;

namespace DataAccess.ModelConfiguration
{
    public class EmployeeConfiguration:EntityTypeConfiguration<Employee>
    {
        public EmployeeConfiguration()
        {
            this.HasKey<int>(c => c.EmployeeId).Property(c => c.EmployeeId).HasColumnType("int").HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity).IsRequired();
            this.Property(c => c.EmployeeNum).HasColumnType("nvarchar").HasMaxLength(16).IsFixedLength().IsRequired();
            this.Property(c => c.EmployedDate).HasColumnType("datetime2").HasPrecision(0).IsRequired();
            this.Property(c => c.TerminatedDate).HasColumnType("datetime2").HasPrecision(0).IsOptional();
        }
    }
}
