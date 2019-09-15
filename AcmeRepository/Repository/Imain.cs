using System.Collections.Generic;

namespace AcmeRepository.Repository
{
    public interface Imain<T>where T:class
    {
        bool Add(T entity);
        bool Update(T entity);
        bool Remove(int id);
        List<T> GetAll();
        T FindOne(int id);
    }
}
