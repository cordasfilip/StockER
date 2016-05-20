using Core.Models;
using DataAccess.IRepository;
using DataAccess.Repository;
using StockER.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace StockER.Controllers
{
    [RoutePrefix("api/Stock")]
    public class StockController : ApiController
    {
        IStockRepository db = DataAccess.StockERRepositoryCreator.RepositoryCreator.GetRepository<IStockRepository>();

        public IEnumerable<StockDTO> Get()
        {
            IEnumerable<Stock> stocks = db.Get();
            if (stocks == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            return stocks.Select(stock=> new StockDTO
            {
                Id = stock.Id,
                Name = stock.Name,
                Sector = stock.Sector,
                StockExchange = stock.StockExchange,
                SummaryQuote = stock.SummaryQuote,
                Industry = stock.Industry,
                IPOyear = stock.IPOyear
            });
        }

        public StockDTO Get(string id) 
        {
            Stock stock= db.Get(id);
            if(stock==null)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            return new StockDTO 
            { 
                Id = stock.Id,
                Name=stock.Name,
                Sector=stock.Sector,
                StockExchange=stock.StockExchange,
                SummaryQuote=stock.SummaryQuote,
                Industry=stock.Industry,
                IPOyear=stock.IPOyear 
            };
        }

        [HttpGet]
        [Route("StocksThatStartWith")]
        public IEnumerable<StockDTO> StocksThatStartWith(string value, uint take) 
        {
            return db.SearchStocks(value, take).Select(stock=>new StockDTO 
            { 
                Id = stock.Id,
                Name=stock.Name,
                Sector=stock.Sector,
                StockExchange=stock.StockExchange,
                SummaryQuote=stock.SummaryQuote,
                Industry=stock.Industry,
                IPOyear=stock.IPOyear 
            });
        }

        [HttpGet]
        [Route("IsStock")]
        public bool IsStock(string name)
        {
            return db.IsStock(name);
        }

        [HttpGet]
        [Route("AddStocks")]
        public object AddStocks()
        {
            var db = (StockRepository)this.db;
            var path = HttpContext.Current.Server.MapPath(@"~/App_Data/Stocks.csv");
            var data = db.GetFromCsv(path);
            return db.Add(data);
        }

        [HttpGet]
        [Route("Test")]
        public object Test()
        {
            return "Test";
        }
    }
}
