using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.Entity;
using DataAccess.Models;
using DataAccess.AcmeConnection;

namespace AcmeRepository.Repository
{
    public class PersonRepository:Imain<Person>
    {
        public bool Add(Person person)
        {
            bool flag = false;
            if (person == null && person.PersonId != 0)
                return flag;

            //if everything right add the person
            using (var ctx = new EmployeeContext())
            {
                ctx.Person.Add(person);
                ctx.SaveChanges();
                flag = true;
            }
            return flag;
        }

        //update person
        public bool Update(Person person)
        {
            bool flag = false;
            if (person == null && person.PersonId == 0)
                return flag;

            //open connection modify
            using (var ctx = new EmployeeContext())
            {
                ctx.Entry<Person>(person).State = EntityState.Modified;
                ctx.SaveChanges();
                flag = true;
            }
            return flag;
        }

        //remove one entity
        public bool Remove(int id)
        {
            bool flag = false;
            if (id == 0)
                return flag;

            //open connection and modify
            using (var ctx = new EmployeeContext())
            {
                var person = ctx.Person.Find(id);
                if(person != null)
                {
                    ctx.Person.Remove(person);
                    ctx.SaveChanges();
                    flag = true;
                }
                else
                {
                    flag = false;
                }
            }
            return flag;
        }

        //find one person
        public Person FindOne(int id)
        {
            Person person = new Person();
            using (var ctx = new EmployeeContext())
            {
                person = ctx.Person.Where(p => p.PersonId == id).Include("Employees").FirstOrDefault();
            }
            return person;
        }

        //get all people
        public List<Person> GetAll()
        {
            List<Person> all = new List<Person>();
            using (var ctx = new EmployeeContext())
            {
                all = (from p in ctx.Person
                       select p).ToList<Person>();
            }
            return all;
        }
    }
}
