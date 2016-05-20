using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using DataAccess.Repository;
using System.Threading.Tasks;

namespace StockERTest
{
    [TestClass]
    public class YahooTest
    {
        //[TestMethod]
        //public async Task TestGetHistoricalStockData()
        //{
        //    IYahooFinanceRepository db = new YahooFinanceRepository();

        //    var stockData = await db.GetHistoricalStockData("MSFT", starDate: new DateTime(2014, 7, 1));

        //    foreach (var item in stockData)
        //    {
        //        System.Diagnostics.Debug.WriteLine("Date:{0},Open:{1}",item.Date,item.Open);
        //    }

        //    Assert.IsNotNull(stockData);
        //}

        //[TestMethod]
        //public async Task TestGetHistoricalStockData2()
        //{
        //    IYahooFinanceRepository db = new YahooFinanceRepository();

        //    var stockData = await db.GetHistoricalStockData(new string[]{"MSFT","YHOO"});

        //    foreach (var item in stockData)
        //    {
        //        System.Diagnostics.Debug.WriteLine("Date:{0},Open:{1}", item.Key, item.Value);
        //    }

        //    Assert.IsNotNull(stockData);
        //}

        //[TestMethod]
        //public async Task TestGetShortStockData()
        //{
        //    IYahooFinanceRepository db = new YahooFinanceRepository();

        //    var stockData = await db.Get(new string[]{"MSFT","YHOO"});

        //    Assert.IsNotNull(stockData);
        //}

        //[TestMethod]
        //public async Task TestGetLongStockData()
        //{
        //    IYahooFinanceRepository db = new YahooFinanceRepository();

        //    var stockData = await db.Get( "MSFT");

        //    Assert.IsNotNull(stockData);
        //}
    }
}
