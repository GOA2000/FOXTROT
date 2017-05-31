(function(){   
    
       application.controller("StockCtrl", ['$scope', '$http', 'DataService', function ($scope, $http, DataService) { 


        $scope.modalShown = false;
        ListStocks();

        $scope.getStock = function(currentStock){
            $scope.stock = currentStock;
             $scope.modalShown = true;
        };


        function ListStocks(){
            DataService.list("stock", function(data){ $scope.stocks = data});
        };

        $scope.refresh = function () {
            ListStocks();
        };
        
        function listProducts(){
            DataService.list("products", function(data)
            { 
                $scope.products = data
                $scope.modalShown = true;
            });        
        }


  }]);

}());


