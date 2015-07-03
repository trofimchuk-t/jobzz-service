using System.Collections.Generic;
using System.Web.Http;
using Jobzz.DAL.Interfaces;
using JobzzService.Domain;

namespace JobzzService.Controllers
{
    public class SkillsApiController : ApiController
    {
        private readonly ISkillsRepository repository;

        public SkillsApiController(ISkillsRepository skillsRepository)
        {
            repository = skillsRepository;
            //repository = new SkillsRepository();
        }

        [HttpGet]
        public IEnumerable<Skill> GetSkills()
        {
            return repository.GetSkills();
        }

        [HttpGet]
        public Skill GetSkill(int id)
        {
            return repository.GetSkill(id);
        }

        [HttpPost]
        public Skill CreateSkill(Skill obj)
        {
            return repository.CreateSkill(obj);
        }

        [HttpPut]
        public Skill EditSkill(Skill obj)
        {
            return repository.UpdateSkill(obj);
        }

        [HttpDelete]
        public Skill DeleteSkill(Skill obj)
        {
            if (obj == null || obj.id <= 0)
                return null;

            return repository.DeleteSkill(obj);
        }

        [HttpDelete]
        public Skill DeleteSkill(int id)
        {
            return repository.DeleteSkill(id);
            //return repository.GetSkill(id);
        }

        [HttpGet]
        public IEnumerable<Level> GetLevels()
        {
            return repository.GetLevels();
        }
    }
}
