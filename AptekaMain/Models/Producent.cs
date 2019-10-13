using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class Producent
    {
        public Producent()
        {
            Artykul = new HashSet<Artykul>();
        }

        public int IdProducent { get; set; }
        public string Nazwa { get; set; }
        public string Kraj { get; set; }

        public ICollection<Artykul> Artykul { get; set; }
    }
}
