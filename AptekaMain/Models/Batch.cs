using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class Batch
    {
        public Batch()
        {
            SprzedazProduktów = new HashSet<SprzedazProduktów>();
        }

        public int IdBatch { get; set; }
        public int? Kod { get; set; }
        public int? Liczba { get; set; }
        public int PartiaIdPartia { get; set; }
        public int PartiaArtykulIdArtukulu { get; set; }
        public int WydzialAptekiIdWydzialu { get; set; }

        public Partia Partia { get; set; }
        public WydzialApteki WydzialAptekiIdWydzialuNavigation { get; set; }
        public ICollection<SprzedazProduktów> SprzedazProduktów { get; set; }
    }
}
