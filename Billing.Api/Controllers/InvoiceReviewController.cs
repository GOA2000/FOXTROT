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
    public class InvoiceReviewController : BaseController
    {
        //[TokenAuthorization("user,admin")]
        public IHttpActionResult Post(RequestModel request)
        {
            try
            {
                if (request.EndDate < request.StartDate)
                {
                    return BadRequest();
                }
                return Ok(Reports.InvoiceReview.Report(request));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
