using Billing.Api.Helpers;
using Billing.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Billing.Api.Controllers
{

    public class SalesByProductController : BaseController
    {
        [TokenAuthorization("user")]
        public IHttpActionResult Post(RequestModel request)
        {
            try
            {
                return Ok(Reports.SalesByProduct.Report(request));

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}