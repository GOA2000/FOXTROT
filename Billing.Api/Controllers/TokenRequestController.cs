using Billing.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Billing.Api.Helpers;
using Billing.Database;

namespace Billing.Api.Controllers
{
    public class TokenRequestController : BaseController
    {
        public IHttpActionResult Post(TokenRequestModel request)
        {
            try
            {
                ApiUser apiUser = UnitOfWork.ApiUsers.Get().FirstOrDefault(x => x.AppId == request.ApiKey);
                if (apiUser == null) return NotFound();

                if (Helper.Signature(apiUser.Secret, apiUser.AppId) != request.Signature) return BadRequest("Bad application signature");

                var rawTokenInfo = apiUser.AppId + DateTime.UtcNow.ToString("s");

                var authToken = new AuthToken()
                {
                    Token = rawTokenInfo,
                    Expiration = DateTime.Now.AddMinutes(20),
                    ApiUser = apiUser
                };
                UnitOfWork.Tokens.Insert(authToken);
                UnitOfWork.Commit();

                return Ok(Factory.Create(authToken,Identity));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
