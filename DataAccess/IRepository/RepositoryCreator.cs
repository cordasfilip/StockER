using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.IRepository
{
    public abstract class RepositoryCreator
    {
        private static Dictionary<string, Func<object>> repositories = new Dictionary<string, Func<object>>();

        private Dictionary<string, object> repositoriesObjects = new Dictionary<string,object>();

        public static void RegisterRepositoryCreator<T>(Func<object> repository)
        {
            repositories[typeof(T).FullName] = repository;
        }

        public T GetRepository<T>() where T : class
        {
            string typeName = typeof(T).FullName;
            if (!repositoriesObjects.ContainsKey(typeName))
            {
                if (!repositories.ContainsKey(typeName))
                    throw new System.ArgumentException("Repository not found");

                repositoriesObjects[typeName] =  repositories[typeName]() as T;
            }
            return (T)repositoriesObjects[typeName];
        }
    }
}
