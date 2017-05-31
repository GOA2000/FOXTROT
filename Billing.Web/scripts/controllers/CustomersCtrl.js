(function () {

    application.controller("CustomersCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {

        $scope.modalShown = false;
        $scope.currentPage = 1;
        $scope.sort = "+name";
        $scope.selector = "";
        listCustomers();
        getTowns('');

        $scope.edit = function (currentCustomer) {
            document.getElementById('townsel').style.visibility = 'hidden';
            $scope.customer = currentCustomer;
            $scope.modalShown = true;

        };

        $scope.save = function () {
            if ($scope.validation() == true) {
                if ($scope.customer.id == 0)
                    DataService.insert("customers", $scope.customer, function (data) {
                        listCustomers();
                        $scope.modalShown = false;
                    });
                else
                    DataService.update("customers", $scope.customer.id, $scope.customer, function (data) {
                        listCustomers();
                        $scope.modalShown = false;
                    })
            }
        };

        $scope.validation = function () {
            if ($scope.customer.name == "" || $scope.customer.name == undefined) {
                alert('You must enter a name');
                return false;
            }
            else if ($scope.customer.address == "" || $scope.customer.address == undefined) {
                alert('You must enter a address');
                return false;
            }
            else if ($scope.customer.town == "" || $scope.customer.town == undefined) {
                alert('You must enter a town');
                return false;
            }
            else {
                return true;
            }
        }

        $scope.delete = function (customerId) {
            DataService.delete("customers", customerId, function (data) {
                listCustomers();
                $scope.modalShown = false;
            });
        };

        $scope.new = function () {
            document.getElementById('townsel').style.visibility = 'hidden';
            $scope.customer = {
                id: 0,
                name: "",
                address: "",
                town: ""
            };
            $scope.modalShown = true;

        };


        function listCustomers() {

            $scope.modalShown = false;
            var getPageNumber;
            if($scope.currentPage>0) {getPageNumber=$scope.currentPage-1;};
            var dataSet = "customers/paginate?currentPage=" + getPageNumber + "&perPage=" + 10 + "&sort=" + $scope.sort;
            if ($scope.selector != "") dataSet += "&search=" + $scope.selector + "&findBy=" + $scope.srchFilter;
            console.log(dataSet);
            DataService.list(dataSet, function (data) {
                $scope.customers = data.customersList;
                $scope.totalPages = data.totalPages;
                $scope.totalItems = data.totalItems;
                $scope.currentPage = data.currentPage + 1;
            });


        }


        $scope.refresh = function () {
            listCustomers();

        };

        $scope.pageChanged = function () {
            listCustomers();
        };

        $scope.sortChanged = function () {
            listCustomers();
        };

        $scope.searchChanged = function (keyEvent) {
            if (keyEvent.which == 13) listCustomers();
        };

        $scope.searchChanged = function () {
            if ($scope.selector.length>=2 || $scope.selector=="") listCustomers();
        };


        function ListTowns() {
            DataService.list("towns", function (data) {
                $scope.towns = data;
            });
        }

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
                    if ($scope.towns[i].id === $scope.customer.townId) {
                        $scope.customer.town = $scope.towns[i].name;
                        document.getElementById('townsel').style.visibility = 'hidden';
                        break;
                    }
                }
            }
        };

        $scope.log = function (event) {

            console.log(event);

        };

        $scope.refresh = function () {
            listCustomers();
        };

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
