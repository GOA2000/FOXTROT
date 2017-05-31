using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Billing.Api.Models
{
    public class CategorySalesModel
    {
        public string CategoryName { get; set; }
        public double CategoryTotal { get; set; }
        public double CategoryPercent { get; set; }
    }

    public class SalesByCategoryModel
    {
        public SalesByCategoryModel()
        {
            Sales = new List<CategorySalesModel>();
        }  

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double GrandTotal { get; set; }
        public List<CategorySalesModel> Sales { get; set; }
    }
}