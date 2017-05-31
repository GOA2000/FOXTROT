using Billing.Api.Helpers;
using Billing.Api.Models;
using Billing.Database;
using Billing.Repository;
using System;
using System.Linq;
using System.Web.Http;

namespace Billing.Api.Controllers
{
    [RoutePrefix("api/items")]
    public class ItemsController : BaseController
    {
        [Route("")]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(UnitOfWork.Items.Get().ToList().Select(x => Factory.Create(x)).ToList());
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
        [BillingAuthorization]
        [TokenAuthorization("user")]
        [Route("product/{id}")]
        public IHttpActionResult GetByProduct(int id)
        {
            try
            {
                return Ok(UnitOfWork.Items.Get().Where(x => x.Product.Id == id).ToList().Select(x => Factory.Create(x)).ToList());
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
         }

        [Route("invoice/{id}")]
        public IHttpActionResult GetByInvoice(int id)
        {
            try
            {
                return Ok(UnitOfWork.Items.Get().Where(x => x.Invoice.Id == id).ToList().Select(x => Factory.Create(x)).ToList());
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }

        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            try
            {
                Item item = UnitOfWork.Items.Get(id);
                if (item == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(Factory.Create(item));
                }
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }

        [Route("")]
        public IHttpActionResult Post(ItemModel model)
        {
            try
            {
                Item item = Factory.Create(model);
                UnitOfWork.Items.Insert(item);
                UnitOfWork.Commit();
                return Ok(Factory.Create(item));
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }

        [Route("{id}")]
        public IHttpActionResult Put(int id, ItemModel model)
        {
            try
            {
                Item item = Factory.Create(model);
                UnitOfWork.Items.Update(item, id);
                UnitOfWork.Commit();
                return Ok(Factory.Create(item));
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }

        [Route("{id}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                Item entity = UnitOfWork.Items.Get(id);
                if (entity == null) return NotFound();
                UnitOfWork.Items.Delete(id);
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
        public IHttpActionResult Get(int currentPage = 0, int perPage = 1, string sort = " name", string search = "", string findBy = "invoiceNo")
        {
            //Indexing correction
            int page = currentPage;
            var totalProductList = UnitOfWork.Items.Get().ToList();

            switch (sort)
            {
                case " name":
                    totalProductList = totalProductList.OrderBy(x => x.Product.Name).ToList();
                    break;
                case "-name":
                    totalProductList = totalProductList.OrderByDescending(x => x.Product.Name).ToList();
                    break;

                case " invoiceNo":
                    totalProductList = totalProductList.OrderBy(x => x.Invoice.InvoiceNo).ToList();
                    break;

                case "-invoiceNo":
                    totalProductList = totalProductList.OrderByDescending(x => x.Invoice.InvoiceNo).ToList();
                    break;


            }


            switch (findBy)
            {
                case "invoice":
                    totalProductList = totalProductList.Where(x => x.Invoice.InvoiceNo.ToLower().Contains(search.ToLower())).ToList();
                    break;

                case "name":
                    totalProductList = totalProductList.Where(x => x.Product.Name.ToLower().Contains(search.ToLower())).ToList();
                    break;

            }
            var prepare = totalProductList;
            int totalItems = prepare.Count();
            int totalPages = (int)Math.Ceiling((Decimal)prepare.Count() / perPage);
            prepare = prepare.Skip(page * perPage).Take(perPage).ToList();
            var query = prepare.Select(x => Factory.Create(x)).ToList();

            var response = new
            {
                ItemsList = query,
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
