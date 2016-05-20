using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StockER.Models
{
    public class PortfolioDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Icon { get; set; }

        public virtual IEnumerable<StockDTO> Stocks { get; set; }
    }

    public class PortfolioStockDTO 
    {
        public int PortfolioId { get; set; }

        public string StockId { get; set; }
    }

    public class StockDTO
    {
        public string Id { get; set; }

        public string StockExchange { get; set; }

        public string Name { get; set; }

        public string IPOyear { get; set; }

        public string Sector { get; set; }

        public string Industry { get; set; }

        public string SummaryQuote { get; set; }

        public IEnumerable<PortfolioDTO> Portfolios { get; set; }

    }
}