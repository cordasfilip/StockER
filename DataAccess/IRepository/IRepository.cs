using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.IRepository
{
    public interface IRepository<T>
    {
        IQueryable<T> Get();

        T Get(params object[] id);

    }
}
