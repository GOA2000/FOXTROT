using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Web.Http;
using System.Net.Http;
using Billing.Repository;
using Billing.Api.Reports;
using System.Web.Http.Routing;
using Billing.Api.Controllers;
using Billing.Api.Models;
using System.Threading;
using System.Web.Http.Controllers;
using System.Web.Http.Hosting;

namespace Billing.Tests.TestClasses
{
    [TestClass]
    public class TestCrosstableCustomerCategoryController
    {
        CrossTableCustomersCategoryController controller = new CrossTableCustomersCategoryController();

        HttpConfiguration config = new HttpConfiguration();
        HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, "api/crosstablecustomercategory");
        private UnitOfWork unit = new UnitOfWork();
        SetOfReports set = new SetOfReports(new UnitOfWork());

        [TestInitialize]
        public void Initializing()
        {
            TestHelper.InitDatabase();
        }

        void GetReady()
        {
            var route = config.Routes.MapHttpRoute("default", "api/{controller}/");
            var routeData = new HttpRouteData(route, new HttpRouteValueDictionary { { "controller", "crosstablecustomercategory" } });
            controller.ControllerContext = new HttpControllerContext(config, routeData, request);
            controller.Request = request;
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;

        }
        [TestMethod]
        public void GetCrossCustomerCategory()
        {
            Initializing();
            GetReady();
            var actRes = controller.Post(new RequestModel()
            {
                Id = 0,
                StartDate = new DateTime(2015, 1, 1),
                EndDate = new DateTime(2018, 1, 1)
            }
            );
            var response = actRes.ExecuteAsync(CancellationToken.None).Result;

            Assert.IsTrue(response.IsSuccessStatusCode);
        }

        [TestMethod]
        public void GetCrossCustomerCategoryForWrongDates()
        {
            Initializing();
            GetReady();
            var actRes = controller.Post(new RequestModel()
            {
                Id = 0,
                StartDate = new DateTime(2018, 1, 1),
                EndDate = new DateTime(2015, 1, 1)
            }
            );
            var response = actRes.ExecuteAsync(CancellationToken.None).Result;

            Assert.IsFalse(response.IsSuccessStatusCode);
        }

        [TestMethod]
        public void TestGrandTotalEqualsCustomerSum()
        {
            RequestModel requestModel = new RequestModel()
            {
                StartDate = new DateTime(2015, 1, 1),
                EndDate = new DateTime(2018, 1, 1)
            };

            CrossCustomerByCategoryModel model = set.CrossCustomersByCategoryReport.Report(requestModel);

            double sum = 0;
            foreach (var item in model.CusRevenue)
            {
                sum += item.CustomerTurnover;
            }
            Assert.AreEqual(model.GrandTotal, sum);
        }

    }
}
