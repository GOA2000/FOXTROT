using Billing.Api.Helpers;
using Billing.Api.Models;
using Billing.Database;
using System;
using System.Linq;
using System.Web.Http;

namespace Billing.Api.Controllers
{
    [RoutePrefix("api/shippers")]
    public class ShippersController : BaseController
    {
        [TokenAuthorization("user,admin")]
        [Route("")]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(UnitOfWork.Shippers.Get().ToList().Select(x => Factory.Create(x)).ToList());
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
                return Ok(UnitOfWork.Shippers.Get().Where(x => x.Name.Contains(name)).ToList().Select(a => Factory.Create(a)).ToList());
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
                Shipper shipper = UnitOfWork.Shippers.Get(id);
                if (shipper == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(Factory.Create(shipper));
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
        public IHttpActionResult Post(ShipperModel model)
        {
            try
            {
                Shipper shipper = Factory.Create(model);
                UnitOfWork.Shippers.Insert(shipper);
                UnitOfWork.Commit();
                return Ok(Factory.Create(shipper));
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
        [TokenAuthorization("admin")]
        [Route("{id}")]
        public IHttpActionResult Put(int id, ShipperModel model)
        {
            try
            {
                Shipper shipper = Factory.Create(model);
                UnitOfWork.Shippers.Update(shipper, id);
                UnitOfWork.Commit();
                return Ok(Factory.Create(shipper));
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
                Shipper entity = UnitOfWork.Shippers.Get(id);
                if (entity == null) return NotFound();
                UnitOfWork.Shippers.Delete(id);
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
            var totalShipperList = UnitOfWork.Shippers.Get().ToList();

            switch (sort)
            {
                case " name":
                    totalShipperList = totalShipperList.OrderBy(x => x.Name).ToList();
                    break;
                case "-name":
                    totalShipperList = totalShipperList.OrderByDescending(x => x.Name).ToList();
                    break;

                case " address":
                    totalShipperList = totalShipperList.OrderBy(x => x.Address).ToList();
                    break;

                case "-address":
                    totalShipperList = totalShipperList.OrderByDescending(x => x.Address).ToList();
                    break;


            }


            switch (findBy)
            {
                case "name":
                    totalShipperList = totalShipperList.Where(x => x.Name.ToLower().Contains(search.ToLower())).ToList();
                    break;

     
                case "address":
                    totalShipperList = totalShipperList.Where(x => x.Address.ToLower().Contains(search.ToLower())).ToList();
                    break;

            }
            var prepare = totalShipperList;
            int totalItems = prepare.Count();
            int totalPages = (int)Math.Ceiling((Decimal)prepare.Count() / perPage);
            prepare = prepare.Skip(page * perPage).Take(perPage).ToList();
            var query = prepare.Select(x => Factory.Create(x)).ToList();

            var response = new
            {
                ShippersList = query,
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
