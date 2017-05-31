using Billing.Api.Controllers;
using Billing.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Billing.Api.Helpers
{
    public class InvoiceHelper : BaseController
    {
        Invoice Invoice = new Invoice();

        public Invoice NextStep(string invoiceNum, bool Cancel)
        {
            Invoice = UnitOfWork.Invoices.Get().FirstOrDefault(x=>x.InvoiceNo.Equals(invoiceNum));
            if (Invoice != null)
            {
                switch (Invoice.Status)
                {
                    case Status.Ordered: OrderCreated(Cancel); break;
                    case Status.Confirmed: OrderConfimed(Cancel); break;
                    case Status.InvoiceCreated: InvoiceCreated(Cancel); break;
                    case Status.InvoiceSent: InvoiceSent(Cancel); break;
                    case Status.InvoicePaid: InvoicePaid(); break;
                    case Status.OnHold: InvoiceOnHold(); break;
                    case Status.Ready: InvoiceReady(); break;
                   
                }
                UnitOfWork.Invoices.Update(Invoice, Invoice.Id);
               // UnitOfWork.History.Insert(new Event() { Invoice = Invoice, Date = DateTime.Today, Status = Invoice.Status });
                UnitOfWork.Commit();
            }
            return Invoice;
        }

        private void OrderCreated(bool Cancel)
        {
            if (Cancel)
            {
                Invoice.Status = Status.Canceled;
            }
            else
            {
                Invoice.Status = Status.Confirmed;
            }
        }
        private void OrderConfimed(bool Cancel)
        {
            if (Cancel)
            {
                Invoice.Status = Status.Canceled;
            }
            else
            {
                Invoice.Status = Status.InvoiceCreated;
            }
        }
        private void InvoiceCreated(bool Cancel)
        {
            if (Cancel)
            {
                Invoice.Status = Status.Canceled;
            }
            else
            {
                Invoice.Status = Status.InvoiceSent;
            }
        }

        private void InvoiceSent(bool Cancel)
        {
            if (Cancel)
            {
                Invoice.Status = Status.Canceled;
            }
            else
            {
                Invoice.Status = Status.InvoicePaid;
            }
        }

        private void InvoicePaid()
        {
            Invoice.Status = Status.Ready;
            foreach (var Item in Invoice.Items)
            {
                if (Item.Product.Stock.Inventory < Item.Quantity)
                {
                    Invoice.Status = Status.OnHold;
                    break;
                }
            }
        }

        private void InvoiceOnHold()
        {
            Invoice.Status = Status.Ready;
            foreach (var Item in Invoice.Items)
            {
                if (Item.Product.Stock.Inventory < Item.Quantity)
                {
                    Invoice.Status = Status.OnHold;
                    break;
                }
            }
        }

        private void InvoiceReady()
        {
            Invoice.Status = Status.Delivered;
            Invoice.ShippedOn = DateTime.Today;
        }

    }
}