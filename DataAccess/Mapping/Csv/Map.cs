using Core.Models;
using CsvHelper.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapping.Csv
{
    public class HistoricalStockDataMap:CsvClassMap<HistoricalStockData>
    {
        public HistoricalStockDataMap()
        {
            Map(m => m.Date).Name("Date");
            Map(m => m.High).Name("High");
            Map(m => m.Low).Name("Low");
            Map(m => m.AdjClose).Name("Adj Close");
            Map(m => m.Open).Name("Open");
            Map(m => m.Close).Name("Close");
            Map(m => m.Volume).Name("Volume");
        }
    }

    public class ShortStockDataMap : CsvClassMap<ShortStockData> 
    {
        public ShortStockDataMap()
        {
            Map(m => m.Id).Index(0);
            Map(m => m.Name).Index(1);
            Map(m => m.Open).Index(2);
            Map(m => m.PreviousClose).Index(3);
            Map(m => m.Change).Index(4);
            Map(m => m.ChangeInPercent).Index(5);
            Map(m => m.StockExchange).Index(6);
        }
    }

    public class StockMap : CsvClassMap<Stock>
    {
        public StockMap()
        {
            Map(m => m.Id).Name("Id");
            Map(m => m.Name).Name("Name");
            Map(m => m.Industry).Name("Industry");
            Map(m => m.Sector).Name("Sector");
            Map(m => m.StockExchange).Name("StockExchange");
            Map(m => m.SummaryQuote).Name("SummaryQuote");
            Map(m => m.IPOyear).Name("IPOyear");
        }
    }
}
