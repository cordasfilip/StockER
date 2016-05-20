using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.Models;
using DataAccess.IRepository;
using DataAccess.Context;
using System.Data;
using System.Data.SqlServerCe;

namespace DataAccess.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        StockERContext db = new StockERContext();
        private static Notifier<Portfolio> notifier = new Notifier<Portfolio>();

        public Notifier<Portfolio> Notifier
        {
            get { return notifier; }
        }
      
        public IQueryable<Portfolio> Get()
        {
            return db.Portfolios;
        }

        public Portfolio Get(params object[] id)
        {
            int portfolioId = (int)id[0];
            return db.Portfolios.Include("Stocks").FirstOrDefault(p => p.Id == portfolioId);
        }

        public Task<IQueryable<Portfolio>> GetAsync()
        {
            Task<IQueryable<Portfolio>> t = new Task<IQueryable<Portfolio>>(() => db.Portfolios);
            t.Start();
            return t;
        }

        public async Task<Portfolio> GetAsync(params object[] id)
        {
            return await db.Portfolios.FindAsync(id);
        }

        public Portfolio Add(Portfolio entity)
        {
            
                var port = db.Portfolios.Add(entity);
                db.SaveChanges();
                Notifier.NotifyAdded(new Portfolio[]{ port});
                return port;
        }

        public async Task<Portfolio> AddAsync(Portfolio entity)
        {
            var port = db.Portfolios.Add(entity);
            await db.SaveChangesAsync();
            Notifier.NotifyAdded(new Portfolio[] { port });
            return port;
        }

        public void Remove(Portfolio entity)
        {
            var port = db.Portfolios.Find(entity.Id);
            db.Portfolios.Remove(port);
            db.SaveChanges();
            Notifier.NotifyRemoved(new Portfolio[] { port });
        }

        public void RemoveById(params object[] id)
        {
            int portfolioId = (int)id[0];
            var port = db.Portfolios.Include("Stocks").FirstOrDefault(p => p.Id == portfolioId);
            db.Portfolios.Remove(port);
            var tablename = "PortfolioFactors" + portfolioId;
            if (HasTable(tablename))
            {
                DropTable(tablename);
            }
            db.SaveChanges();
            Notifier.NotifyRemoved(new Portfolio[] { port });
        }

        public async Task RemoveAsync(Portfolio entity)
        {
            var port = db.Portfolios.Find(entity.Id);
            db.Portfolios.Remove(port);
            await db.SaveChangesAsync();
            Notifier.NotifyRemoved(new Portfolio[] { port });
        }

        public async Task RemoveByIdAsync(params object[] id)
        {
            int portfolioId = (int)id[0];
            var port = db.Portfolios.Include("Stocks").FirstOrDefault(p => p.Id == portfolioId);
            db.Portfolios.Remove(port);
            await db.SaveChangesAsync();
            Notifier.NotifyRemoved(new Portfolio[] { port });
        }

        public Stock AddStockToPortfolio(int portfolioId, string stockId)
        {

            var port = db.Portfolios.Include("Stocks").FirstOrDefault(p => p.Id == portfolioId);
            var stock = db.Stocks.Find(stockId);
            port.Stocks.Add(stock);
            db.SaveChanges();
            Notifier.NotifyUpdated(new Updated<Portfolio>[] { new Updated<Portfolio> { Item = port, Props = new string[] { "Stocks" } } });
            return stock;
        }

        public Stock RemoveStockFromPortfolio(int portfolioId, string stockId)
        {
            var port = db.Portfolios.Include("Stocks").FirstOrDefault(p => p.Id == portfolioId);
            var stock = db.Stocks.Find(stockId);
            port.Stocks.Remove(stock);
            db.SaveChanges();
            Notifier.NotifyUpdated(new Updated<Portfolio>[] { new Updated<Portfolio> { Item = port, Props = new string[] { "Stocks" } } });           
            return stock;
        }

        public string SaveFeaturesToDatabase(int portfolioId, WH wh)
        {
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    var tablename = "PortfolioFactors" + portfolioId;
                    if (HasTable(tablename))
                    {
                        DropTable(tablename);
                    }
                    CreateTable(tablename);
                    InsertRows(tablename, wh);
                    trans.Commit();
                    return "OK";
                }
                catch (Exception)
                {
                    trans.Rollback();
                    throw;
                }
            }
        }

        public IEnumerable<PortfolioFeature> GetFeatures(int id)
        {
            var tablename = "PortfolioFactors" + id;
            if (!HasTable(tablename))
                return null;

            return db.Database.SqlQuery<PortfolioFeature>(string.Format("select * from {0}",tablename));
        }

        public IEnumerable<string> GetFactorNames(int id)
        {
            var tablename = "PortfolioFactors" + id;
            if (!HasTable(tablename))
                return null;

            return db.Database.SqlQuery<string>(string.Format("select distinct Feature from {0}", tablename));
        }
        
        
        private bool HasTable(string tableName) 
        {
            return db.Database.SqlQuery<int>(
                "SELECT Count(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = @tablename",
                new SqlCeParameter("@tablename", tableName)).First() > 0;
        }

        private int DropTable(string tableName)
        {
            return db.Database.ExecuteSqlCommand(string.Format("drop table {0}",tableName));     
        }

        private int CreateTable(string tableName)
        {
            return db.Database.ExecuteSqlCommand(string.Format("create table {0}(Id INT IDENTITY NOT NULL PRIMARY KEY,Feature nvarchar(100),Type nvarchar(100),Value real,Name nvarchar(100))", tableName));
        }

        private void InsertRows(string tablename,WH wh)
        {          
            for (int i = 0; i < wh.W.GetLength(0); i++)
            {
                for (int j = 0; j < wh.W.GetLength(1); j++)
                {               
                    db.Database.ExecuteSqlCommand(string.Format("insert into {0}(Feature,Type,Value,Name) values(@f,@t,@v,@n)",tablename),
                        new SqlCeParameter("@f", "F" + j),
                        new SqlCeParameter("@t", "R"),
                        new SqlCeParameter("@v", wh.W[i, j]),
                        new SqlCeParameter("@n", wh.Rows[i]));             
                }
            }

            for (int i = 0; i < wh.H.GetLength(0); i++)
            {
                for (int j = 0; j < wh.H.GetLength(1); j++)
                {
                    db.Database.ExecuteSqlCommand(string.Format("insert into {0}(Feature,Type,Value,Name)  values(@f,@t,@v,@n)",tablename),
                        new SqlCeParameter("@f", "F" + i),
                        new SqlCeParameter("@t", "C"),
                        new SqlCeParameter("@v", wh.H[i, j]),
                        new SqlCeParameter("@n", wh.Columns[j]));                       
                }
            }        
        }
    }
}
