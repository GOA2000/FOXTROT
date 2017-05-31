using Billing.Api.Helpers;
using Billing.Api.Models;
using Billing.Database;
using Billing.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Billing.Api.Reports
{    

    public class InvoiceReport : BaseReport
    {
        public InvoiceReport(UnitOfWork unitOfWork) : base(unitOfWork) { }
        
        public InvoiceReportModel Report(string invoiceNo)
        {
            Invoice invoice = UnitOfWork.Invoices.Get().FirstOrDefault(x => x.InvoiceNo == invoiceNo);
            
            InvoiceReportModel result = new InvoiceReportModel()
            {
                InvoiceNo = invoice.InvoiceNo,
                InvoiceDate = invoice.Date,
                CustomerId = invoice.Customer.Id,
                CustomerName = invoice.Customer.Name,
                CustomerAddress = invoice.Customer.Address,
                ZipCode = invoice.Customer.Town.Zip,
                Town = invoice.Customer.Town.Name,
                Salesperson = invoice.Agent.Name,
                OrderDate = invoice.CreatedOn,
                ShippedDate = invoice.ShippedOn,
                ShippedVia = invoice.Shipper.Name,
                InvoiceSubtotal = invoice.SubTotal,
                VatAmount = invoice.VatAmount,
                Shipping = invoice.Shipping,
                InvoiceTotal = invoice.Total
            };
            result.Products = UnitOfWork.Items.Get().Where(x => x.Invoice.Id == invoice.Id).ToList()
                .Select(x => Factory.Create(x.Product.Id, x.Product.Name, x.Product.Unit, x.Quantity, x.Price, x.SubTotal)).ToList();
            return result;
        }
    }
}