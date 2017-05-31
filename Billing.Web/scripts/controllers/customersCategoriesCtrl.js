(function () {
    application.controller("customersCategoriesCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {

        $scope.requestData = {
            startDate: new Date(2016,1,1),
            endDate: new Date(2017,1,1)
        };
        
        $scope.getCustomersByCategories = function () {
            DataService.insert("crosstablecustomerscategory", $scope.requestData, function (data) {
                $scope.customersByCategoriesData = data;
                $scope.showCustomersCategories = true;
            });
        };


    }]);
}());