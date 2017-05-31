using Billing.Api.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Billing.Api.Controllers
{
    [RoutePrefix("api/invoicereport")]
    public class InvoiceReportController : BaseController
    {
        [TokenAuthorization("user,admin")]
        [Route("{invoiceNo}")]
        public IHttpActionResult Get(string invoiceNo)
        {
            try
            {
                return Ok(Reports.InvoiceReport.Report(invoiceNo));
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

       
    }
}
