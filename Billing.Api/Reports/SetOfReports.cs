using Billing.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Billing.Api.Reports
{
    public class SetOfReports
    {
        private UnitOfWork _unitOfWork;

        public SetOfReports(UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        private DashboardReport _dashboard;
        private SalesByAgentReport _salesByAgent;
        private SalesByCustomerReport _salesByCustomer;
        private SalesByRegionReport _salesByRegion;
        private SalesByCategoryReport _salesByCategory;
        private SalesByProductReport _salesByProduct;
        private CrossTableAgentRegionReport _crossTableAgentRegion;
        private StockLevelReport _stockLevel;
        private InvoiceReviewReport _invoiceReview;
        private InvoiceReviewGetReport _invoiceReviewGet;
        private CrossCustomersByCategoryReport _crossCustomerByCategory;
        private InvoiceReport _invoiceReport;



        public DashboardReport Dashboard { get { return _dashboard ?? (_dashboard = new DashboardReport()); } }
        public SalesByAgentReport SalesByAgent { get { return _salesByAgent ?? (_salesByAgent = new SalesByAgentReport(_unitOfWork)); } }
        public SalesByCustomerReport SalesByCustomer { get { return _salesByCustomer ?? (_salesByCustomer = new SalesByCustomerReport(_unitOfWork)); } }
        public SalesByRegionReport SalesByRegion { get { return _salesByRegion ?? (_salesByRegion = new SalesByRegionReport(_unitOfWork)); } }
        public SalesByCategoryReport SalesByCategory { get { return _salesByCategory ?? (_salesByCategory = new SalesByCategoryReport(_unitOfWork)); } }
        public CrossTableAgentRegionReport CrossTableAgentRegion { get { return _crossTableAgentRegion ?? (_crossTableAgentRegion = new CrossTableAgentRegionReport(_unitOfWork)); } }
        public SalesByProductReport SalesByProduct { get { return _salesByProduct ?? (_salesByProduct = new SalesByProductReport(_unitOfWork)); } }
        public StockLevelReport StockLevel { get { return _stockLevel ?? (_stockLevel = new StockLevelReport(_unitOfWork)); } }
        public InvoiceReviewReport InvoiceReview { get { return _invoiceReview ?? (_invoiceReview = new InvoiceReviewReport(_unitOfWork)); } }
        public InvoiceReviewGetReport InvoiceReviewGet { get { return _invoiceReviewGet ?? (_invoiceReviewGet = new InvoiceReviewGetReport(_unitOfWork)); } }
        public CrossCustomersByCategoryReport CrossCustomersByCategoryReport { get { return _crossCustomerByCategory ?? (_crossCustomerByCategory = new CrossCustomersByCategoryReport(_unitOfWork)); } }

        public InvoiceReport InvoiceReport { get { return _invoiceReport ?? (_invoiceReport = new InvoiceReport(_unitOfWork)); } }

    }
}