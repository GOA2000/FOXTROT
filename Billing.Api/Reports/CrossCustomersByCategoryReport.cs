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
    public class CrossCustomersByCategoryReport: BaseReport
    {
        public CrossCustomersByCategoryReport(UnitOfWork unitOfWork) : base(unitOfWork) { }

        public CrossCustomerByCategoryModel Report(RequestModel Request)
        {
            List<Item> Items = UnitOfWork.Items.Get().Where(x => x.Invoice.Date >= Request.StartDate && x.Invoice.Date <= Request.EndDate).ToList();

            CrossCustomerByCategoryModel result = new CrossCustomerByCategoryModel()
            {
                StartDate = Request.StartDate,
                EndDate = Request.EndDate,
                GrandTotal = Items.Sum(x => x.SubTotal)
            };

            result.CatRevenue = Items.GroupBy(x => x.Product.Category.Name)
                                .Select(x => Factory.Create(x.Key, x.Sum(y => y.SubTotal)))
                                .ToList();
            var Catquery = result.CatRevenue;
            int number = result.CatRevenue.Count;
            result.CusRevenue = Items.GroupBy(x => x.Invoice.Customer.Name)
                                .Select(x => Factory.Create(x.Key, x.Sum(y => y.SubTotal), Items, number, Catquery, Request))
                                .ToList();

            return result;
        }
    }
}