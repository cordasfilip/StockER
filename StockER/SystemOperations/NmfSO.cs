using Core.Models;
using DataAccess.IRepository;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace StockER.SystemOperations
{
    public abstract class NmfSO : SystemOperation
    {

        private static NmfSO instance = new NmfCalculator();

        public static NmfSO Instance { get { return instance; } }

        internal NmfSO()
        {

        }

        public abstract Task<string> CalculateNfmAsync(int portfolioId, uint nf, uint iter, DateTime? startDate = null, DateTime? endDate = null, string interval = null);     
    }

   public class NmfCalculator:NmfSO
    {
        public async override Task<string> CalculateNfmAsync(int portfolioId, uint nf, uint iter, DateTime? startDate = null, DateTime? endDate = null, string interval = null)
        {
            using (Instance.Start(portfolioId))
            {
                Dictionary<string, IEnumerable<HistoricalStockData>> data = await GetStocksAsync(portfolioId, startDate, endDate, interval);

                var rowCount = data.Count;
                var columnCount = data.Min(d => d.Value.Count());

                double[,] m = new double[rowCount, columnCount];
                string[] rows = new string[rowCount];
                string[] columns = new string[columnCount];
                HistoricalStockData column = null;
                int i = 0;

                foreach (var row in data)
                {
                    rows[i] = row.Key;

                    var hsd = row.Value.ToArray();

                    for (int j = 0; j < columnCount; j++)
                    {
                        column = hsd[j];
                        if (i == 0)
                        {
                            columns[j] = column.Date;
                        }
                        m[i, j] = column.Volume;
                    }
                    i += 1;
                }
                IPortfolioRepository dbPortfolio = DataAccess.StockERRepositoryCreator.RepositoryCreator.GetRepository<IPortfolioRepository>();
                var wh = Utils.Nmf.Calculate(m, nf, iter);
                wh.Rows = rows;
                wh.Columns = columns;
                dbPortfolio.SaveFeaturesToDatabase(portfolioId, wh);


                return "OK";
            }
        }

        private async Task<Dictionary<string, IEnumerable<HistoricalStockData>>> GetStocksAsync(int portfolioId, DateTime? startDate = null, DateTime? endDate = null, string interval = null)
        {
            IPortfolioRepository dbPortfolio = DataAccess.StockERRepositoryCreator.RepositoryCreator.GetRepository<IPortfolioRepository>();
            IYahooFinanceRepository dbYahoo = DataAccess.StockERRepositoryCreator.RepositoryCreator.GetRepository<IYahooFinanceRepository>();

            string[] stocks = dbPortfolio.Get(portfolioId).Stocks.Select(s => s.Id).ToArray();

            return await dbYahoo.GetHistoricalStockDataAsync(stocks, startDate, endDate, interval);
        }
    }
}