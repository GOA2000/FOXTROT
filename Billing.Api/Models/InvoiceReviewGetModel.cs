using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Billing.Api.Models
{
    public class InvoiceProductsModel
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public double Subtotal { get; set; }
    }
    public class InvoiceReviewGetModel
    {
        public InvoiceReviewGetModel()
        {
            Products = new List<InvoiceProductsModel>();
        }
        public string InvoiceNo { get; set; }
        public string CustomerName { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string InvoiceStatus { get; set; }
        public double Subtotal { get; set; }
        public double VatAmount { get; set; }
        public double Shipping { get; set; }
        public string Shipper { get; set; }
        public DateTime? ShippedOn { get; set; }
        public List<InvoiceProductsModel> Products { get; set; }
    }
}