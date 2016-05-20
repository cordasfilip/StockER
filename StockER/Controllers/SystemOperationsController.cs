using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace StockER.Controllers
{
    [RoutePrefix("api/SystemOperations")]
    public class SystemOperationsController : ApiController
    {
        [HttpGet]
        [Route("NMF")]
        public async Task<string> NMF(int portfolioId, uint nf, uint iter, DateTime? startDate = null, DateTime? endDate=null, string interval=null) 
        {
            return await StockER.SystemOperations.NmfSO.Instance.CalculateNfmAsync(portfolioId, nf, iter, startDate, endDate, interval);
        }
    }
}