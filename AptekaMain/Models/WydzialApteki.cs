using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class WydzialApteki
    {
        public WydzialApteki()
        {
            Batch = new HashSet<Batch>();
            Pracownik = new HashSet<Pracownik>();
        }

        public int IdWydzial { get; set; }
        public string Adres { get; set; }
        public string KodPocztowy { get; set; }

        public ICollection<Batch> Batch { get; set; }
        public ICollection<Pracownik> Pracownik { get; set; }
    }
}
