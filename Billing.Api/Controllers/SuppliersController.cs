using Billing.Api.Helpers;
using Billing.Api.Models;
using Billing.Database;
using System;
using System.Linq;
using System.Web.Http;

namespace Billing.Api.Controllers
{
    [RoutePrefix("api/suppliers")]
    public class SuppliersController : BaseController
    {
        [TokenAuthorization("user,admin")]
        [Route("")]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(UnitOfWork.Suppliers.Get().ToList().Select(x => Factory.Create(x)).ToList());
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
            try
            {
                return Ok(UnitOfWork.Suppliers.Get().Where(x => x.Name.Contains(name)).ToList().Select(a => Factory.Create(a)).ToList());
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
        [TokenAuthorization("user,admin")]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            try
            {
                Supplier supplier = UnitOfWork.Suppliers.Get(id);
                if (supplier == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(Factory.Create(supplier));
                }
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
        [TokenAuthorization("admin")]
        [Route("")]
        public IHttpActionResult Post(SupplierModel model)
        {
            try
            {
                Supplier supplier = Factory.Create(model);
                UnitOfWork.Suppliers.Insert(supplier);
                UnitOfWork.Commit();
                return Ok(Factory.Create(supplier));
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
        [TokenAuthorization("admin")]
        [Route("{id}")]
        public IHttpActionResult Put(int id, SupplierModel model)
        {
            try
            {
                Supplier supplier = Factory.Create(model);
                UnitOfWork.Suppliers.Update(supplier, id);
                UnitOfWork.Commit();
                return Ok(Factory.Create(supplier));
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
                Supplier entity = UnitOfWork.Suppliers.Get(id);
                if (entity == null) return NotFound();
                UnitOfWork.Suppliers.Delete(id);
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
            var totalSupplierList = UnitOfWork.Suppliers.Get().ToList();

            switch (sort)
            {
                case " name":
                    totalSupplierList = totalSupplierList.OrderBy(x => x.Name).ToList();
                    break;
                case "-name":
                    totalSupplierList = totalSupplierList.OrderByDescending(x => x.Name).ToList();
                    break;

                case " town":
                    totalSupplierList = totalSupplierList.OrderBy(x => x.Town.Name).ToList();
                    break;

                case "-town":
                    totalSupplierList = totalSupplierList.OrderByDescending(x => x.Town.Name).ToList();
                    break;


                case " address":
                    totalSupplierList = totalSupplierList.OrderBy(x => x.Address).ToList();
                    break;

                case "-address":
                    totalSupplierList = totalSupplierList.OrderByDescending(x => x.Address).ToList();
                    break;


            }


            switch (findBy)
            {
                case "town":
                    totalSupplierList = totalSupplierList.Where(x => x.Town.Name.ToLower().Contains(search.ToLower())).ToList();
                    break;

                case "name":
                    totalSupplierList = totalSupplierList.Where(x => x.Name.ToLower().Contains(search.ToLower())).ToList();
                    break;

                case "address":
                    totalSupplierList = totalSupplierList.Where(x => x.Address.ToLower().Contains(search.ToLower())).ToList();
                    break;

            }
            var prepare = totalSupplierList;
            int totalItems = prepare.Count();
            int totalPages = (int)Math.Ceiling((Decimal)prepare.Count() / perPage);
            prepare = prepare.Skip(page * perPage).Take(perPage).ToList();
            var query = prepare.Select(x => Factory.Create(x)).ToList();

            var response = new
            {
                SuppliersList = query,
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
