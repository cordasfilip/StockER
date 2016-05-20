using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.IRepository
{
    public interface IRepositoryAsync<T>
    {
         Task<IQueryable<T>> GetAsync();

         Task<T> GetAsync(params object[] id);
    }
}
