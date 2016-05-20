using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StockER.SystemOperations
{
    public abstract class SystemOperation:IDisposable
    {
        public bool IsBusy { get; private set; }

        public event Action<object[], DateTime> Started;

        public event Action<object[], DateTime> Ended;

        object[] id = null;

        public SystemOperation Start(params object[] id) 
        {
            IsBusy = true;
            if (Started != null)
            {
                Started(id, DateTime.Now);

            }
            this.id = id;
            return this;
        }

        public void Dispose()
        {
            IsBusy = false;
            if (Ended != null)
            {
                Ended(id, DateTime.Now);
            }
        }
    }
}
