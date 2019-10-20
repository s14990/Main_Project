using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class UserSession
    {
        public int IdSession { get; set; }
        public int PracownikIdPracownika { get; set; }
        public bool? Active { get; set; }
        public int? Access { get; set; }
        public string Token { get; set; }

        public Pracownik PracownikIdPracownikaNavigation { get; set; }
    }
}
