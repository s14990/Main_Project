using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class Kategoria
    {
        public Kategoria()
        {
            Artykul = new HashSet<Artykul>();
        }

        public int IdKategoria { get; set; }
        public string Nazwa { get; set; }

        public ICollection<Artykul> Artykul { get; set; }
    }
}
