using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.Entity;
using DataAccess.AcmeConnection;
using DataAccess.Models;

namespace AcmeRepository.Repository
{
    public class EmployeeRepository:Imain<Employee>
    {
        //add one emplyee
        public bool Add(Employee emp)
        {
            bool flag = false;
            if (emp.EmployeeId != 0 && emp == null)
                return flag;

            //open connection and add
            using (var ctx = new EmployeeContext())
            {
                ctx.Employee.Add(emp);
                ctx.SaveChanges();
                flag = true;
            }
            return flag;
        }

        //update employee
        public bool Update(Employee emp)
        {
            bool flag = false;
            if (emp.EmployeeId == 0 && emp == null)
                return flag;

            //open connection
            using (var ctx = new EmployeeContext())
            {
                ctx.Entry<Employee>(emp).State = EntityState.Modified;
                ctx.SaveChanges();
                flag = true;
            }
            return flag;
        }

        //remove employee
        public bool Remove(int id)
        {
            bool flag = false;
            if (id == 0)
                return flag;

            //open connection and modify
            using (var ctx = new EmployeeContext())
            {
                var e = ctx.Employee.Find(id);
                if(e != null)
                {
                    ctx.Employee.Remove(e);
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

        //find one employee
        public Employee FindOne(int id)
        {
            Employee emp = new Employee();

            using (var ctx = new EmployeeContext())
            {
                emp = (from e in ctx.Employee
                       where (e.EmployeeId == id)
                       select e).FirstOrDefault<Employee>();
            }
            return emp;
        }

        //get all employees
        public List<Employee> GetAll()
        {
            List<Employee> all = new List<Employee>();

            //open connection and get all employees
            using (var ctx = new EmployeeContext())
            {
                all = (from e in ctx.Employee
                       select e).ToList<Employee>();
            }
            return all;
        }
    }
}
