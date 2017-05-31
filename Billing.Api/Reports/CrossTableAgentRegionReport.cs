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
    public class CrossTableAgentRegionReport : BaseReport
    {
        public CrossTableAgentRegionReport(UnitOfWork unitOfWork) : base(unitOfWork) { }

        public CrossTableAgentRegionModel Report(RequestModel Request)
        {
            List<Invoice> Invoices = UnitOfWork.Invoices.Get().Where(x => x.Date >= Request.StartDate && x.Date <= Request.EndDate).ToList();
            double grandTotal = Invoices.Sum(x => x.Total);

            CrossTableAgentRegionModel result = new CrossTableAgentRegionModel();
            List<InputItem> query = Invoices.OrderBy(x => x.Agent.Id)
                .GroupBy(x => new { x.Agent.Name, x.Customer.Town.Region })
                .Select(x => new InputItem
                {
                    Label = x.Key.Name,
                    Index = Convert.ToInt32(x.Key.Region),
                    Value = x.Sum(y => (y.Total))
                }).ToList();
            result = Factory.CreateCross(query, Helper.RegionCount);
            result.StartDate = Request.StartDate;
            result.EndDate = Request.EndDate;
            result.GrandTotal = grandTotal;


            return result;
        }
    }
}



