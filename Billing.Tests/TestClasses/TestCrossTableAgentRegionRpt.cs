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
    public class TestCrossTableAgentRegionRpt
    {
        CrossTableAgentRegionController controller = new CrossTableAgentRegionController();
        HttpConfiguration config = new HttpConfiguration();
        HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "api/crosstableagentregion");

        [TestInitialize]
        public void Initializing()
        {
            TestHelper.InitDatabase();
        }

        void GetReady()
        {
            var route = config.Routes.MapHttpRoute("default", "api/{controller}/{id}");
            var routeData = new HttpRouteData(route, new HttpRouteValueDictionary { { "controller", "crosstableagentregion" } });

            controller.ControllerContext = new HttpControllerContext(config, routeData, request);
            controller.Request = request;
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
         }

        [TestMethod]
        public void CrossAgentRegionGoodDate()
        {//1
            Initializing();
            GetReady();
            var actRes = controller.Post(new RequestModel()
            {
                Id = 1,
                StartDate = new DateTime(2014, 1, 1),
                EndDate = new DateTime(2017, 12, 31)
            }
            );
            var response = actRes.ExecuteAsync(CancellationToken.None).Result;

            Assert.IsTrue(response.IsSuccessStatusCode);
        }


        [TestMethod]
        public void CrossAgentRegionContent()
        {//1
            Initializing();
            GetReady();
            var actRes = controller.Post(new RequestModel()
            {
                Id = 1,
                StartDate = new DateTime(2016, 1, 1),
                EndDate = new DateTime(2017, 12, 31)
            }
            );

            var response = actRes.ExecuteAsync(CancellationToken.None).Result;

            Assert.IsNotNull(response.Content);
        }


        [TestMethod]
        public void CrossAgentRegionContentModel()
        {//1
            Initializing();
            GetReady();

            RequestModel request = new RequestModel()
            {
                Id = 1,
                StartDate = new DateTime(2016, 1, 1),
                EndDate = new DateTime(2017, 12, 31)
            };

            var actRes = controller.Post(request);
            var response = actRes.ExecuteAsync(CancellationToken.None).Result;

            Assert.IsNotNull(response.Content);

            UnitOfWork unit = new UnitOfWork();
            SetOfReports report = new SetOfReports(unit);

            CrossTableAgentRegionModel model = report.CrossTableAgentRegion.Report(request);

            Assert.AreEqual(model.agents.Count, 1);
            Assert.AreEqual(model.regionSales.Length, 10);
            Assert.AreEqual(model.GrandTotal, 2609.83);
        }
    }
}
