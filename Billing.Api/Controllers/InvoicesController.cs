using Billing.Api.Helpers;
using Billing.Api.Models;
using Billing.Database;
using Billing.Repository;
using System;
using System.Linq;
using System.Web.Http;

namespace Billing.Api.Controllers
{
    [RoutePrefix("api/invoices")]
    public class InvoicesController : BaseController
    {
        [Route("")]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(UnitOfWork.Invoices.Get().ToList().Select(x => Factory.Create(x)).ToList());
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }

        [Route("customer/{id}")]
        public IHttpActionResult GetByCustomer(int id)
        {
            try
            {
                return Ok(UnitOfWork.Invoices.Get().Where(x => x.Customer.Id == id).ToList().Select(x => Factory.Create(x)).ToList());
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }

        [Route("agent/{id}")]
        public IHttpActionResult GetByAgent(int id)
        {
            try
            {
                return Ok(UnitOfWork.Invoices.Get().Where(x => x.Agent.Id == id).ToList().Select(x => Factory.Create(x)).ToList());
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
                Invoice invoice = UnitOfWork.Invoices.Get(id);
                if (invoice == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(Factory.Create(invoice));
                }
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }

               

        [Route("")]
        public IHttpActionResult Post(InvoiceModel model)
        {
            try
            {
                Invoice invoice = Factory.Create(model);
                invoice.Status = Status.InvoiceCreated;
                UnitOfWork.Invoices.Insert(invoice);
                UnitOfWork.Commit();
                return Ok(Factory.Create(invoice));
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }

        [Route("{id}")]
        public IHttpActionResult Put(int id, InvoiceModel model)
        {
            try
            {
                Invoice invoice = Factory.Create(model);
                UnitOfWork.Invoices.Update(invoice, id);
                UnitOfWork.Commit();
                return Ok(Factory.Create(invoice));
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
                Invoice entity = UnitOfWork.Invoices.Get(id);
                if (entity == null) return NotFound();
                UnitOfWork.Invoices.Delete(id);
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
        public IHttpActionResult Get(int currentPage = 0, int perPage = 1, string sort = " invoiceNo", string search = "", string findBy = "invoiceNo")
        {
            //Indexing correction
            int page = currentPage;
            var totalInvoiceList = UnitOfWork.Invoices.Get().ToList();

            switch (sort)
            {
                case " invoiceNo":
                    totalInvoiceList = totalInvoiceList.OrderBy(x => x.InvoiceNo).ToList();
                    break;
                case "-invoiceNo":
                    totalInvoiceList = totalInvoiceList.OrderByDescending(x => x.InvoiceNo).ToList();
                    break;

                case " agent":
                    totalInvoiceList = totalInvoiceList.OrderBy(x => x.Agent.Name).ToList();
                    break;

                case "-agent":
                    totalInvoiceList = totalInvoiceList.OrderByDescending(x => x.Agent.Name).ToList();
                    break;

                case " status":
                    totalInvoiceList = totalInvoiceList.OrderBy(x => x.Status).ToList();
                    break;

                case "-status":
                    totalInvoiceList = totalInvoiceList.OrderByDescending(x => x.Status).ToList();
                    break;

                case " date":
                    totalInvoiceList = totalInvoiceList.OrderBy(x => x.Date).ToList();
                    break;

                case "-date":
                    totalInvoiceList = totalInvoiceList.OrderByDescending(x => x.Date).ToList();
                    break;

            }


            switch (findBy)
            {
                case "invoiceNo":
                    totalInvoiceList = totalInvoiceList.Where(x => x.InvoiceNo.ToLower().Contains(search.ToLower())).ToList();
                    break;

                case "status":

                    foreach (Status stat in Enum.GetValues(typeof(Status)))
                    {
                        if (stat.ToString().ToLower()==(search.ToLower()))
                        {
                            totalInvoiceList = totalInvoiceList.Where(x => x.Status.Equals(stat)).ToList();
                        };
                    }
                    //   totalInvoiceList = totalInvoiceList.Where(x => x.Status.Name.ToLower().Contains(search.ToLower())).ToList();
                    break;

                case "agent":
                    totalInvoiceList = totalInvoiceList.Where(x => x.Agent.Name.ToLower().Contains(search.ToLower())).ToList();
                    break;

            }
            var prepare = totalInvoiceList;
            int totalItems = prepare.Count();
            int totalPages = (int)Math.Ceiling((Decimal)prepare.Count() / perPage);
            prepare = prepare.Skip(page * perPage).Take(perPage).ToList();
            var query = prepare.Select(x => Factory.Create(x)).ToList();

            var response = new
            {
                InvoicesList = query,
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

        [Route("{invoiceNum}/next/{cancel}")]
      //  [TokenAuthorization("user,admin")]
        public IHttpActionResult Get(string invoiceNum, bool cancel = false)
        {
            try
            {

                InvoiceHelper helper = new InvoiceHelper();
                Invoice entity = helper.NextStep(invoiceNum, cancel);
                return Ok(Factory.Create(entity));

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
