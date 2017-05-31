(function () {

    application.controller("CustomerSalesCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {
        $scope.showCustomer = false;


        $scope.getSalesByCustomer = function () {
            DataService.insert("salesbycustomer", $scope.requestData, function (data) {
                $scope.salesByCustomerData = data;
                $scope.showCustomer = true;
            });
        };
    }]);
}());
