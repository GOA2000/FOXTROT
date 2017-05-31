using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Billing.Api.Controllers;
using System.Web.Http;
using System.Net.Http;
using Billing.Repository;
using Billing.Api.Reports;
using System.Web.Http.Routing;
using System.Web.Http.Controllers;
using System.Web.Http.Hosting;
using Billing.Api.Models;
using System.Threading;

namespace Billing.Tests.TestClasses
{
    [TestClass]
    public class TestInvoicesReviewController
    {
        InvoiceReviewController controller = new InvoiceReviewController();
        HttpConfiguration config = new HttpConfiguration();
        HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, "api/invoicereview");
        private UnitOfWork unit = new UnitOfWork();
        SetOfReports set = new SetOfReports(new UnitOfWork());


        void GetReady()
        {
            var route = config.Routes.MapHttpRoute("default", "api/{controller}/{id}");
            var routeData = new HttpRouteData(route, new HttpRouteValueDictionary { { "controller", "invoicereview" } });

            controller.ControllerContext = new HttpControllerContext(config, routeData, request);
            controller.Request = request;
            controller.Request.Properties[HttpPropertyKeys.HttpConfigurationKey] = config;
        }

        [TestMethod]
        public void GetInvoicesReview()
        {
            TestHelper.InitDatabase();
            GetReady();
            var actRes = controller.Post(new RequestModel()
            {
                Id = 1,
                StartDate = new DateTime(2015, 1, 1),
                EndDate = new DateTime(2018, 1, 1)
            }
            );
            var response = actRes.ExecuteAsync(CancellationToken.None).Result;

            Assert.IsTrue(response.IsSuccessStatusCode);
        }

        [TestMethod]
        public void GetInvoicesReviewForWrongCustomer()
        {
            GetReady();
            var actRes = controller.Post(new RequestModel()
            {
                Id = 99,
                StartDate = new DateTime(2015, 1, 1),
                EndDate = new DateTime(2018, 1, 1)
            }
            );
            var response = actRes.ExecuteAsync(CancellationToken.None).Result;

            Assert.IsFalse(response.IsSuccessStatusCode);
        }

        [TestMethod]
        public void GetInvoicesReviewForWrongDates()
        {
            GetReady();
            var actRes = controller.Post(new RequestModel()
            {
                Id = 1,
                StartDate = new DateTime(2018, 1, 1),
                EndDate = new DateTime(2015, 1, 1)
            }
            );
            var response = actRes.ExecuteAsync(CancellationToken.None).Result;

            Assert.IsFalse(response.IsSuccessStatusCode);
        }

        [TestMethod]
        public void TestModelCustomerId()
        {
            RequestModel requestModel = new RequestModel()
            {
                Id = 1,
                StartDate = new DateTime(2015, 1, 1),
                EndDate = new DateTime(2018, 1, 1)
            };

            InvoiceReviewModel model = set.InvoiceReview.Report(requestModel);
            Assert.AreEqual(model.CustomerId, 1);
        }

        [TestMethod]
        public void TestModelCustomerName()
        {
            RequestModel requestModel = new RequestModel()
            {
                Id = 1,
                StartDate = new DateTime(2015, 1, 1),
                EndDate = new DateTime(2018, 1, 1)
            };

            InvoiceReviewModel model = set.InvoiceReview.Report(requestModel);
            Assert.AreEqual(model.CustomerName, "Imtec");
        }

        [TestMethod]
        public void TestModelGrandTotal()
        {
            RequestModel requestModel = new RequestModel()
            {
                Id = 1,
                StartDate = new DateTime(2015, 1, 1),
                EndDate = new DateTime(2018, 1, 1)
            };

            InvoiceReviewModel model = set.InvoiceReview.Report(requestModel);

            double sum = 0;
            foreach (var item in model.Invoices)
            {
                sum += item.InvoiceTotal;
            }
            Assert.AreEqual(model.GrandTotal, sum);
        }


    }
}
