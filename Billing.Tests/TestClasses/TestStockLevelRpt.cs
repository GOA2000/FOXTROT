using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Billing.Api.Controllers;
using System.Web.Http;
using System.Net.Http;
using Billing.Api.Reports;
using Billing.Repository;
using System.Web.Http.Routing;
using System.Web.Http.Controllers;
using System.Web.Http.Hosting;
using Billing.Api.Models;
using System.Threading;

namespace Billing.Tests.TestClasses
{
    [TestClass]
    public class StockLevelTests
    {
        StockLevelController controller = new StockLevelController();
        HttpConfiguration config = new HttpConfiguration();
        HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, "api/stocklevel");
        SetOfReports set = new SetOfReports(new UnitOfWork());
        private UnitOfWork unit = new UnitOfWork();
        void GetReady()
        {
            var route = config.Routes.MapHttpRoute("default", "api/{controller}/{id}");
            var routeData = new HttpRouteData(route, new HttpRouteValueDictionary { { "controller", "stocklevel" } });

            controller.ControllerContext = new HttpControllerContext(config, routeData, request);
            controller.Request = request;
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
        }

        [TestMethod]
        public void GetCategoryWithStockInfo()
        {
            TestHelper.InitDatabase();
            GetReady();
            var actRes = controller.Post(new RequestModel()
            {
                Id = 2
            }
            );
            var response = actRes.ExecuteAsync(CancellationToken.None).Result;

            Assert.IsTrue(response.IsSuccessStatusCode);
        }


        [TestMethod]
        public void GetNumberOfProductInCategory()
        {
            RequestModel model = new RequestModel
            {
                Id = 1
            };

            StockLevelModel stock = set.StockLevel.Report(model);
            Assert.AreEqual(stock.Sales.Count, 2);
        }

        [TestMethod]
        public void GetStockInfoCategory_id_1()
        {
            RequestModel model = new RequestModel
            {
                Id = 1
            };
            StockLevelModel stock = set.StockLevel.Report(model);
            Assert.AreEqual(stock.Sales[0].ProductInput, 4);
            Assert.AreEqual(stock.Sales[0].ProductOutput, 2);
            Assert.AreEqual(stock.Sales[1].ProductInput, 3);
            Assert.AreEqual(stock.Sales[1].ProductOutput, 1);
        }
    }
}
