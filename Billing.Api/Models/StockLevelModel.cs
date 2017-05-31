using Billing.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Billing.Api.Models
{
    public class ProductStock
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductUnit { get; set; }
        public int ProductInput { get; set; }
        public int ProductOutput { get; set; }
        public int Stock { get; set; }
    }
    public class StockLevelModel
    {
        public StockLevelModel()
        {
            Sales = new List<ProductStock>();
        }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public List<ProductStock> Sales { get; set; }
    }
}