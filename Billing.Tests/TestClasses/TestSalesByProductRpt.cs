using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Web.Http;
using System.Net.Http;
using Billing.Repository;
using System.Web.Http.Routing;
using System.Web.Http.Controllers;
using System.Web.Http.Hosting;
using System.Threading;
using Billing.Api.Reports;
using Billing.Api.Controllers;
using Billing.Api.Models;

namespace Billing.Tests.TestClasses
{
    [TestClass]
    public class TestSalesByProductRpt
    {
        SalesByProductController controller = new SalesByProductController();

        //SalesByProductReport report = new SalesByProductReport();

        HttpConfiguration config = new HttpConfiguration();

        HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, "api/salesbyproduct");
        private UnitOfWork unit = new UnitOfWork();
        SetOfReports set = new SetOfReports(new UnitOfWork());

        [TestInitialize]
        public void Initializing()
        {
            TestHelper.InitDatabase();
        }

        void GetReady()
        {
            var route = config.Routes.MapHttpRoute("default", "api/{controller}/{id}");
            var routeData = new HttpRouteData(route, new HttpRouteValueDictionary { { "controller", "salesbyproduct" } });

            controller.ControllerContext = new HttpControllerContext(config, routeData, request);
            controller.Request = request;
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
        }
        [TestMethod]
        public void GetSalesByProduct()
        {
            TestHelper.InitDatabase();
            GetReady();
            var actRes = controller.Post(new RequestModel()
            {
                Id = 2,
                StartDate = new DateTime(2016, 1, 1),
                EndDate = new DateTime(2017, 1, 1)
            }
            );
            var response = actRes.ExecuteAsync(CancellationToken.None).Result;

            Assert.IsTrue(response.IsSuccessStatusCode);
        }


        [TestMethod]
        public void GetSalesByProductsWrongID()
        {
            TestHelper.InitDatabase();
            GetReady();
            var actRes = controller.Post(new RequestModel()
            {
                Id = 333,
                StartDate = new DateTime(2014, 1, 1),
                EndDate = new DateTime(2017, 12, 31)
            }
            );
            var response = actRes.ExecuteAsync(CancellationToken.None).Result;

            Assert.IsFalse(response.IsSuccessStatusCode);
        }

        [TestMethod]
        public void GetCountOfProducts()
        {
            RequestModel model = new RequestModel
            {
                Id = 1,
                StartDate = new DateTime(2014, 1, 1),
                EndDate = new DateTime(2017, 12, 31)
            };
            SalesByProductModel modelProduct = set.SalesByProduct.Report(model);

            Assert.AreEqual(modelProduct.ProductSales.Count, 3);
        }

        [TestMethod]
        public void GetPercentProducts()
        {
            RequestModel model = new RequestModel
            {
                Id = 1,
                StartDate = new DateTime(2014, 1, 1),
                EndDate = new DateTime(2017, 12, 31)
            };
            SalesByProductModel modelProduct = set.SalesByProduct.Report(model);
            double total = 0;
            foreach (var produc in modelProduct.ProductSales)
            {
                total += produc.ProductPercent;
            }
            Assert.AreEqual(modelProduct.PercentTotal, total);
        }

    }
}
