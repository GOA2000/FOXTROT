(function () {

    application.controller("SuppliersCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {

        $scope.modalShown = false;
        $scope.currentPage = 1;
        $scope.sort = "+name";
        $scope.selector = "";
        listSuppliers();
        getTowns('');

        $scope.edit = function (current) {
            document.getElementById('townsel').style.visibility = 'hidden';
            $scope.supplier = current;
            $scope.modalShown = true;

        };

        $scope.save = function () {
            if ($scope.validation() == true) {
                if ($scope.supplier.id == 0)
                    DataService.insert("suppliers", $scope.supplier, function (data) {
                        listSuppliers();
                        $scope.modalShown = false;
                    });
                else
                    DataService.update("suppliers", $scope.supplier.id, $scope.supplier, function (data) {
                        listSuppliers();
                        $scope.modalShown = false;
                    })
            }
        };
        $scope.validation = function () {
            if ($scope.supplier.name == "" || $scope.supplier.name == undefined) {
                alert('You must enter a name');
                return false;
            }
            else if ($scope.supplier.address == "" || $scope.supplier.address == undefined) {
                alert('You must enter a address');
                return false;
            }
            else if ($scope.supplier.town == "" || $scope.supplier.town == undefined) {
                alert('You must enter a town');
                return false;
            }
            else {
                return true;
            }
        }


        $scope.delete = function (supplierId) {
            DataService.delete("suppliers", supplierId, function (data) {
                listSuppliers();
                $scope.modalShown = false;
            })
        };

        $scope.new = function () {
            document.getElementById('townsel').style.visibility = 'hidden';
            $scope.supplier = {
                id: 0,
                name: "",
                address: "",
                town: ""
            };
            $scope.modalShown = true;
        };


        function listSuppliers() {

            $scope.modalShown = false;
            var getPageNumber;
            if($scope.currentPage>0) {getPageNumber=$scope.currentPage-1;};;
            var dataSet = "suppliers/paginate?currentPage=" + getPageNumber + "&perPage=" + 10 + "&sort=" + $scope.sort;
            if ($scope.selector != "") dataSet += "&search=" + $scope.selector + "&findBy=" + $scope.srchFilter;
            console.log(dataSet);
            DataService.list(dataSet, function (data) {
                $scope.suppliers = data.suppliersList;
                $scope.totalPages = data.totalPages;
                $scope.totalItems = data.totalItems;
                $scope.currentPage = data.currentPage + 1;
            });


        };


        $scope.refresh = function () {
            listSuppliers();

        };

        $scope.pageChanged = function () {
            listSuppliers();
        };

        $scope.sortChanged = function () {
            listSuppliers();
        };

        $scope.searchChanged = function (keyEvent) {
            if (keyEvent.which == 13) listSuppliers();
        };

        $scope.searchChanged = function () {
            if ($scope.selector.length >= 2 || $scope.selector == "") listSuppliers();
        };
        function ListTowns() {
            DataService.list("towns", function (data) {
                $scope.towns = data
            });
        }

        function getTowns(name) {
            DataService.list("towns/" + name, function (data) {
                $scope.towns = data
            });
        }

        $scope.textUp = function (keyEvent) {
            if (keyEvent.key == "ArrowDown") document.getElementById('townsel').focus();
        };

        $scope.townSelected = function (keyEvent) {
            if ((keyEvent.key == "Enter") || (keyEvent.type === 'click')) {
                for (var i = 0; i < $scope.towns.length; i++) {
                    if ($scope.towns[i].id === $scope.supplier.townId) {
                        $scope.supplier.town = $scope.towns[i].name;
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
            listSuppliers();
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
