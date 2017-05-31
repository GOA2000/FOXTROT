using Billing.Api.Helpers;
using Billing.Api.Models;
using Billing.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static Billing.Api.Models.DashboardModel;

namespace Billing.Api.Reports
{
    public class ReportFactory
    {
        /*public MonthlySales Create(Region region, double sales)
        {
            return new MonthlySales()
            {
                Label = region.ToString(),
                Sales = sales
            };
        }*/

        public CrossTableAgentRegionModel CreateCross(List<InputItem> list, int length = 15)
        {
            AgentRegionSalesCrossModel agentCross = new AgentRegionSalesCrossModel();
            CrossTableAgentRegionModel result = new CrossTableAgentRegionModel();

            foreach (var item in list)
            {
                if (item.Label != agentCross.AgentName)
                {
                    if (agentCross.AgentName != null) result.agents.Add(agentCross);
                    agentCross = new AgentRegionSalesCrossModel();
                    agentCross.AgentName = item.Label;
                }
                agentCross.AgentSales[Convert.ToInt32(item.Index) - 1] = item.Value;
                agentCross.AgentTurnover += item.Value;

                result.regionSales[Convert.ToInt32(item.Index) - 1] += item.Value;
            }
            if (agentCross.AgentName != null) result.agents.Add(agentCross);


            return result;
        }



        /*public List<AnnualSales> Create(List<InputItem> list, int Length = 12)
        {
            List<AnnualSales> result = new List<AnnualSales>();
            AnnualSales current = new AnnualSales(Length);
            foreach (var item in list)
            {
                if (item.Label != current.Label)
                {
                    if (current.Label != null) result.Add(current);
                    current = new AnnualSales(Length);
                    current.Label = item.Label;
                }
                current.Sales[item.Index - 1] = item.Value;
            }
            if (current.Label != null) result.Add(current);
            return result;
        }*/

        public AgentRegionModel Create(string Region, double RegionSales, double total, double agentTotal)
        {
            AgentRegionModel region = new AgentRegionModel()
            {
                RegionName = Region,
                RegionTotal = RegionSales,
                RegionPercent = Math.Round(100 * RegionSales / agentTotal, 2),
                TotalPercent = Math.Round(100 * RegionSales / total, 2)
            };

            return region;
        }



        public CustomerSalesModel Create(List<Database.Invoice> Invoices, string Customer, double CustomerSales, double grandTotal)
        {
            CustomerSalesModel customer = new CustomerSalesModel()
            {
                CustomerName = Customer,
                CustomerTurnover = CustomerSales,
                CustomerPercent = Math.Round(100 * CustomerSales / grandTotal, 3)
            };
            return customer;
        }

        public RegionSalesModel Create(List<Database.Invoice> Invoices, string Region, double Sales)
        {
            double GrandTotal = Invoices.Sum(x => x.SubTotal);
            RegionSalesModel region = new RegionSalesModel()
            {
                RegionName = Region,
                RegionTotal = Sales,
                RegionPercent = Math.Round(100 * Sales / GrandTotal, 2)
            };
            var q1 = Invoices.Where(x => x.Customer.Town.Region.ToString() == Region);
            var q2 = q1.GroupBy(x => new { id = x.Agent.Id, name = x.Agent.Name });
            var q3 = q2.Select(x => new AgentSalesModel()
            {
                AgentId = x.Key.id,
                AgentName = x.Key.name,
                AgentTotal = x.Sum(y => y.Total),
                RegionPercent = 100 * x.Sum(y => y.Total) / Sales,
                TotalPercent = 100 * x.Sum(y => y.Total) / GrandTotal
            });
            region.Agents = q3.ToList();
            return region;
        }
        /*public List<CustomerStatus> Customers(List<InputItem> list)
        {
            List<CustomerStatus> result = new List<CustomerStatus>();
            CustomerStatus current = new CustomerStatus();
            foreach (var item in list)
            {
                if (item.Label != current.Name)
                {
                    if (current.Name != null) result.Add(current);
                    current = new CustomerStatus();
                    current.Name = item.Label;
                }
                current.Debit += item.Value;
                if (item.Index > 3) current.Credit += item.Value;
            }
            if (current.Name != null) result.Add(current);
            return result.OrderByDescending(x => x.Debit).ToList();
        }

        public CustomerStatus Create(int Id, string Name, Status Status, double Amount)
        {
            return new CustomerStatus()
            {
                Id = Id,
                Name = Name,
            };
        }*/

        public ProductStock Create(int id, string name, string unit, Stock stock)
        {
            ProductStock model = new ProductStock()
            {
                ProductId = id,
                ProductName = name,
                ProductUnit = unit,
                ProductInput = (stock!=null) ? (int)stock.Input : 0,
                ProductOutput = (stock != null) ? (int)stock.Output : 0,
                Stock = (stock != null) ? (int)stock.Id : 0
            };
            return model;
        }

        public CustomerInvoiceModel Create(int Id, string InvoiceNo, DateTime InvoiceDate, DateTime? ShipperdOn, double grandTotal, string InvoiceStatus)
        {
            CustomerInvoiceModel invoice = new CustomerInvoiceModel()
            {
                InvoiceId = Id,
                InvoiceNo = InvoiceNo,
                InvoiceDate = InvoiceDate,
                ShippedOn = ShipperdOn,
                InvoiceStatus = InvoiceStatus,
                InvoiceTotal = grandTotal
            };
            return invoice;
        }
        public InvoiceProductsModel Create(int Id, string Name, int Quantity, double Price, double Subtotal)
        {
            InvoiceProductsModel model = new InvoiceProductsModel()
            {
                ProductId = Id,
                ProductName = Name,
                Quantity = Quantity,
                Price = Price,
                Subtotal = Subtotal
            };
            return model;
        }
        public ProductSalesModel Create(List<Database.Invoice> sample,string productName, double productTotal, double categoryTotal, double invoiceTotal)
        {
            return new ProductSalesModel
            {
                ProductName = productName,
                ProductTotal = productTotal,
                ProductPercent = Math.Round(100 * productTotal / categoryTotal, 2),
                TotalPercent = Math.Round(100 * productTotal / invoiceTotal, 2)

            };
        }

        public SalesByProductModel SalesByProductCreate(DateTime startDate,DateTime endDate,string categoryName,double categoryTotal,double percentTotal)
        {

            return new SalesByProductModel
            {
                StartDate = startDate,
                EndDate = endDate,
                CategoryName = categoryName,
                CategoryTotal = categoryTotal,
                PercentTotal = percentTotal
            };
        }

        public CategoryPurchaseModel Create(string Name, double SubTotal)
        {
            CategoryPurchaseModel category = new CategoryPurchaseModel()
            {
                CategoryName = Name,
                CategoryTotal = SubTotal
            };
            return category;
        }
        public CustomerPurchaseModel Create(string Name, double SubTotal, List<Item> Items, int number, List<CategoryPurchaseModel> Catquery, RequestModel Request)

        {
            CustomerPurchaseModel customer = new CustomerPurchaseModel(number)
            {
                CustomerName = Name,
                CustomerTurnover = SubTotal
            };
            int i = 0;
            foreach (var cat in Catquery)
            {
                var query = Items.Where(x => x.Invoice.Customer.Name.Equals(customer.CustomerName) && x.Product.Category.Name.Equals(cat.CategoryName) && x.Invoice.Date >= Request.StartDate && x.Invoice.Date <= Request.EndDate).ToList();
                customer.CategorySales[i] = query.Sum(x => x.SubTotal);
                i++;
            }

            return customer;
        }

        public InvoiceProductModel Create(int productId, string productName, string productUnit, int quantity, double price, double subtotal)
        {
            return new InvoiceProductModel
            {
                ProductId = productId,
                ProductName = productName,
                ProductUnit = productUnit,
                Quantity = quantity,
                Price = price,
                Subtotal = subtotal
            };
        }

        public List<DashboardModel.Customer> Create(List<InputItem> list)
        {
            List<DashboardModel.Customer> result = new List<DashboardModel.Customer>();
            DashboardModel.Customer current = new DashboardModel.Customer { Name = "", Credit = 0, Debit = 0 };
            foreach (var item in list)
            {
                if (item.Label != current.Name)
                {
                    if (current.Name != "") result.Add(current);
                    current = new DashboardModel.Customer { Name = item.Label, Credit = 0, Debit = 0 };
                }
                current.Debit += Math.Round(item.Value, 2);
                if (item.Index == 1) current.Credit += Math.Round(item.Value, 2);
            }
            if (current.Name != "") result.Add(current);
            return result.OrderByDescending(x => x.Debit).Take(10).ToList();
        }

        public List<DashboardModel.Burning> Create(List<BurningItem> burning)
        {
            List<DashboardModel.Burning> result = new List<DashboardModel.Burning>();

            DashboardModel.Burning current = new DashboardModel.Burning { Name = "", Ordered = 0, Stock = 0, Sold = 0 };
            foreach (var item in burning)
            {
                if (item.Product != current.Name)
                {
                    if (current.Name != "") if (current.Ordered > current.Stock || current.Stock < 0) result.Add(current);
                    current = new DashboardModel.Burning { Name = item.Product, Ordered = 0, Stock = item.Stock, Sold = 0 };
                }
                if (item.Status < Status.InvoicePaid) current.Ordered += item.Quantity; else current.Sold += item.Quantity;
            }
            if (current.Name != "") if (current.Ordered > current.Stock || current.Stock < 0) result.Add(current);

            return result.OrderByDescending(x => x.Difference).ToList();
        }


    }
}