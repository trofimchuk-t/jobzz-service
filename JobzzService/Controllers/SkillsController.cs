using System.Linq;
using System.Web.Mvc;
using Jobzz.DAL.Interfaces;
using Jobzz.DAL.Repositories;
using JobzzService.Models;

namespace JobzzService.Controllers
{
    public class SkillsController : Controller
    {
        private readonly ISkillsRepository repository;

        public SkillsController(ISkillsRepository skillsRepository)
        {
            repository = skillsRepository;
        }

        public ActionResult Index()
        {
            ViewBag.Skills = repository.GetSkills();
            ViewBag.Levels = from c in repository.GetLevels()
                             orderby c.id
                             select new SelectListItem() { Text = c.level_name, Value = c.id.ToString() };
            return View();
        }

        public ActionResult Test()
        {
            return View();
        }
    }
}