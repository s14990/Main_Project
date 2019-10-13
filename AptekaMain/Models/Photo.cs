using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class Photo
    {
        public int IdPhoto { get; set; }
        public string PhotoPath { get; set; }
        public int ArtykulIdArtukulu { get; set; }
        public string PhotoName { get; set; }
        public byte[] Photo1 { get; set; }

        public Artykul ArtykulIdArtukuluNavigation { get; set; }
    }
}
