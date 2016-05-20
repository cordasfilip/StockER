using Core.Models;
using DataAccess.IRepository;
using StockER.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace StockER.Controllers
{
    [RoutePrefix("api/Portfolio")]
    public class PortfolioController : ApiController
    {
        IPortfolioRepository db = DataAccess.StockERRepositoryCreator.RepositoryCreator.GetRepository<IPortfolioRepository>();

        // GET api/Portfolio
        public IEnumerable<PortfolioDTO> Get()        
        {
            return db.Get().Select(p => new PortfolioDTO { Id=p.Id,Icon=p.Icon,Name=p.Name });
        }

        // GET api/Portfolio/5
        public PortfolioDTO Get(int id)
        {
            Portfolio p = db.Get(id);
            if (p == null)
                throw  new HttpResponseException(HttpStatusCode.NotFound);

            return new PortfolioDTO
            {
                Id = p.Id,
                Icon = p.Icon,
                Name = p.Name,
                Stocks = p.Stocks.Select(stock => new StockDTO
                {
                    Id = stock.Id,
                    Name = stock.Name,
                    Sector = stock.Sector,
                    StockExchange = stock.StockExchange,
                    SummaryQuote = stock.SummaryQuote,
                    Industry = stock.Industry,
                    IPOyear = stock.IPOyear
                })
            };           
        }

        // POST api/Portfolio
        public HttpResponseMessage Post([FromBody]PortfolioDTO value)
        {
            if (ModelState.IsValid)
            {

                var p = db.Add(new Portfolio { Name=value.Name ,Icon= value.Icon });


                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created,  new PortfolioDTO
                {
                    Id = p.Id,
                    Icon = p.Icon,
                    Name = p.Name,
                    Stocks = p.Stocks.Select(stock => new StockDTO
                    {
                        Id = stock.Id,
                        Name = stock.Name,
                        Sector = stock.Sector,
                        StockExchange = stock.StockExchange,
                        SummaryQuote = stock.SummaryQuote,
                        Industry = stock.Industry,
                        IPOyear = stock.IPOyear
                    })
                });
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = p.Id }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            } 

        }
      
        [HttpDelete]
        public void DeletePortfolio(int id)
        {
             db.RemoveById(id);
        }

        // POST api/Portfolio/AddStockToPortfolio?portfolioId=1&name=MSFT
        [HttpPost]
        [Route("AddStock")]
        public StockDTO AddStock(PortfolioStockDTO portfolioStock)
        {
            var stock = db.AddStockToPortfolio(portfolioStock.PortfolioId, portfolioStock.StockId);
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

        // DELETE api/Portfolio/RemoveStock?portfolioId=1&name=MSFT
        [HttpDelete]
        [Route("RemoveStock")]
        public StockDTO RemoveStock([FromUri]int portfolioId, [FromUri]string stockId)
        {
            var stock = db.RemoveStockFromPortfolio(portfolioId, stockId);
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

        // GET api/Portfolio/GetFeatures?portfolioId=1
        [HttpGet]
        [Route("GetFactorNames")]
        public IEnumerable<string> GetFactorNames(int portfolioId)
        {
            var data = db.GetFactorNames(portfolioId);
           
            if (data == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            return data.ToList();
        }

        // GET api/Portfolio/GetFeatures?portfolioId=1
        [HttpGet]
        [Route("GetFactor")]
        public IEnumerable<PortfolioFeature> GetFactor(int portfolioId)
        {
            var data = db.GetFeatures(portfolioId);

            if (data == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            return data.ToList();
        }
    }
}