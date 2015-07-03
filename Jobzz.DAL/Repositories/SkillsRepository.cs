using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Jobzz.DAL.Interfaces;
using JobzzService.Domain;

namespace Jobzz.DAL.Repositories
{
    public class SkillsRepository : ISkillsRepository
    {
        public IEnumerable<Skill> GetSkills()
        {
            using (var context = new TarikSkillsDB())
            {
                return context.Skills.Include("Level").ToList();
            }
        }

        public Skill GetSkill(int id)
        {
            using (var ctx = new TarikSkillsDB())
            {
                return GetSkill(id, ctx);
            }
        }

        public Skill CreateSkill(Skill skill)
        {
            using (var ctx = new TarikSkillsDB())
            {
                ctx.Skills.Add(skill);
                ctx.SaveChanges();
                int newId = skill.id;

                return GetSkill(newId, ctx);
            }
        }

        public Skill UpdateSkill(Skill skill)
        {
            using (var ctx = new TarikSkillsDB())
            {
                Skill s = GetSkill(skill.id, ctx);
                if (s == null) return null;

                s.level_id = skill.level_id;
                s.name = skill.name;
                s.experience = skill.experience;
                ctx.SaveChanges();
                s.Level = GetLevel(s.level_id);
                return s;
            }
        }

        public Skill DeleteSkill(Skill skill)
        {
            if (skill == null || skill.id <= 0)
                return null;

            return DeleteSkill(skill.id);
        }

        public Skill DeleteSkill(int id)
        {
            using (var ctx = new TarikSkillsDB())
            {
                Skill s = GetSkill(id, ctx);
                if (s == null) return null;

                ctx.Skills.Remove(s);
                ctx.SaveChanges();
                return s;
            }
        }

        public IEnumerable<Level> GetLevels()
        {
            using (var ctx = new TarikSkillsDB())
            {
                return ctx.Levels.ToList();
            }
        }

        public Level GetLevel(int id)
        {
            using (var ctx = new TarikSkillsDB())
            {
                return (from c in ctx.Levels
                    where c.id == id
                    select c).FirstOrDefault();
            }
        }

        private static Skill GetSkill(int id, TarikSkillsDB ctx)
        {
            return (from s in ctx.Skills
                    where s.id == id
                    select s).Include("Level").FirstOrDefault();
        }
    }
}
