(function () {

    application.controller("StockLevelCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {
        $scope.showStockLevel = false;
        
//        $scope.requestData = {
//            startDate: new Date(2016, 1, 1),
//            endDate: new Date(2017, 1, 1)
//        };

        listCategories();

        $scope.getStockLevel = function () {
            DataService.insert("stocklevel", $scope.requestData, function (data) {
                $scope.stockLevelData = data;
                $scope.showStockLevel = true;
            });
        }

        function listCategories() {
            DataService.list("categories", function (data) {
                $scope.categories = data
            });
        };

    }]);
}());
