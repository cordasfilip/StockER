using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using StockER.SystemOperations;

namespace StockER.Hubs
{
    public class NmfSOHub : Hub<ISystemOperationHub>
    {
        static NmfSOHub() 
        {
            SystemOperations.NmfSO.Instance.Started += Started;
            SystemOperations.NmfSO.Instance.Ended += Ended;
        }

        public bool IsBusy()
        {           
            return SystemOperations.NmfSO.Instance.IsBusy;
        }

        private static void Started(object[] id,DateTime value) 
        {
            GetHub().Clients.All.Started(id[0],value);
        }

        private static void Ended(object[] id, DateTime value)
        {
            GetHub().Clients.All.Ended(id[0], value);
        }

        private static IHubContext GetHub()
        {
            return GlobalHost.ConnectionManager.GetHubContext<NmfSOHub>();
        }
    }
}