(function () {
    
           application.controller("ProductsCtrl", ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {


        $scope.currentPage = 1;
        $scope.sort = "+name";
        $scope.selector = "";
        $scope.modalShown = false;
        listProducts();
        listCategories();


        $scope.getProduct = function (currentProduct) {
            $scope.product = currentProduct;
            $scope.modalShown = true;
        };

        $scope.save = function () {
            if ($scope.product.id == 0) {
                DataService.insert("products", $scope.product, function (data) { listProducts(); });
                $scope.modalShown = false;
            }
            else {
                DataService.update("products", $scope.product.id, $scope.product, function (data) { listProducts(); });
                $scope.modalShown = false;
            }
        };

        $scope.deleteProduct = function (currentProduct) {
            DataService.delete("products", currentProduct.id, function (data) {
                listProducts();
                $scope.modalShown = false;
            });

        };

        $scope.new = function () {
            $scope.product = {
                id: 0,
                name: "",
                unit: "",
                price: "",
                category: "",
                categoryId: "",
                input: "",
                output: "",
                inventory: ""
            };
            $scope.modalShown = true;
        };

        function listProducts() {
        //    DataService.list("products", function (data) { $scope.products = data });
             $scope.modalShown = false;
             var getPageNumber;
            if($scope.currentPage>0) {getPageNumber=$scope.currentPage-1;};
            var dataSet = "products/paginate?currentPage=" + getPageNumber +"&perPage=" +10+ "&sort=" + $scope.sort;
            if ($scope.selector != "") dataSet += "&search=" + $scope.selector + "&findBy="+ $scope.srchFilter;
            console.log(dataSet);
            DataService.list(dataSet, function(data){
                $scope.products = data.productsList;
                $scope.totalPages = data.totalPages;
                $scope.totalItems = data.totalItems;
                $scope.currentPage = data.currentPage+1;
            });
           


        };

        $scope.refresh = function () {
            listProducts();
            
        };
        
       $scope.pageChanged = function(){
            listProducts();
        };

        $scope.sortChanged = function(){
            listProducts();
        };

         $scope.searchChanged = function(keyEvent){
            if(keyEvent.which == 13) listProducts();
        };
    
        $scope.searchChanged = function(){
            if($scope.selector.length>=2 || $scope.selector=="") listProducts();
        };

        function listCategories() {
            DataService.list("categories", function (data) { $scope.categories = data 
              $scope.modalShown = false;                      });
            
        }

                                                   
                                                   
 }]);


}());