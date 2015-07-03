using System.Collections.Generic;
using JobzzService.Domain;

namespace Jobzz.DAL.Interfaces
{
    public interface ISkillsRepository
    {
        IEnumerable<Skill> GetSkills();
        Skill GetSkill(int id);

        Skill CreateSkill(Skill skill);
        Skill UpdateSkill(Skill skill);
        Skill DeleteSkill(Skill skill);
        Skill DeleteSkill(int id);

        IEnumerable<Level> GetLevels();
        Level GetLevel(int id);
    }
}
