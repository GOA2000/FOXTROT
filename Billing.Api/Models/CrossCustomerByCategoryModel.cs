using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Billing.Api.Models
{

    public class CategoryPurchaseModel
    {
        public string CategoryName { get; set; }
        public double CategoryTotal { get; set; }
    }

    public class CustomerPurchaseModel 
    {
        public CustomerPurchaseModel(int length)
        {
            CategorySales = new double[length];
        }
        public string CustomerName { get; set; }
        public double CustomerTurnover { get; set; }
        public double[] CategorySales { get; set; }
    }

    public class CrossCustomerByCategoryModel
    {
        public CrossCustomerByCategoryModel()
        {
            CusRevenue = new List<CustomerPurchaseModel>();
            CatRevenue = new List<CategoryPurchaseModel>();
        }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public double GrandTotal { get; set; }
        public List<CategoryPurchaseModel> CatRevenue { get; set; }
        public List<CustomerPurchaseModel> CusRevenue { get; set; }
    }
}