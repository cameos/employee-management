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
    public class PersonController : ApiController
    {

        //set the respoitry dependey for the person
        private readonly Imain<Person> _per;
        public PersonController(Imain<Person> per)
        {
            _per = per;
        }


        // GET api/<controller>
        [HttpGet]
        public List<Person> Get()
        {
            List<Person> all = new List<Person>();
            all = _per.GetAll();
            return all;
        }

        // GET api/<controller>/5
        [HttpGet]
        public Person Get(int id)
        {
            Person person = new Person();
            person = _per.FindOne(id);
            return person;
        }

        // POST api/<controller>
        [HttpPost]
        public bool Post(Person person)
        {
            bool flag = false;
            if (_per.Add(person))
                flag = true;
            return flag;
        }

        // PUT api/<controller>/5
        [HttpPut]
        public bool Put(Person person)
        {
            bool flag = false;

            Person temp = _per.FindOne(person.PersonId);
            temp.PersonId = person.PersonId;
            temp.FirstName = person.FirstName;
            temp.LastName = person.LastName;
           

            //persist
            if (_per.Update(temp))
                flag = true;
            return flag;
        }

        // DELETE api/<controller>/5
        [HttpDelete]
        public bool Delete(int id)
        {
            bool flag = false;
            if (_per.Remove(id))
                flag = true;
            return flag;
        }
    }
}