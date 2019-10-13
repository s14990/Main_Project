using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class ScanRecepty
    {
        public int IdScan { get; set; }
        public string ScanPath { get; set; }
        public int SprzedazIdSprzedazy { get; set; }
        public string ScanName { get; set; }
        public string Scan { get; set; }

        public Sprzedaz SprzedazIdSprzedazyNavigation { get; set; }
    }
}
