//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace JobzzService.Domain
{
    using System;
    using System.Collections.Generic;
    
    public partial class Skill
    {
        public int id { get; set; }
        public string name { get; set; }
        public int level_id { get; set; }
        public int experience { get; set; }
    
        public Level Level { get; set; }
    }
}