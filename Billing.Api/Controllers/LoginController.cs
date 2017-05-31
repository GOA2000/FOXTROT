using Billing.Api.Helpers;
using Billing.Api.Models;
using Billing.Database;
using System;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Web.Http;
using System.Web.Security;
using WebMatrix.WebData;


namespace Billing.Api.Controllers
{
    public class LoginController : BaseController
    {
        [BillingAuthorization]
        [Route("api/login")]
        [HttpPost]
        public IHttpActionResult Login(TokenRequestModel request)
        {
            ApiUser apiUser = UnitOfWork.ApiUsers.Get().FirstOrDefault(x => x.AppId == request.ApiKey);
            if (apiUser == null) return NotFound();
            if (Helper.Signature(apiUser.Secret, apiUser.AppId) != request.Signature) return BadRequest("Bad application signature");

            string rawTokenInfo = DateTime.Now.Ticks.ToString() + apiUser.AppId;
            byte[] rawTokenByte = Encoding.UTF8.GetBytes(rawTokenInfo);
            var authToken = new AuthToken()
            {
                Token = Convert.ToBase64String(rawTokenByte),
                Expiration = DateTime.Now.AddMinutes(20),
                Remember = (request.Remember != null) ? Factory.Create() : null,
                ApiUser = apiUser,
                Agent = Identity.Agent
            };

            UnitOfWork.Tokens.Insert(authToken);
            UnitOfWork.Commit();
            return Ok(Factory.Create(authToken,Identity));
        }

        [Route("api/remember")]
        [HttpPost]
        public IHttpActionResult Remember(TokenRequestModel request)
        {
            AuthToken token = UnitOfWork.Tokens.Get().FirstOrDefault(x => x.Remember == request.Remember);
            if (token == null) return NotFound();

            string username = UnitOfWork.Tokens.Get().FirstOrDefault(x => x.Remember == request.Remember).Agent.Username;

            if (token.ApiUser.AppId != request.ApiKey) return NotFound();
            string[] roles = Roles.GetRolesForUser(username);
            Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(username), roles);

            ApiUser apiUser = UnitOfWork.ApiUsers.Get().FirstOrDefault(x => x.AppId == request.ApiKey);
            if (apiUser == null) return NotFound();
            if (Helper.Signature(apiUser.Secret, apiUser.AppId) != request.Signature) return BadRequest("Bad application signature");

        
            string rawTokenInfo = DateTime.Now.Ticks.ToString() + apiUser.AppId;
            byte[] rawTokenByte = Encoding.UTF8.GetBytes(rawTokenInfo);
            var authToken = new AuthToken()
            {
                Token = Convert.ToBase64String(rawTokenByte),
                Expiration = DateTime.Now.AddMinutes(20),
                Remember = (request.Remember != null) ? Factory.Create() : null,
                ApiUser = apiUser,
                Agent = Identity.Agent
            };

 
            UnitOfWork.Tokens.Insert(authToken);
            UnitOfWork.Commit();
            return Ok(Factory.Create(authToken,Identity));
        }

        [Route("api/logout")]
        [HttpGet]
        public IHttpActionResult Logout()
        {
            if (Identity.Agent != null)
            {
                string message = $"User {Identity.CurrentUser.Name} logged out";
                if (!WebSecurity.Initialized) WebSecurity.InitializeDatabaseConnection("Billing", "Agents", "Id", "Username", autoCreateTables: true);
                WebSecurity.Logout();
                return Ok(message);
            }
            else
            {
                return Ok("No user is logged in!!!");
            }
        }


    }
}
