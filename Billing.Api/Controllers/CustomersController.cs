using Billing.Api.Helpers;
using Billing.Api.Models;
using Billing.Database;
using Billing.Repository;
using System;
using System.Linq;
using System.Web.Http;

namespace Billing.Api.Controllers
{
    [RoutePrefix("api/customers")]
    public class CustomersController : BaseController
    {
        [TokenAuthorization("user,admin")]
        [Route("")]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(UnitOfWork.Customers.Get().ToList().Select(x => Factory.Create(x)).ToList());
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
        [TokenAuthorization("user,admin")]
        [Route("{name}")]
        public IHttpActionResult Get(string name)
        {
            return Ok(UnitOfWork.Customers.Get().Where(x => x.Name.Contains(name)).ToList().Select(a => Factory.Create(a)).ToList());
        }
       [TokenAuthorization("user,admin")]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            try
            {
                Customer customer = UnitOfWork.Customers.Get(id);
                if (customer == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(Factory.Create(customer));
                }
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
       [TokenAuthorization("user,admin")]
        [Route("")]
        public IHttpActionResult Post(CustomerModel model)
        {
            try
            {
                Customer customer = Factory.Create(model);
                UnitOfWork.Customers.Insert(customer);
                UnitOfWork.Commit();
                return Ok(Factory.Create(customer));
            }
            catch(Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
        [TokenAuthorization("user,admin")]
        [Route("{id}")]
        public IHttpActionResult Put(int id, CustomerModel model)
        {
            try
            {
                Customer customer = Factory.Create(model);
                UnitOfWork.Customers.Update(customer, id);
                UnitOfWork.Commit();
                return Ok(Factory.Create(customer));
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
      [TokenAuthorization("admin")]
        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                Customer entity = UnitOfWork.Customers.Get(id);
                if (entity == null) return NotFound();
                UnitOfWork.Customers.Delete(id);
                UnitOfWork.Commit();
                return Ok();
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }

        [Route("paginate")]
        //paginate
        public IHttpActionResult Get(int currentPage = 0, int perPage = 1, string sort = " name", string search = "", string findBy = "name")
        {
            //Indexing correction
            int page = currentPage;
            var totalCustomerList = UnitOfWork.Customers.Get().ToList();

            switch (sort)
            {
                case " name":
                    totalCustomerList = totalCustomerList.OrderBy(x => x.Name).ToList();
                    break;
                case "-name":
                    totalCustomerList = totalCustomerList.OrderByDescending(x => x.Name).ToList();
                    break;

                case " address":
                    totalCustomerList = totalCustomerList.OrderBy(x => x.Address).ToList();
                    break;

                case "-address":
                    totalCustomerList = totalCustomerList.OrderByDescending(x => x.Address).ToList();
                    break;

                case " town":
                    totalCustomerList = totalCustomerList.OrderBy(x => x.Town.Name).ToList();
                    break;

                case "-town":
                    totalCustomerList = totalCustomerList.OrderByDescending(x => x.Town.Name).ToList();
                    break;




            }


            switch (findBy)
            {
                case "name":
                    totalCustomerList = totalCustomerList.Where(x => x.Name.ToLower().Contains(search.ToLower())).ToList();
                    break;

                case "address":
                    totalCustomerList = totalCustomerList.Where(x => x.Address.ToLower().Contains(search.ToLower())).ToList();
                    break;

                case "town":
                    totalCustomerList = totalCustomerList.Where(x => x.Town.Name.ToLower().Contains(search.ToLower())).ToList();
                    break;

            }
            var prepare = totalCustomerList;
            int totalItems = prepare.Count();
            int totalPages = (int)Math.Ceiling((Decimal)prepare.Count() / perPage);
            prepare = prepare.Skip(page * perPage).Take(perPage).ToList();
            var query = prepare.Select(x => Factory.Create(x)).ToList();

            var response = new
            {
                CustomersList = query,
                totalPages,
                totalItems,
                currentPage = page
            };



            try
            {
                return Ok(response);
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
    }
}
