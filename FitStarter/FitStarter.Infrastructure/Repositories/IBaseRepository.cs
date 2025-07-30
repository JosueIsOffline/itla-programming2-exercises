using System.Linq.Expressions;

namespace FitStarter.Infastructure.Repositories
{
    public interface IBaseRepository<T>
    {
        Task<List<T>> GetAll(params Expression <Func<T, object>>[] includes);
        Task<T> GetOneById(int id, params Expression<Func<T, object>>[] includes);

        Task<T> Add(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(int Id);
    }
}
