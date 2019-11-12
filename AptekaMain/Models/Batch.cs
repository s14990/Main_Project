using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class Batch
    {
        public Batch()
        {
            SprzedazProduktow = new HashSet<SprzedazProduktow>();
        }

        public int IdBatch { get; set; }
        public int? Kod { get; set; }
        public int? Liczba { get; set; }
        public int WydzialAptekiIdWydzialu { get; set; }
        public int IdPartia { get; set; }

        public Batch IdBatchNavigation { get; set; }
        public Partia IdPartiaNavigation { get; set; }
        public WydzialApteki WydzialAptekiIdWydzialuNavigation { get; set; }
        public Batch InverseIdBatchNavigation { get; set; }
        public ICollection<SprzedazProduktow> SprzedazProduktow { get; set; }
    }
}
