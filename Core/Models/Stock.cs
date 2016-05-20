using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Stock
    {
        public string Id { get; set; }

        public string StockExchange { get; set; }

        public string Name { get; set; }

        public string IPOyear { get; set; }

        public string Sector { get; set; }

        public string Industry { get; set; }

        public string SummaryQuote { get; set; }

        public ICollection<Portfolio> Portfolios { get; set; }

        public Stock()
        {
            Portfolios = new HashSet<Portfolio>();
        }
    }
}
