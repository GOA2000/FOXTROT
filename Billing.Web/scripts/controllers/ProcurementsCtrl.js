(function () {
    application.controller("ProcurementsCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {

        $scope.modalShown = false;
        $scope.currentPage = 1;
        $scope.sort = "+name";
        $scope.selector = "";
        listProcurements();
        ListProducts();
        listSuppliers();

        $scope.edit = function(current) {
            $scope.procurement = current;
            $scope.modalShown = true;
          
        };

        $scope.save = function () {
            console.log($scope.Procurement);
            if($scope.procurement.id == 0)
                DataService.insert("procurements", $scope.procurement, function (data) {
                    listProcurements();
                    $scope.modalShown = false;
                });
            else
                DataService.update("procurements", $scope.procurement.id, $scope.procurement, function (data) {
                    listProcurements();
                    $scope.modalShown = false;
                });
        };

        $scope.delete = function (procurementId) {
            DataService.delete("procurements", procurementId, function (data) {
                listProcurements();
                $scope.modalShown = false;
            });
        };

        $scope.new = function () {
            $scope.procurement = {
                id: 0,
                date: "",
                document: "",
                quantity: "",
                price: "",
                total: "",
                supplier: "",
                product: ""
            };
            $scope.modalShown = true;
        };


         function listProcurements() {
        
           $scope.modalShown = false;
          var getPageNumber;
            if($scope.currentPage>0) {getPageNumber=$scope.currentPage-1;};
            var dataSet = "procurements/paginate?currentPage=" + getPageNumber +"&perPage=" +10+ "&sort=" + $scope.sort;
            if ($scope.selector != "") dataSet += "&search=" + $scope.selector + "&findBy="+ $scope.srchFilter;
            console.log(dataSet);
            DataService.list(dataSet, function(data){
                $scope.procurements = data.procurementsList;
                $scope.totalPages = data.totalPages;
                $scope.totalItems = data.totalItems;
                $scope.currentPage = data.currentPage+1;
            });
           


        }


        $scope.refresh = function () {
            listProcurements();
            
        };
        
       $scope.pageChanged = function(){
            listProcurements();
        };

        $scope.sortChanged = function(){
            listProcurements();
        };

         $scope.searchChanged = function(keyEvent){
            if(keyEvent.which == 13) listProcurements();
        };
    
        $scope.searchChanged = function(){
            if($scope.selector.length>=0 || $scope.selector=="") listProcurements();
        };


        function ListProducts() {
            DataService.list("products", function (data) {
                $scope.products = data;
            });
        }
        $scope.refresh = function () {
            listProcurements();
        };
        function listSuppliers() {
            DataService.list("suppliers", function (data) {
                $scope.suppliers = data;
            });
        }
    }]);
}());