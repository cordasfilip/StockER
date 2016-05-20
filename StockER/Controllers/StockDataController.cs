using Core.Models;
using DataAccess.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace StockER.Controllers
{
    [RoutePrefix("api/StockData")]
    public class StockDataController : ApiController
    {

        IYahooFinanceRepository db = DataAccess.StockERRepositoryCreator.RepositoryCreator.GetRepository<IYahooFinanceRepository>();

        // GET api/StockData/HistoricalData?id=MSFT
        [HttpGet]
        [Route("HistoricalData")]
        public async Task<IEnumerable<HistoricalStockData>> HistoricalData(string id, DateTime? starDate = null, DateTime? endDate = null, string interval = null)
        {
            return await db.GetHistoricalStockDataAsync(id, starDate, endDate, interval);
        }
        // GET api/StockData?id=["MSFT","YHOO"]
        public async Task<IEnumerable<ShortStockData>> Get([FromUri] string[] ids)
        {
            if (ids==null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            return await db.GetAsync(ids);
        }

        // GET api/StockData/MSFT
        public async Task<LongStockData> Get(string id)
        {
            return await db.GetAsync(id);
        }
       
    }
}