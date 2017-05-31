(function() {


       application.controller("CategoriesCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {  


        $scope.modalShown = false;
        $scope.currentPage = 1;
        $scope.sort = "+name";
        $scope.selector = "";
        listCategories();

        $scope.getCategory = function(currentCategory) {
            $scope.category = currentCategory;
            $scope.modalShown = true;
        };


        $scope.save = function() {
            if ($scope.category.id == 0) {


                DataService.insert("categories", $scope.category, function(data) {
                    listCategories();
                });
                $scope.modalShown = false;

            } else {
                DataService.update("categories", $scope.category.id, $scope.category, function(data) {
                    listCategories();
                });
                $scope.modalShown = false;
            }
        };

        $scope.deleteCategory = function(currentCategory) {
            DataService.delete("categories", currentCategory.id, function(data) {
                listCategories();
                $scope.modalShown = false;
            });
        };

        $scope.new = function() {
            $scope.category = {
                id: 0,
                name: ""
            };
            $scope.modalShown = true;
        };

        $scope.refresh = function () {
            listCategories();
        };


         function listCategories() {
        
           $scope.modalShown = false;
            var getPageNumber;
            if($scope.currentPage>0) {getPageNumber=$scope.currentPage-1;};
            var dataSet = "categories/paginate?currentPage=" + getPageNumber +"&perPage=" +10+ "&sort=" + $scope.sort;
            if ($scope.selector != "") dataSet += "&search=" + $scope.selector + "&findBy="+ $scope.srchFilter;
            console.log(dataSet);
            DataService.list(dataSet, function(data){
                $scope.categories = data.categoriesList;
                $scope.totalPages = data.totalPages;
                $scope.totalItems = data.totalItems;
                $scope.currentPage = data.currentPage+1;
            });
           


        }


        $scope.refresh = function () {
            listCategories();
            
        };
        
       $scope.pageChanged = function(){
            listCategories();
        };

        $scope.sortChanged = function(){
            listCategories();
        };

         $scope.searchChanged = function(keyEvent){
            if(keyEvent.which == 13) listCategories();
        };
    
        $scope.searchChanged = function(){
            if($scope.selector.length>=2 || $scope.selector=="") listCategories();
        };


      
 
    }]);
}());