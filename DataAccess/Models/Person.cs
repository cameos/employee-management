using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models
{
    public class Person
    {
        //set the hash set collection to avoid nullable collections
        public Person()
        {
            this.Employees = new HashSet<Employee>();
        }

        //fields for the model
        public int PersonId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime BirthDate { get; set; }

        //navigation propeties and collections of employees
        public ICollection<Employee> Employees { get; set; }
    }
}
