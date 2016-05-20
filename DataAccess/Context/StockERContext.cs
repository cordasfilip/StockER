using Core.Models;
using DataAccess.Mapping.EF;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Context
{
    public class StockERContext : DbContext
    {

        public Transaction StartTransaction 
        {
            get { return new Transaction(this); } 
        }
        public StockERContext()
            : base("StockERConnection")
        {
           // base.Configuration.LazyLoadingEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add<Portfolio>(new PortfolioMap());
            modelBuilder.Configurations.Add<Stock>(new StockMap());
        }

        public DbSet<Portfolio> Portfolios { get; set; }
        public DbSet<Stock> Stocks { get; set; }

        public class Transaction:IDisposable 
        {
            StockERContext db;
            
            internal Transaction(StockERContext db)
            {
                this.db = db;
            }


            public void Dispose()
            {
                db.SaveChanges();
            }
        }
    }
}
