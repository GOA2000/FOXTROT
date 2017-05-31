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
    public class InvoiceReviewGetReport :BaseReport
    {
        public InvoiceReviewGetReport(UnitOfWork unitOfWork) : base(unitOfWork) { }


        public InvoiceReviewGetModel Report(int id)
        {
            var Invoice = UnitOfWork.Invoices.Get().Where(x => x.Id == id).ToList();
            //double Subtotal = Invoice.Sum(x => x.SubTotal);
            Invoice invoice = UnitOfWork.Invoices.Get(id);

            InvoiceReviewGetModel result = new InvoiceReviewGetModel()
            {
                InvoiceNo = invoice.InvoiceNo,
                CustomerName = invoice.Customer.Name,
                InvoiceDate = invoice.Date,
                InvoiceStatus = invoice.Status.ToString(),
                Subtotal = invoice.SubTotal,
                VatAmount = invoice.VatAmount,
                Shipping = invoice.Shipping,
                Shipper = invoice.Shipper.Name,
                ShippedOn = invoice.ShippedOn
            };

            result.Products = UnitOfWork.Items.Get().Where(x => x.Invoice.Id == id).ToList()
                .Select(x => Factory.Create(x.Product.Id, x.Product.Name, x.Quantity, x.Price, x.SubTotal)).ToList();

            return result;
        }
    }
}