using Billing.Repository;
using Billing.Api.Controllers;
using Billing.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Billing.Database;
using Billing.Api.Helpers;

namespace Billing.Api.Reports
{
    public class SalesByCustomerReport :BaseReport
    {
        public SalesByCustomerReport(UnitOfWork unitOfWork) : base(unitOfWork) { }


        public SalesByCustomerModel Report(RequestModel Request)
        {
            List<Invoice> Invoices = UnitOfWork.Invoices.Get().Where(x => x.Date >= Request.StartDate && x.Date <= Request.EndDate).ToList();
            double grandTotal = Invoices.Sum(x => x.Total);

            SalesByCustomerModel result = new SalesByCustomerModel()
            {
                StartDate = Request.StartDate,
                EndDate = Request.EndDate,
                GrandTotal = grandTotal
            };

            result.Sales = Invoices.OrderBy(x => x.Customer.Name)
                           .GroupBy(x => x.Customer.Name)
                            .Select(x => Factory.Create(Invoices, x.Key, x.Sum(y => y.Total), grandTotal))
                                .ToList();
            return result;
        }
    }
}