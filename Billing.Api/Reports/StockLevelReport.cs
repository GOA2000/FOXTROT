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
    public class StockLevelReport:BaseReport
    {

        public StockLevelReport(UnitOfWork unitOfWork) : base(unitOfWork) { }


        public StockLevelModel Report(RequestModel request)
        {
            Category category = UnitOfWork.Categories.Get(request.Id);

            StockLevelModel result = new StockLevelModel()
            {
                CategoryId = request.Id,
                CategoryName = category.Name
            };

            result.Sales = UnitOfWork.Products.Get().Where(x => x.Category.Id == category.Id).ToList()
                                                         .Select(x => Factory.Create(x.Id, x.Name, x.Unit, x.Stock)).ToList();

            return result;
        }
    }
}