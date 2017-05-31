using Billing.Api.Helpers;
using Billing.Api.Models;
using Billing.Database;
using Billing.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace Billing.Api.Controllers
{
    [RoutePrefix("api/products")]
    public class ProductsController : BaseController
    {
        [TokenAuthorization("user,admin")]
        [Route("")]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(UnitOfWork.Products.Get().ToList().Select(x => Factory.Create(x)).ToList());
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
                return Ok(UnitOfWork.Products.Get().Where(x => x.Name.Contains(name)).ToList().Select(a => Factory.Create(a)).ToList());
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
                Product product = UnitOfWork.Products.Get(id);
                if (product == null) return NotFound();
                return Ok(Factory.Create(product));
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
        [TokenAuthorization("admin")]
        [Route("")]
        public IHttpActionResult Post(ProductModel model)
        {
            try
            {
                Product product = Factory.Create(model);
                UnitOfWork.Products.Insert(product);
                UnitOfWork.Commit();
                return Ok(Factory.Create(product));
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
        [TokenAuthorization("admin")]
        [Route("{id:int}")]
        public IHttpActionResult Put(int id, ProductModel model)
        {
            try
            {
                Product product = Factory.Create(model);
                UnitOfWork.Products.Update(product, id);
                UnitOfWork.Commit();
                return Ok(Factory.Create(product));
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
       [TokenAuthorization("admin")]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                Product product = UnitOfWork.Products.Get(id);
                if (product == null) return NotFound();
                UnitOfWork.Stocks.Delete(id);
                UnitOfWork.Products.Delete(id);
                UnitOfWork.Commit();
                return Ok();
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }
        }
        [TokenAuthorization("user")]
        [Route("stock")]
        [HttpGet]
        public IHttpActionResult Leverage()
        {
            try
            {
                List<Product> products = UnitOfWork.Products.Get().ToList();
                foreach (Product product in products)
                {
                    product.Stock.Input = product.Procurements.Sum(x => x.Quantity);
                    product.Stock.Output = product.Items.Sum(x => x.Quantity);
                    UnitOfWork.Products.Update(product, product.Id);
                }
                UnitOfWork.Commit();
                return Ok("Inventory leveraged for all products.");
            }
            catch (Exception ex)
            {
                LogHelper.Log(ex.Message, "ERROR");
                return BadRequest(ex.Message);
            }

        }


        [Route("paginate")]
        //paginate
        public IHttpActionResult Get(int currentPage = 0, int perPage = 1, string sort = " name", string search = "", string findBy="name")
        {
            //Indexing correction
            int page = currentPage;
            var totalProductList = UnitOfWork.Products.Get().ToList();
            
            switch (sort)
            {
                case " name":
                    totalProductList = totalProductList.OrderBy(x => x.Name).ToList();
                    break;
                case "-name":
                    totalProductList = totalProductList.OrderByDescending(x => x.Name).ToList();
                    break;
                
                case " category":
                    totalProductList = totalProductList.OrderBy(x => x.Category.Name).ToList();
                    break;

                case "-category":
                    totalProductList = totalProductList.OrderByDescending(x => x.Category.Name).ToList();
                    break;
            }


            switch (findBy)
            {
                case "name":
                    totalProductList = totalProductList.Where(x => x.Name.ToLower().Contains(search.ToLower())).ToList();
                    break;

                case "category":
                    totalProductList = totalProductList.Where(x => x.Category.Name.ToLower().Contains(search.ToLower())).ToList();
                    break;
            }


            var prepare = totalProductList;


            int totalItems = prepare.Count();
            int totalPages = (int)Math.Ceiling((Decimal)prepare.Count() / perPage);
            prepare = prepare.Skip(page * perPage).Take(perPage).ToList();
            var query = prepare.Select(x => Factory.Create(x)).ToList();



            var response = new {
                productsList= query,
                totalPages,
                totalItems,
                currentPage=page
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
