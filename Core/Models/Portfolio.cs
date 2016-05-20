using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Portfolio
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Icon { get; set; }

        public virtual ICollection<Stock> Stocks { get; set; }

        public Portfolio()
        {
            Stocks = new HashSet<Stock>();
        }
    }
}
