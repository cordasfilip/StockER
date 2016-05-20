using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.IRepository
{
    public interface ICollectionRepositoryAsync<T> : ICollectionRepository<T>, IRepositoryAsync<T>
    {        
         Task<T> AddAsync(T entity);

         Task RemoveAsync(T entity);

         Task RemoveByIdAsync(params object[] id);
    }
}
