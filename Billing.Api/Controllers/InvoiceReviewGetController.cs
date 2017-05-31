using Billing.Api.Helpers;
using Billing.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Billing.Api.Controllers
{
    //[TokenAuthorization("user,admin")]
    public class InvoiceReviewGetController : BaseController
    {
        public IHttpActionResult Get(int id)
        {
            try
            {
                //if (request.EndDate < request.StartDate)
                //{
                //    return BadRequest();
                //}
                return Ok(Reports.InvoiceReviewGet.Report(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
