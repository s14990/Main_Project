using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class Artykul
    {
        public Artykul()
        {
            Braki = new HashSet<Braki>();
            Partia = new HashSet<Partia>();
            Photo = new HashSet<Photo>();
        }

        public int IdArtukul { get; set; }
        public string Nazwa { get; set; }
        public int? Kod { get; set; }
        public int ProducentIdProducent { get; set; }
        public int KategoriaIdKategoria { get; set; }
        public int? IlloscProduktow { get; set; }
        public int? IlloscPodstawowa { get; set; }
        public bool WymaganaRecepta { get; set; }

        public Kategoria KategoriaIdKategoriaNavigation { get; set; }
        public Producent ProducentIdProducentNavigation { get; set; }
        public ICollection<Braki> Braki { get; set; }
        public ICollection<Partia> Partia { get; set; }
        public ICollection<Photo> Photo { get; set; }
    }
}
