using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.IRepository
{
    public interface IStockRepository : IRepository<Stock>
    {
        bool IsStock(string id);

        IEnumerable<Stock> SearchStocks(string value, uint take);
    }
}
