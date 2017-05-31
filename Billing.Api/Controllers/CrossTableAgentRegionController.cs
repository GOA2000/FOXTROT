using Billing.Api.Helpers;
using Billing.Api.Models;
using System;
using System.Web.Http;

namespace Billing.Api.Controllers
{
   [TokenAuthorization("user,admin")]
       public class CrossTableAgentRegionController : BaseController
    {
        public IHttpActionResult Post(RequestModel request)
        {
            try
            {
                return Ok(Reports.CrossTableAgentRegion.Report(request));

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}