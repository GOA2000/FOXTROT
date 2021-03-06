﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Billing.Database
{
    public class Invoice : Basic
    {
        public Invoice()
        {
            Items = new List<Item>();
        }

        public int Id { get; set; }
        public string InvoiceNo { get; set; }
        public DateTime Date { get; set; }
        public DateTime? ShippedOn { get; set; }
        public Status Status { get; set; }
        public double Vat { get; set; }
        public double Shipping { get; set; }

        [NotMapped]
        public double SubTotal { get { return Math.Round(Items.Sum(x => x.SubTotal), 2); } }
        [NotMapped]
        public double VatAmount { get { return Math.Round(SubTotal * Vat / 100, 2); } }
        [NotMapped]
        public double Total { get { return Math.Round(SubTotal + VatAmount + Shipping,2); } }

        public virtual Agent Agent { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual Shipper Shipper { get; set; }

        public virtual List<Item> Items { get; set; }
        public virtual List<Event> History { get; set; }
    }
}
