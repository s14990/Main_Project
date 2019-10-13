using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class Pracownik
    {
        public Pracownik()
        {
            UserSession = new HashSet<UserSession>();
        }

        public int IdPracownika { get; set; }
        public string Imie { get; set; }
        public string Nazwisko { get; set; }
        public int? PoziomDostępu { get; set; }
        public int? WydzialAptekiIdWydzialu { get; set; }
        public string Haslo { get; set; }
        public string Email { get; set; }

        public WydzialApteki WydzialAptekiIdWydzialuNavigation { get; set; }
        public ICollection<UserSession> UserSession { get; set; }
    }
}
