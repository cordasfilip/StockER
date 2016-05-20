using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.IRepository
{
    public class Updated<T> 
    {
        public T Item { get; set; }

        public string[] Props { get; set; }
    }

    public class Notifier<T>
    {
        public event Action<IEnumerable<Updated<T>>> Updated;

        public event Action<IEnumerable<T>> Added;

        public event Action<IEnumerable<T>> Removed;

        public void NotifyUpdated(IEnumerable<Updated<T>> items)
        {
            if (Updated != null)
            {
                Updated(items);
            }
        }

        public void NotifyAdded(IEnumerable<T> items)
        {
            if (Added != null)
            {
                Added(items);
            }
        }

        public void NotifyRemoved(IEnumerable<T> items)
        {
            if (Removed != null)
            {
                Removed(items);
            }
        }
    }

    public interface ILiveRepository<T> : ICollectionRepository<T>
    {
        Notifier<T> Notifier { get; }
    }
}
