using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class Hurtownia
    {
        public Hurtownia()
        {
            Zamowienie = new HashSet<Zamowienie>();
        }

        public int IdHurtownia { get; set; }
        public string Nazwa { get; set; }
        public int? DniNaOplate { get; set; }
        public int? DniNaDostawe { get; set; }

        public ICollection<Zamowienie> Zamowienie { get; set; }
    }
}
