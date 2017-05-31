using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Billing.Database;
using Billing.Api.Controllers;
using System.Web.Http;
using System.Net.Http;
using System.Web.Http.Routing;
using System.Web.Http.Controllers;
using System.Web.Http.Hosting;
using System.Threading;
using Billing.Api.Models;
using System.Security.Principal;
using Billing.Api.Reports;
using Billing.Repository;

namespace Billing.Tests.TestClasses
{
    [TestClass]
    public class TestSalesByAgentRpt
    {

        SalesByAgentController controller = new SalesByAgentController();
        HttpConfiguration config = new HttpConfiguration();
        HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "api/salesbyagent");

        [TestInitialize]
        public void Initializing()
        {
            TestHelper.InitDatabase();
        }

        void GetReady()
        {
            var route = config.Routes.MapHttpRoute("default", "api/{controller}/{id}");
            var routeData = new HttpRouteData(route, new HttpRouteValueDictionary { { "controller", "salesbyagent" } });

            controller.ControllerContext = new HttpControllerContext(config, routeData, request);
            controller.Request = request;
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
        }

        [TestMethod]
        public void SalesByAgentGoodDate()
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

        //[TestMethod]
        //public void SalesByAgentWrongDate()
        //{//1
        //    Initializing();
        //    GetReady();
        //    var actRes = controller.Post(new RequestModel()
        //    {
        //        Id = 1,
        //        StartDate = new DateTime(2018, 1, 1),
        //        EndDate = new DateTime(2015, 1, 1)
        //    }
        //    );
        //    var response = actRes.ExecuteAsync(CancellationToken.None).Result;

        //    Assert.IsFalse(response.IsSuccessStatusCode);
        //}

        [TestMethod]
        public void SalesByAgentContent()
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

    }
}