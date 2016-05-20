using System;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DataAccess.Context;
using Core.Models;

namespace StockERTest
{
    [TestClass]
    public class StockEREntitiesTest
    {


        //[TestMethod]
        //public void TestAdd()
        //{
        //    StockERContext db = new StockERContext();

        //    var data = db.Portfolios.Add(new Portfolio { Name = "Industrial", Icon = "icon-briefcase" });

        //    db.SaveChanges();
        //    Assert.IsNotNull(data);
        //}

        //[TestMethod]
        //public void TestPortfolioStocksAdd()
        //{
        //    StockERContext db = new StockERContext();

        //    using (db.StartTransaction)
        //    {
        //        var data = db.Portfolios.Find(1);

        //        data.Stocks.Add(db.Stocks.First(s=>s.Id=="MSFT"));
        //        data.Stocks.Add(db.Stocks.First(s => s.Id == "YHOO"));
        //        data.Stocks.Add(db.Stocks.First(s => s.Id == "GOOG"));
        //        Assert.IsNotNull(data);
        //    }          
        //}

        //[TestMethod]
        //public void TestGetAll()
        //{
        //    StockERContext db = new StockERContext();

        //    var data = db.Portfolios;

        //    foreach (var item in data)
        //    {
        //        System.Diagnostics.Debug.WriteLine(item.Name);
        //    }

        //    Assert.IsNotNull(data);
        //}
    }
}
