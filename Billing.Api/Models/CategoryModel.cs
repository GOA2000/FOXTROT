using System.Collections.Generic;

namespace Billing.Api.Models
{
    public class CategoryModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Products { get; set; }
        public List<string> ProductList { get; set; } 
    }
}