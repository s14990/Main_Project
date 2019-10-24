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
        private DateTime _date;
        public DateTime DataGen
        {
            get => _date.Date;
            set
            {
                _date = value;
            }
        }


        public ICollection<Braki> Braki { get; set; }
    }
}
