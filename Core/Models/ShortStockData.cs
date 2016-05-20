using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class ShortStockData
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string StockExchange { get; set; }

        public string Open { get; set; }

        public string Change { get; set; }

        public string PreviousClose { get; set; }

        public string ChangeInPercent { get; set; }
    }
}
