using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccess.Models;
using AcmeRepository.Repository;

namespace Acme.Controllers
{
    public class EmployeeController : ApiController
    {
        
        //set the dependency repository for employess
        private readonly Imain<Employee> _emp;
        public EmployeeController(Imain<Employee> emp)
        {
            _emp = emp;
        }


        // GET api/<controller>
        [HttpGet]
        public List<Employee> Get()
        {
            List<Employee> emps = new List<Employee>();
            emps = _emp.GetAll();
            return emps;
        }

        // GET api/<controller>/5
        [HttpGet]
        public Employee Get(int id)
        {
            Employee emp = new Employee();
            emp = _emp.FindOne(id);
            return emp;
        }

        // POST api/<controller>
        [HttpPost]
        public bool Post(Employee emp)
        {
            bool flag = false;
            if (_emp.Add(emp))
                flag = true;
            return flag;
        }

        // PUT api/<controller>/5
        [HttpPut]
        public bool Put(Employee emp)
        {
            bool flag = false;
            Employee temp = _emp.FindOne(emp.EmployeeId);

            temp.EmployeeId = emp.EmployeeId;
            temp.EmployeeNum = emp.EmployeeNum;
            temp.PersonId = emp.PersonId;
            temp.TerminatedDate = emp.TerminatedDate;

            if (_emp.Update(temp))
                flag = true;
            return flag;
        }

        // DELETE api/<controller>/5
        [HttpDelete]
        public bool Delete(int id)
        {
            bool flag = false;
            if (_emp.Remove(id))
                flag = true;
            return flag;

        }
    }
}