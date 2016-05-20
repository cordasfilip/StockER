using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.IRepository
{
    public interface IPortfolioRepository : ILiveRepositoryAsync<Portfolio>
    {
        Stock AddStockToPortfolio(int portfolioId, string stockId);

        Stock RemoveStockFromPortfolio(int portfolioId, string stockId);

        IEnumerable<string> GetFactorNames(int id);

        IEnumerable<PortfolioFeature> GetFeatures(int id);

        string SaveFeaturesToDatabase(int portfolioId, WH wh);
    }
}
