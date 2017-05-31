(function () {

    application.controller("ItemsCtrl", ['$scope', 'DataService','$anchorScroll', function ($scope, DataService,$anchorScroll) {
        $scope.currentPage = 1;
        $scope.sort = "+name";
        $scope.selector = "";
        $scope.showItem = false;
        ListItems();
        ListProducts();

        $scope.edit = function (currentItem) {

            $scope.item = currentItem;
            $scope.modalShown = true;
          
        };


        $scope.save = function () {
            console.log($scope.item);
            if ($scope.item.id == 0)
                DataService.insert("items", $scope.item, function (data) {
                    ListItems();
                    $scope.modalShown = false;
                });

            else
                DataService.update("items", $scope.item.id, $scope.item, function (data) {
                    ListItems();
                    $scope.modalShown = false;
                })
        };

        $scope.delete = function (itemId) {
            DataService.delete("items", itemId, function (data) {
                ListItems();
                $scope.modalShown = false;
            })

        };


        $scope.new = function () {
            $scope.item = {
                id: 0,
                name: ""
            };
            $scope.modalShown = true;
            
        };

        $scope.refresh = function () {
            ListItems();
        };

        function ListItems() {
            var getPageNumber;
            if($scope.currentPage>0) {getPageNumber=$scope.currentPage-1;};
            var dataSet = "items/paginate?currentPage=" + getPageNumber + "&perPage=" + 10 + "&sort=" + $scope.sort;
            if ($scope.selector != "") dataSet += "&search=" + $scope.selector + "&findBy=" + $scope.srchFilter;
            console.log(dataSet);
            DataService.list(dataSet, function (data) {
                $scope.items = data.itemsList;
                $scope.totalPages = data.totalPages;
                $scope.totalItems = data.totalItems;
                $scope.currentPage = data.currentPage + 1;
            })
        }


         $scope.pageChanged = function(){
            ListItems();
        };

        $scope.sortChanged = function(){
            ListItems();
        };

         $scope.searchChanged = function(keyEvent){
            if(keyEvent.which == 13) ListItems();
        };
    
        $scope.searchChanged = function(){
            if($scope.selector.length>=2 || $scope.selector=="") ListItems();
        };


        function ListProducts() {
            DataService.list("products", function (data) {
                $scope.products = data
            });
        }
    }]);

}());
