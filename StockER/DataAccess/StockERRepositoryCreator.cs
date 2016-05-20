using DataAccess.IRepository;
using DataAccess.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StockER.DataAccess
{
    public class StockERRepositoryCreator : RepositoryCreator
    {
        public static RepositoryCreator RepositoryCreator
        {
            get
            {
#if DEBUG
                return new StockERRepositoryCreator();
#else
      if (System.Web.HttpContext.Current.Items["RepositoryCreator"] == null)
                    System.Web.HttpContext.Current.Items["RepositoryCreator"] = new StockERRepositoryCreator();
                return (RepositoryCreator)System.Web.HttpContext.Current.Items["RepositoryCreator"];
#endif              
            }
        }

        static StockERRepositoryCreator() 
        {
            RegisterRepositoryCreator<IStockRepository>(()=>new StockRepository());
            RegisterRepositoryCreator<IPortfolioRepository>(() => new PortfolioRepository());
            RegisterRepositoryCreator<IYahooFinanceRepository>(() => new YahooFinanceRepository());
        }
    }
}