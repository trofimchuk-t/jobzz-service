using System.Web.Http;
using System.Web.Mvc;
using Jobzz.DAL.Interfaces;
using Jobzz.DAL.Repositories;
using Microsoft.Practices.Unity;
using Unity.Mvc5;

namespace JobzzService
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            //container.RegisterType<ISkillsRepository, SkillsRepository>();
            container.RegisterType<ISkillsRepository, SkillsLocalRepository>();

            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
            GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);
        }
    }
}