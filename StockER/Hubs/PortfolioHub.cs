using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using DataAccess.Repository;
using Core.Models;
using DataAccess.IRepository;
using StockER.Models;

namespace StockER.Hubs
{
    public class PortfolioHub : Hub
    {
       
       
        static PortfolioHub()
        {
            IPortfolioRepository db = new PortfolioRepository();
            db.Notifier.Updated += PortfolioUpdated;
            db.Notifier.Added += PortfolioAdded;
            db.Notifier.Removed += PortfolioRemoved;
        }
       
        private static void PortfolioUpdated(IEnumerable<Updated<Portfolio>> portfolios)
        {
            GetHub().Clients.All.Updated(portfolios.Select(u => new Updated<PortfolioDTO>
            {
                Item = new PortfolioDTO
                {
                    Id = u.Item.Id,
                    Icon = u.Item.Icon,
                    Name = u.Item.Name,
                    Stocks = u.Item.Stocks.Select(stock => new StockDTO
                    {
                        Id = stock.Id,
                        Name = stock.Name,
                        Sector = stock.Sector,
                        StockExchange = stock.StockExchange,
                        SummaryQuote = stock.SummaryQuote,
                        Industry = stock.Industry,
                        IPOyear = stock.IPOyear
                    })
                },
                Props=u.Props
            }));
        }

        private static void PortfolioAdded(IEnumerable<Portfolio> portfolios)
        {
            GetHub().Clients.All.Added(portfolios.Select(p => new PortfolioDTO { Id=p.Id,Icon=p.Icon,Name=p.Name }));
        }

        private static void PortfolioRemoved(IEnumerable<Portfolio> portfolios)
        {
            GetHub().Clients.All.Removed(portfolios.Select(p => new PortfolioDTO { Id=p.Id,Icon=p.Icon,Name=p.Name }));
        }

        private static IHubContext GetHub() 
        {
            return GlobalHost.ConnectionManager.GetHubContext<PortfolioHub>();
        }
    }
}