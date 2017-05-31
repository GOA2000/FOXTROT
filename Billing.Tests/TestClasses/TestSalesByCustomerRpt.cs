using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Billing.Api.Controllers;
using System.Web.Http;
using System.Net.Http;
using System.Web.Http.Routing;
using System.Web.Http.Controllers;
using System.Web.Http.Hosting;
using System.Threading;
using Billing.Api.Models;
using Billing.Repository;
using Billing.Api.Reports;

namespace Billing.Tests.TestClasses
{
    [TestClass]
    public class TestSalesByCustomerRpt
    {
        SalesByCustomerController controller = new SalesByCustomerController();
        HttpConfiguration config = new HttpConfiguration();
        HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "api/salesbycustomer");

        [TestInitialize]
        public void Initializing()
        {
            TestHelper.InitDatabase();
        }

        void GetReady()
        {
            var route = config.Routes.MapHttpRoute("default", "api/{controller}/{id}");
            var routeData = new HttpRouteData(route, new HttpRouteValueDictionary { { "controller", "salesbycustomer" } });

            controller.ControllerContext = new HttpControllerContext(config, routeData, request);
            controller.Request = request;
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
         }

        [TestMethod]
        public void SalesByCustomerDate()
        {//1
            Initializing();
            GetReady();
            var actRes = controller.Post(new RequestModel()
            {
                Id = 1,
                StartDate = new DateTime(2016, 1, 1),
                EndDate = new DateTime(2017, 1, 1)
            }
            );
            var response = actRes.ExecuteAsync(CancellationToken.None).Result;

            Assert.IsTrue(response.IsSuccessStatusCode);
        }


        [TestMethod]
        public void SalesByCustomerContent()
        {//1
            Initializing();
            GetReady();
            var actRes = controller.Post(new RequestModel()
            {
                Id = 1,
                StartDate = new DateTime(2016, 1, 1),
                EndDate = new DateTime(2017, 1, 1)
            }
            );

            var response = actRes.ExecuteAsync(CancellationToken.None).Result;

            Assert.IsNotNull(response.Content);
        }


        [TestMethod]
        public void SalesByCustomerContentModel()
        {//1
            Initializing();
            GetReady();

            RequestModel request = new RequestModel()
            {
                Id = 1,
                StartDate = new DateTime(2016, 1, 1),
                EndDate = new DateTime(2018, 1, 1)
            };

            var actRes = controller.Post(request);
            var response = actRes.ExecuteAsync(CancellationToken.None).Result;

            Assert.IsNotNull(response.Content);

            UnitOfWork unit = new UnitOfWork();
            SetOfReports report = new SetOfReports(unit);

            SalesByCustomerModel model = report.SalesByCustomer.Report(request);

            Assert.AreEqual(model.GrandTotal, 2099);
            Assert.AreEqual(model.Sales.Count, 1);
        }

    }
}
