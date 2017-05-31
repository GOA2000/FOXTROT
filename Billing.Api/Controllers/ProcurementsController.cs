using Billing.Api.Helpers;
using Billing.Api.Models;
using Billing.Database;
using System;
using System.Linq;
using System.Web.Http;

namespace Billing.Api.Controllers
{
    [RoutePrefix("api/procurements")]
    public class ProcurementsController : BaseController
    {
        [TokenAuthorization("user,admin")]
        [Route("")]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(UnitOfWork.Procurements.Get().ToList().Select(x => Factory.Create(x)).ToList());
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
        [TokenAuthorization("user,admin")]
        [Route("doc/{doc}")]
        public IHttpActionResult GetByDocument(string doc)
        {
            try
            {
                return Ok(UnitOfWork.Procurements.Get().Where(x => x.Document == doc).ToList().Select(x => Factory.Create(x)).ToList());
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
        [TokenAuthorization("user,admin")]
        [Route("product/{id}")]
        public IHttpActionResult GetByProduct(int id)
        {
            try
            {
                return Ok(UnitOfWork.Procurements.Get().Where(x => x.Product.Id == id).ToList().Select(x => Factory.Create(x)).ToList());
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
                Procurement procurement = UnitOfWork.Procurements.Get(id);
                if (procurement == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(Factory.Create(procurement));
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
        public IHttpActionResult Post(ProcurementModel model)
        {
            try
            {
                Procurement procurement = Factory.Create(model);
                UnitOfWork.Procurements.Insert(procurement);
                UnitOfWork.Commit();
                return Ok(Factory.Create(procurement));
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
        [TokenAuthorization("admin")]
        [Route("{id}")]
        public IHttpActionResult Put(int id, ProcurementModel model)
        {
            try
            {
                Procurement procurement = Factory.Create(model);
                UnitOfWork.Procurements.Update(procurement, id);
                UnitOfWork.Commit();
                return Ok(Factory.Create(procurement));
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
                Procurement entity = UnitOfWork.Procurements.Get(id);
                if (entity == null) return NotFound();
                UnitOfWork.Procurements.Delete(id);
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
            var totalProcurementList = UnitOfWork.Procurements.Get().ToList();

            switch (sort)
            {
                case " name":
                    totalProcurementList = totalProcurementList.OrderBy(x => x.Product.Name).ToList();
                    break;
                case "-name":
                    totalProcurementList = totalProcurementList.OrderByDescending(x => x.Product.Name).ToList();
                    break;

                case " supplier":
                    totalProcurementList = totalProcurementList.OrderBy(x => x.Supplier.Name).ToList();
                    break;

                case "-supplier":
                    totalProcurementList = totalProcurementList.OrderByDescending(x => x.Supplier.Name).ToList();
                    break;

                case " date":
                    totalProcurementList = totalProcurementList.OrderBy(x => x.Date).ToList();
                    break;

                case "-date":
                    totalProcurementList = totalProcurementList.OrderByDescending(x => x.Date).ToList();
                    break;

                case " quantity":
                    totalProcurementList = totalProcurementList.OrderBy(x => x.Quantity).ToList();
                    break;

                case "-quantity":
                    totalProcurementList = totalProcurementList.OrderByDescending(x => x.Quantity).ToList();
                    break;

            }


            switch (findBy)
            {
                case "name":
                    totalProcurementList = totalProcurementList.Where(x => x.Product.Name.ToLower().Contains(search.ToLower())).ToList();
                    break;

                case "supplier":
                    totalProcurementList = totalProcurementList.Where(x => x.Supplier.Name.ToLower().Contains(search.ToLower())).ToList();
                    break;

                case "quantity":
                    totalProcurementList = totalProcurementList.Where(x => x.Quantity.Equals(int.Parse(search))).ToList();
                    break;



            }
            var prepare = totalProcurementList;
            int totalItems = prepare.Count();
            int totalPages = (int)Math.Ceiling((Decimal)prepare.Count() / perPage);
            prepare = prepare.Skip(page * perPage).Take(perPage).ToList();
            var query = prepare.Select(x => Factory.Create(x)).ToList();

            var response = new
            {
                ProcurementsList = query,
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
