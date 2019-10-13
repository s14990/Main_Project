using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class SprzedazProduktów
    {
        public int SprzedazIdSprzedazy { get; set; }
        public int BatchWApteceIdProduktu { get; set; }

        public Batch BatchWApteceIdProduktuNavigation { get; set; }
        public Sprzedaz SprzedazIdSprzedazyNavigation { get; set; }
    }
}
