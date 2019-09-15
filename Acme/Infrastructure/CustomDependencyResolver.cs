using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Dependencies;
using Ninject;
using Ninject.Extensions.ChildKernel;
using Ninject.Web.Common;
using System.Configuration;
using System.Web.Routing;
using DataAccess.Models;
using AcmeRepository.Repository;


namespace Acme.Infrastructure
{
    public class CustomDependencyResolver : IDependencyResolver
    {
        private IKernel kernel;
        public CustomDependencyResolver() : this(new StandardKernel()) 
        { 

        }

        public CustomDependencyResolver(IKernel ninjectKernel, bool scope = false)
        {
            kernel = ninjectKernel;
            if (!scope)
                AddBindings(kernel);
        }

        public IDependencyScope BeginScope()
        {
            return new CustomDependencyResolver(AddRequestBindings(new ChildKernel(kernel)), true);
        }

        //get one service
        public object GetService(Type ServiceType)
        {
            return kernel.TryGet(ServiceType);
        }

        //get services(IEnumerable)
        public IEnumerable<object> GetServices(Type serviceType)
        {
            return kernel.GetAll(serviceType);
        }

        public void Dispose()
        {
            //do nothing here
        }

        //add bindings here that allow dependencey resolver
        public void AddBindings(IKernel kernel)
        {
            
        }

        private IKernel AddRequestBindings(IKernel kernel)
        {
            kernel.Bind<Imain<Person>>().To<PersonRepository>().InSingletonScope();
            kernel.Bind<Imain<Employee>>().To<EmployeeRepository>().InSingletonScope();

            return kernel;
        }
    }
}