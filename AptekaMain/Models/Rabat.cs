using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class Rabat
    {
        public Rabat()
        {
            Sprzedaz = new HashSet<Sprzedaz>();
        }

        public int IdRabat { get; set; }
        public int? ProcentRabatu { get; set; }
        public string CzyJestAktywny { get; set; }
        public DateTime? DataPoczatku { get; set; }
        public DateTime? DataZakonczenia { get; set; }

        public ICollection<Sprzedaz> Sprzedaz { get; set; }
    }
}
