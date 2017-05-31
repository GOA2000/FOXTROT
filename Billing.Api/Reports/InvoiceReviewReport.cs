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
    public class InvoiceReviewReport: BaseReport
    {
        public InvoiceReviewReport(UnitOfWork unitOfWork) : base(unitOfWork) { }



        public InvoiceReviewModel Report(RequestModel Request)
        {
            List<Invoice> Invoices = UnitOfWork.Invoices.Get().Where(x => x.Date >= Request.StartDate 
                                            && x.Date <= Request.EndDate
                                            && x.Customer.Id == Request.Id).ToList();
            double grandTotal = Invoices.Sum(x => x.Total);
            string CustomerName = Invoices.Select(x => x.Customer.Name).First();

            InvoiceReviewModel result = new InvoiceReviewModel()
            {
                CustomerId = Request.Id,
                CustomerName = CustomerName,
                StartDate = Request.StartDate,
                EndDate = Request.EndDate,
                GrandTotal = grandTotal
            };

            result.Invoices = Invoices.OrderBy(x => x.InvoiceNo)
                .Select(x => Factory.Create(x.Id, x.InvoiceNo, x.Date, x.ShippedOn, x.Total, x.Status.ToString())).ToList();

            return result;
        }

        
    }
}