(function () {

    application.controller("ShippersCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {

        $scope.modalShown = false;
        $scope.currentPage = 1;
        $scope.sort = "+name";
        $scope.selector = "";
        listShippers();
        getTowns('');

        $scope.edit = function (current) {
            document.getElementById('townsel').style.visibility = 'hidden';
            $scope.shipper = current;
            $scope.modalShown = true;
            
        };

        $scope.save = function () {
            if ($scope.validation() == true) {
                if ($scope.shipper.id == 0)
                    DataService.insert("shippers", $scope.shipper, function (data) {
                        listShippers();
                        $scope.modalShown = false;
                    });
                else
                    DataService.update("shippers", $scope.shipper.id, $scope.shipper, function (data) {
                        listShippers();
                        $scope.modalShown = false;
                    });
            }
        };
        
        $scope.validation = function () {
            if($scope.shipper.name == "" || $scope.shipper.name == undefined)
            {
                alert('You must enter a name');
                return false;
            }
            else if($scope.shipper.address == "" || $scope.shipper.address == undefined)
            {
                alert('You must enter a address');
                return false;
            }
            else if($scope.shipper.town == "" || $scope.shipper.town == undefined)
            {
                alert('You must enter a town');
                return false;
            }
            else {
                return true;
            }
        }

        $scope.delete = function (shipperId) {

            DataService.delete("shippers", shipperId, function (data) {
                listShippers();
                $scope.modalShown = false;
            })
        };

        $scope.new = function () {
            document.getElementById('townsel').style.visibility = 'hidden';
            $scope.shipper = {
                id: 0,
                name: "",
                address: "",
                town: ""
            };
            $scope.modalShown = true;
        };



         function listShippers() {
        
           $scope.modalShown = false;
            var getPageNumber;
            if($scope.currentPage>0) {getPageNumber=$scope.currentPage-1;};;
            var dataSet = "shippers/paginate?currentPage=" + getPageNumber +"&perPage=" +10+ "&sort=" + $scope.sort;
            if ($scope.selector != "") dataSet += "&search=" + $scope.selector + "&findBy="+ $scope.srchFilter;
            console.log(dataSet);
            DataService.list(dataSet, function(data){
                $scope.shippers = data.shippersList;
                $scope.totalPages = data.totalPages;
                $scope.totalItems = data.totalItems;
                $scope.currentPage = data.currentPage+1;
            });
           


        };


        $scope.refresh = function () {
            listShippers();
            
        };
        
       $scope.pageChanged = function(){
            listShippers();
        };

        $scope.sortChanged = function(){
            listShippers();
        };

         $scope.searchChanged = function(keyEvent){
            if(keyEvent.which == 13) listShippers();
        };
    
        $scope.searchChanged = function(){
            if($scope.selector.length>=2 || $scope.selector=="") listShippers();
        };

 


        function ListTowns() {
            DataService.list("towns", function (data) {
                $scope.towns = data
            });
        };

        function getTowns(name) {
            DataService.list("towns/" + name, function (data) {
                $scope.towns = data;
            });
        }


        $scope.textUp = function (keyEvent) {
            if (keyEvent.key == "ArrowDown") document.getElementById('townsel').focus();
        };

        $scope.townSelected = function (keyEvent) {
            if ((keyEvent.key == "Enter") || (keyEvent.type === 'click')) {
                for (var i = 0; i < $scope.towns.length; i++) {
                    if ($scope.towns[i].id === $scope.shipper.townId) {
                        $scope.shipper.town = $scope.towns[i].name;
                        document.getElementById('townsel').style.visibility = 'hidden';
                        break;
                    }
                }
            }
        };

        $scope.log = function (event) {

            console.log(event)

        }

        $scope.refresh = function () {

            listShippers()
        }

        $scope.autocomplete = function (autoStr) {
            if (autoStr.length >= 3) {
                getTowns(autoStr);
                document.getElementById('townsel').style.visibility = 'visible';
                document.getElementById('townsel').style.width = '100%';

                document.getElementById('townsel').size = 8;
            }
            else {
                document.getElementById('townsel').style.visibility = 'hidden';
            }
        };
    }]);
}());