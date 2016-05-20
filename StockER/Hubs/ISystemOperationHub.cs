using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace StockER.Hubs
{
    public interface ISystemOperationHub
    {
        void Started(object id,DateTime value);

        void Ended(object id, DateTime value);
    }
}