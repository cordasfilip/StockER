using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.IRepository
{
    public interface ICollectionRepository<T>:IRepository<T>
    {
        T Add(T entity);

        void Remove(T entity);

        void RemoveById(params object[] id);
    }
}
