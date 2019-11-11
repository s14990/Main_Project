using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class Braki
    {
        public int IdBraki { get; set; }
        public int? Illosc { get; set; }
        public int ListaBrakowIdListy { get; set; }
        public int ArtykulIdArtukulu { get; set; }
        public int? ProcentBraku { get; set; }

        public Artykul ArtykulIdArtukuluNavigation { get; set; }
        public ListaBrakow ListaBrakowIdListyNavigation { get; set; }
    }
}
