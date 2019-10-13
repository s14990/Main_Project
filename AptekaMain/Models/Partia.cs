using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class Partia
    {
        public Partia()
        {
            Batch = new HashSet<Batch>();
        }

        public int IdPartia { get; set; }
        public DateTime? DataWaznosci { get; set; }
        public int ArtykulIdArtukulu { get; set; }
        public int? ZamowienieIdZamowienia { get; set; }
        public string Status { get; set; }
        public double? CenaWSprzedaży { get; set; }
        public double? CenaWZakupu { get; set; }
        public int? Liczba { get; set; }

        public Artykul ArtykulIdArtukuluNavigation { get; set; }
        public Zamowienie ZamowienieIdZamowieniaNavigation { get; set; }
        public ICollection<Batch> Batch { get; set; }
    }
}
