using Billing.Database;
using Billing.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Threading;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Security;

namespace Billing.Api.Helpers
{
    public class TokenAuthorizationAttribute : AuthorizationFilterAttribute
    {
        private IEnumerable<string> hValues;
        private string[] _roles;
        public TokenAuthorizationAttribute(string role)
        {
            _roles = role.Split(',');
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            string ApiKey = null, Token = null;
            if (actionContext.Request.Headers.TryGetValues("ApiKey", out hValues)) ApiKey = hValues.First();
            if (actionContext.Request.Headers.TryGetValues("Token", out hValues)) Token = hValues.First();
            if (!(ApiKey == null || Token == null))
            {
                using (UnitOfWork unitOfWork = new UnitOfWork())
                {
                    AuthToken token = unitOfWork.Tokens.Get().FirstOrDefault(x => x.Token == Token);
                    if (token != null)
                    {
                        if (token.ApiUser.AppId == ApiKey && token.Expiration > DateTime.Now)
                        {
                            string[] roles = Roles.GetRolesForUser(token.Agent.Username);
                            Thread.CurrentPrincipal = new GenericPrincipal(new GenericIdentity(token.Agent.Username), roles);
                            BillingIdentity Identity = new BillingIdentity(unitOfWork);

                            foreach (string role in _roles)
                                if (Identity.CurrentUser.Roles.Any(role.Contains)) return;
                        }
                    }
                }
            }
            actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
        }
    }
}