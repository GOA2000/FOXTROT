using Billing.Database;
using System;
using System.Collections.Generic;

namespace Billing.Api.Models
{
    public class AgentRegionSalesCrossModel
    {
        private double agentTurnover;
        public AgentRegionSalesCrossModel(int length = 10)
        {
            AgentSales = new double[length];
        }
        public string AgentName { get; set; }

        public double AgentTurnover { get { return Math.Round(agentTurnover, 2); } set { agentTurnover = value; } }

        public double[] AgentSales { get; set; }
    }
    public class CrossTableAgentRegionModel
    {
        private double grandTotal;
        public CrossTableAgentRegionModel(int lenght = 10)
        {

            agents = new List<AgentRegionSalesCrossModel>();
            regionSales = new double[lenght];
        }
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public double GrandTotal { get { return Math.Round(grandTotal, 2); } set { grandTotal = value; } }

        public double[] regionSales { get; set; }

        public List<AgentRegionSalesCrossModel> agents { get; set; }
    }

}