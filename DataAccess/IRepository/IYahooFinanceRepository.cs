using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.IRepository
{
    public interface IYahooFinanceRepository
    {
        Task<IEnumerable<HistoricalStockData>> GetHistoricalStockDataAsync(string id, DateTime? starDate = null, DateTime? endDate = null, string interval = null);

        Task<Dictionary<string, IEnumerable<HistoricalStockData>>> GetHistoricalStockDataAsync(string[] ids, DateTime? starDate = null, DateTime? endDate = null, string interval = null);

        Task<LongStockData> GetAsync(string id);

        Task<IEnumerable<ShortStockData>> GetAsync(string[] ids);
    }
}
