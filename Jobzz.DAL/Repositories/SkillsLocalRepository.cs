using Jobzz.DAL.Interfaces;
using JobzzService.Domain;
using System.Collections.Generic;
using System.Linq;

namespace Jobzz.DAL.Repositories
{
    public class SkillsLocalRepository : ISkillsRepository
    {
        private static List<Level> levels = new List<Level>() { 
            new Level(){id = 1, level_name = "Basic"},
            new Level(){id = 2, level_name = "Intermediate"},
            new Level(){id = 3, level_name = "Advanced"},
            new Level(){id = 4, level_name = "Expert"}
        };

        private static List<Skill> skills = new List<Skill>() { 
            new Skill(){id = 1, name="First test skill", experience=2, level_id = 1, Level=levels[0]},
            new Skill(){id = 3, name="Second great skill", experience=3, level_id = 2, Level=levels[1]}
        };

        public IEnumerable<Skill> GetSkills()
        {
            return skills;
        }

        public Skill GetSkill(int id)
        {
            return (from c in skills
                    where c.id == id
                    select c).FirstOrDefault();
        }

        public Skill CreateSkill(Skill skill)
        {
            skill.id = 0;
            skills.Add(skill);
            skill.id = (skills.Max(s => s.id));
            skill.id++;
            return GetSkill(skill.id);
        }

        public Skill UpdateSkill(Skill skill)
        {
            if (skill == null) return null;
            Skill s = GetSkill(skill.id);
            if (s == null) return null;

            s.experience = skill.experience;
            s.level_id = skill.level_id;
            s.name = skill.name;
            s.Level = GetLevel(skill.level_id);
            return s;
        }

        public Skill DeleteSkill(Skill skill)
        {
            if (skill == null) return null;
            return DeleteSkill(skill.id);
        }

        public Skill DeleteSkill(int id)
        {
            var s = GetSkill(id);
            if (s == null) return null;
            skills.Remove(s);
            return s;
        }

        public IEnumerable<Level> GetLevels()
        {
            return levels;
        }

        public Level GetLevel(int id)
        {
            return (from l in levels where l.id == id select l).FirstOrDefault();
        }
    }
}
