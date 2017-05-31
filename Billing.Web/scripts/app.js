(function () {

    application = angular.module("Billing", ["ngRoute", "LocalStorageModule","ngAnimate","ui.bootstrap"]);

    credentials = {
        token: "",
        expiration: "",
        currentUser: {
            id: 0,
            name: "",
            role: ""
        }
    };

    function authenticated() {
        return (credentials.currentUser.id != 0);
    }


    redirectTo = '/';
    
    application.config(["$routeProvider", function($routeProvider){

        $routeProvider
            .when("/dashboard", {
                templateUrl: "views/dashboard.html",
                controller: "DashboardCtrl"
            })
            .when("/agents", {
                templateUrl: "views/agents.html",
                controller: "AgentsCtrl"
            })
            .when("/customers", {
                templateUrl: "views/customers.html",
                controller: "CustomersCtrl"
            })
               .when("/invoices", {
                templateUrl: "views/invoices.html",
                controller: "InvoicesCtrl"
            })
               .when("/items", {
                templateUrl: "views/items.html",
                controller: "ItemsCtrl"
            })
            .when("/shippers", {
                templateUrl: "views/shippers.html",
                controller: "ShippersCtrl"
            })
            .when("/suppliers", {
                templateUrl: "views/suppliers.html",
                controller: "SuppliersCtrl"
            })
            .when("/categories", {
                templateUrl: "views/categories.html",
                controller: "CategoriesCtrl"
            })
            .when("/products", {
                templateUrl: "views/products.html",
                controller: "ProductsCtrl"
            })
            .when("/procurements", {
                templateUrl: "views/procurements.html",
                controller: "ProcurementsCtrl"
            })
            .when("/salesbycustomer", {
                templateUrl: "views/customerSales.html",
                controller: "CustomerSalesCtrl"
            })
            .when("/salesbycategory", {
                templateUrl: "views/categorySales.html",
                controller: "CategorySalesCtrl"
            })
            .when("/agentregion", {
                templateUrl: "views/agentRegion.html",
                controller: "AgentRegionCtrl"
            })
            .when("/salesbyregion", {
                templateUrl: "views/salesByRegion.html",
                controller: "SalesByRegionCtrl"
            })
            .when("/invoicereport", {
                templateUrl: "views/invoiceReport.html",
                controller: "InvoiceReportCtrl"
            }) 
            .when("/customerscategories", {
                templateUrl: "views/customersCategories.html",
                controller: "customersCategoriesCtrl"
            })
            .when("/stocklevel", {
                templateUrl: "views/stocklevel.html",
                controller: "StockLevelCtrl"
            })
            .when("/invoicereview", {
                templateUrl: "views/invoicereview.html",
                controller: "InvoiceReviewCtrl"
            })
           .when("/login", {
                templateUrl: "views/login.html",
                controller: "LoginCtrl" })       

            .when("/logout", {
                template: "", 
                controller: "LogoutCtrl"})
                
            .otherwise({ redirectTo: "/dashboard" });
    }]).run(["$rootScope", "$location", function($rootScope, $location){
        $rootScope.$on("$routeChangeStart", function(event, next, current){
            if(!authenticated()){
                if(next.templateUrl != "views/login.html"){
                    $location.path("/login");
                }              
            }
        });
        $rootScope.authenticated=authenticated;
    }]);
}());
