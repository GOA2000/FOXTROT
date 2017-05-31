using Billing.Api.Models;
using Billing.Database;
using Billing.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Security;

namespace Billing.Api.Helpers
{
           public class BillingIdentity
        {
            private UnitOfWork _unitOfWork;

            public BillingIdentity(UnitOfWork unitOfWork)
            {
                _unitOfWork = unitOfWork;
            }

            public Agent Agent
            {
                get
                {
                    string username = Thread.CurrentPrincipal.Identity.Name;
                    return _unitOfWork.Agents.Get().FirstOrDefault(x => x.Username == username);
                }
            }

            public CurrentUserModel CurrentUser
            {
                get
                {
                    string username = Thread.CurrentPrincipal.Identity.Name;
                    Agent agent = _unitOfWork.Agents.Get().FirstOrDefault(x => x.Username == username);
                    Database.CurrentUser.Id = agent.Id;
                    CurrentUserModel model = new CurrentUserModel()
                    {
                        Id = agent.Id,
                        Name = agent.Name,
                        Roles = Roles.GetRolesForUser(username)
                    };
                    return model;
                }
            }
        }
    }