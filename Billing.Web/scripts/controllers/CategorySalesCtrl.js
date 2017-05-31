(function () {
    application.controller("CategorySalesCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {

        $scope.showButtonShow = true;
        $scope.requestData = {
            startDate: new Date(2016,1,1),
            endDate: new Date(2017,1,1)
        };

        $scope.getSalesByCategory = function () {
            DataService.insert("salesbycategory", $scope.requestData, function (data) {
                $scope.salesByCategoryData = data;
                $scope.showCategory = true;
                $scope.showButtonShow = true;
                $scope.showTableProduct = false;
            });
        };

        $scope.getSalesByProduct = function (currentCategory) {

            $scope.currentCategoryName = currentCategory.categoryName;
            var promise = DataService.promise("categories/"+currentCategory.categoryName);
                promise.then(
                function(response){
                    $scope.requestData.id = response.data[0].id;
                    DataService.insert("salesbyproduct", $scope.requestData, function (data){
                        $scope.salesByProductData = data;});

                },
                function(reason){}
            );
            $scope.showTableProduct=true;
                $scope.showCategory = false;
                $scope.showButtonShow = false;
        };

    }]);
}());