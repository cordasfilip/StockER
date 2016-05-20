using Core.Models;
using CsvHelper;
using DataAccess.IRepository;
using DataAccess.Mapping.Csv;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class YahooFinanceRepository:IYahooFinanceRepository
    {
        public async Task<IEnumerable<HistoricalStockData>> GetHistoricalStockDataAsync(string id, DateTime? starDate = null, DateTime? endDate = null, string interval = null)
        {
            using (HttpClient httpClient = new HttpClient())
            {
                Uri uri = BuildHistoricalStockDataUri(id, starDate, endDate, interval);

                var re = await httpClient.GetStringAsync(uri);

                return re.Split('\n').Skip(1).Where(r=>!string.IsNullOrEmpty(r)).Select(r => 
                {
                    var prop = r.Split(',');
                    return new HistoricalStockData 
                    { 
                        Date = prop[0], 
                        Open = double.Parse(prop[1]), 
                        High = double.Parse(prop[2]),
                        Low = double.Parse(prop[3]),
                        Close = double.Parse(prop[4]),
                        Volume = double.Parse(prop[5]),
                        AdjClose = double.Parse(prop[6])
                    }; 
                }).ToArray();
            }
        }

        public async Task<Dictionary<string,IEnumerable<HistoricalStockData>>> GetHistoricalStockDataAsync(string[] ids, DateTime? starDate = null, DateTime? endDate = null, string interval = null)
        {
            Dictionary<string,IEnumerable<HistoricalStockData>> data = new Dictionary<string,IEnumerable<HistoricalStockData>>();
            var tasks = new List<Task>();
            
            foreach (var name in ids)
            {
                tasks.Add(
                    GetHistoricalStockDataAsync(name, starDate, endDate, interval)
                    .ContinueWith(r => { data.Add(name, r.Result); }));
            }

            await Task.WhenAll(tasks);

            return data;
        }

        public async Task<IEnumerable<ShortStockData>> GetAsync(string[] ids)
        {
            using (HttpClient httpClient = new HttpClient())
            {
                Uri uri = BuildShortStockDataUri(ids);
                var re = await httpClient.GetStreamAsync(uri);

                CsvHelper.CsvReader reader = new CsvHelper.CsvReader(new System.IO.StreamReader(re));
                reader.Configuration.RegisterClassMap<DataAccess.Mapping.Csv.ShortStockDataMap>();
                reader.Configuration.HasHeaderRecord = false;
               

                var result = reader.GetRecords<ShortStockData>().ToArray();

                return result;
            }
        }

        public async Task<LongStockData> GetAsync(string id)
        {
            using (HttpClient httpClient = new HttpClient())
            {
                Uri uri = BuildLongStockDataUri(id);
                var re = await httpClient.GetStringAsync(uri);

                var modelProps = typeof(LongStockData).GetProperties();

                return re.Split('\n').Where(r => !string.IsNullOrEmpty(r)).Select(r =>
                {
                    var result = new LongStockData();
                    var prop = r.Split(',');

                    for (int i = 0; i < modelProps.Length; i++)
                    {
                        modelProps[i].SetValue(result, prop[i]);
                    }
                       
                    return result;
                }).First();
            }
        }

        private Uri BuildShortStockDataUri(string[] ids)
        {
            var uri = "http://download.finance.yahoo.com/d/quotes.csv?s="+string.Join("+",ids)+"&f=snopc1p2x";
            return new Uri(uri);
        }

        private Uri BuildLongStockDataUri(string id) 
        {
            var uri = "http://download.finance.yahoo.com/d/quotes.csv?s=" + id + "&f=b2b3c1d1t1m3m4l1t8";
            return new Uri(uri);
        }

        private Uri BuildHistoricalStockDataUri(string id, DateTime? starDate = null, DateTime? endDate = null, string interval = null)
        {
            var uri = "http://ichart.finance.yahoo.com/table.csv?";

            uri += "s=" + id;

            if (starDate != null)
            {
                var sd = starDate.Value;
                uri += "&c=" + sd.Year;
                uri += "&a=" + (sd.Month - 1).ToString("00");
                uri += "&b=" + sd.Day.ToString("00");
            }

            if (endDate != null)
            {
                var ed = endDate.Value;
                uri += "&d=" + ed.Year;
                uri += "&e=" + (ed.Month - 1).ToString("00");
                uri += "&f=" + ed.Day.ToString("00");
            }

            if (interval!=null)
            {
                uri += "&g=" + interval;
            }

            return new Uri(uri);
        }


    }
}
