using DataAccess.IRepository;
using DataAccess.Repository;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace StockER.App_Start
{
    public static class DatabaseConfig
    {
        public static void UseDatabase(this IAppBuilder app)
        {
            IStockRepository db = DataAccess.StockERRepositoryCreator.RepositoryCreator.GetRepository<IStockRepository>();

            if (db.Get().Count()<1)
            {
                var dbS = (StockRepository)db;
                var path = HttpContext.Current.Server.MapPath(@"~/App_Data/Stocks.csv");
                var data = dbS.GetFromCsv(path);
                dbS.Add(data);
            }
        }
    }
}
