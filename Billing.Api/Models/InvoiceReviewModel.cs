using Billing.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Billing.Api.Models
{
    public class CustomerInvoiceModel
    {
        public int InvoiceId { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime? ShippedOn { get; set; }
        public double InvoiceTotal { get; set; }
        public string InvoiceStatus { get; set; }
    }
    public class InvoiceReviewModel
    {
        public InvoiceReviewModel()
        {
            Invoices = new List<CustomerInvoiceModel>();
        }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double GrandTotal { get; set; }
        public List<CustomerInvoiceModel> Invoices { get; set; }
}
}