using Billing.Api.Helpers;
using Billing.Api.Models;
using Billing.Database;
using Billing.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Billing.Api.Reports
{
    public class SalesByAgentReport:BaseReport
    {

        public SalesByAgentReport(UnitOfWork unitOfWork) : base(unitOfWork) { }


        public SalesByAgentModel Report(RequestModel Request)
        {
            List<Invoice> Invoices = UnitOfWork.Invoices.Get().Where(x => x.Date >= Request.StartDate && x.Date <= Request.EndDate).ToList();
            double total = Invoices.Sum(x => x.Total);

            List<Invoice> AgentInvoices = Invoices.Where(x => x.Agent.Id == Request.Id).ToList();


            double agentTotal = AgentInvoices.Sum(x => x.Total);

            SalesByAgentModel result = new SalesByAgentModel()
            {
                StartDate = Request.StartDate,
                EndDate = Request.EndDate,
                AgentName = UnitOfWork.Agents.Get(Request.Id).Name,
                AgentTotal = agentTotal,
                ProcentTotal = Math.Round(100 * agentTotal / total, 2)
            };

            result.Sales = AgentInvoices.GroupBy(x => x.Customer.Town.Region.ToString())
                                .Select(x => Factory.Create(x.Key, x.Sum(y => y.Total), total, agentTotal))
                                .ToList();
            return result;
        }
    }
}