using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DataAccess.Repository;
using DataAccess.Context;

namespace StockERTest
{
    [TestClass]
    public class StockRepositoryTest
    {
        //[TestMethod]
        //public void TestGet()
        //{
        //    StockRepository db = new StockRepository();

        //    var data =  db.GetFromCsv(@"App_Data\Stocks.csv");

        //    foreach (var item in data)
        //    {
        //        System.Diagnostics.Debug.WriteLine(item.Name);
        //    }

        //    Assert.IsNotNull(data);
        
        //}

        //[TestMethod]
        //public void TestGetById()
        //{
        //    StockRepository db = new StockRepository();

        //    var data = db.Get("MSFT");

        //    Assert.IsNotNull(data);
        //}

        //[TestMethod]
        //public void TestIsStock()
        //{
        //    StockRepository db = new StockRepository();

        //    var data = db.IsStock("MSFT");

        //    Assert.IsTrue(data);
        //}

        //[TestMethod]
        //public void TestSearch()
        //{
        //    IStockRepository db = new StockRepository();

        //    var data = db.SearchStocks("M",20);

        //    Assert.IsNotNull(data);
        //}

        //[TestMethod]
        //public void TestGetAndFill()
        //{
        //    //StockRepository db = new StockRepository();
        //    //var data = db.GetFromCsv(@"C:\Users\Riper\Documents\Visual Studio 2012\Projects\StockER+\StockER\App_Data\Stocks.csv");
        //    //db.Add(data);
        //    //Assert.IsNotNull(data);
        //}

    }
}
