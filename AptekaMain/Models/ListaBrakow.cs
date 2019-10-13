using System;
using System.Collections.Generic;

namespace AptekaMain.Models
{
    public partial class ListaBrakow
    {
        public ListaBrakow()
        {
            Braki = new HashSet<Braki>();
        }

        public int IdLista { get; set; }
        public DateTime? DataGen { get; set; }

        public ICollection<Braki> Braki { get; set; }
    }
}
