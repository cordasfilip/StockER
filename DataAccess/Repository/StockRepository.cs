using Core.Models;
using DataAccess.Context;
using DataAccess.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class StockRepository : IStockRepository
    {
        StockERContext db;

        public StockRepository()
        {
            db = new StockERContext();  
        }

        public IEnumerable<Stock> Add(IEnumerable<Stock> items) 
        {
            using (db.StartTransaction)
            {
                return db.Stocks.AddRange(items);
            }       
        }

        public IEnumerable<Stock> GetFromCsv(string location) 
        {
            CsvHelper.CsvReader reader = new CsvHelper.CsvReader(new System.IO.StreamReader(location));
            reader.Configuration.RegisterClassMap<DataAccess.Mapping.Csv.StockMap>();
            
            using (reader)
            {
                return reader.GetRecords<Stock>().ToArray();
            }

        }
        public IEnumerable<Stock> GetFromString(string data)
        {
            CsvHelper.CsvReader reader = new CsvHelper.CsvReader(new System.IO.StreamReader(new System.IO.MemoryStream(Encoding.UTF8.GetBytes(data))));
            reader.Configuration.RegisterClassMap<DataAccess.Mapping.Csv.StockMap>();

            using (reader)
            {
                return reader.GetRecords<Stock>().ToArray();
            }

        }
        public IQueryable<Stock> Get()
        {
            return db.Stocks;
        }

        public Stock Get(params object[] id)
        {
            return db.Stocks.Find(id);
        }

        public bool IsStock(string id) 
        {
            return db.Stocks.Any(s => s.Id == id);
        }

        public IEnumerable<Stock> SearchStocks(string value, uint take) 
        {
            return db.Stocks.Where(s => s.Id.StartsWith(value) || s.Name.StartsWith(value)).Take((int)take);
        }
    }
}
