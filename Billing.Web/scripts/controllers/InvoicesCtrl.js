(function () {

    application.controller("InvoicesCtrl", ['$scope', 'DataService', '$http', '$anchorScroll', function ($scope, DataService, $http, $anchorScroll) {
        $scope.currentPage = 1;
        $scope.sort = "+name";
        $scope.selector = "";
        $scope.showInvoice = false;
        $scope.itemsList = new Array();
        $scope.newItem = {};
        $scope.displayItems = false;
        $scope.invoiceEdit = {};
        $scope.invoice = {};
        $scope.invoiceUpdate = true;
        listAgents();
        listInvoices();



        $scope.edit = function (currentInvoice) {
            $scope.invoiceEdit.selectedAgent = currentInvoice.agent;
            $scope.invoiceEdit.selectedCustomer = currentInvoice.customer;
            $scope.invoiceEdit.selectedShipper = currentInvoice.shipper;
            $scope.invoice = currentInvoice;
            $scope.invoice.date = new Date(currentInvoice.date);
            if (currentInvoice.shippedOn != null) {
                $scope.invoice.shippedOn = new Date(currentInvoice.shippedOn)
            }
            updateCheck($scope.invoice.status);
            $scope.itemsList = currentInvoice.items;
            $scope.displayItems = true;
            $scope.modalShown = true;
 };

        $scope.save = function () {
            prepareData($scope.invoiceEdit.selectedAgent.id, function () { $scope.invoice.agentId = $scope.invoiceEdit.selectedAgent.id; })
            prepareData($scope.invoiceEdit.selectedCustomer.id, function () { $scope.invoice.customerId = $scope.invoiceEdit.selectedCustomer.id; })
            prepareData($scope.invoiceEdit.selectedShipper.id, function () { $scope.invoice.shipperId = $scope.invoiceEdit.selectedShipper.id; })
            console.log($scope.Invoice);
            if ($scope.invoice.id == 0)
                DataService.insert("invoices", $scope.invoice, function (data) {
                    $scope.invoice.id = data.id;
                    listInvoices();
                    if (data != false) {
                        $scope.displayItems = true;
                        $scope.itemsList = new Array();
                    }
                });
            else
                DataService.update("invoices", $scope.invoice.id, $scope.invoice, function (data) {
                    listInvoices();
                })
        };

        /* PrepareData Verifies if the parameter is undefined if not then executes callback function */
        prepareData = function (parameterId, callback) {
            if (parameterId != undefined) {
                return callback();
            }

        }

        $scope.delete = function (invoiceId) {
            DataService.delete("invoices", invoiceId, function (data) {
                listInvoices();
                $scope.modalShown = false;
            })

        };


        $scope.new = function () {
            $scope.displayItems = false;
            $scope.itemsList = {};
            $scope.invoiceEdit.selectedCustomer = { id: 0, name: '' };
            $scope.invoiceEdit.selectedAgent = { id: 0, name: '' };
            $scope.invoiceEdit.selectedShipper = { id: 0, name: '' };
            $scope.invoice = {
                id: 0
            };
            $scope.modalShown = true;

        };

        $scope.refresh = function () {
            listInvoices();
        };


        $scope.textUp = function (keyEvent) {
            if (keyEvent.key == "ArrowDown") document.getElementById('townsel').focus();
        };



        $scope.autocomplete = function (autoStr) {
            console.log("ss " + $scope.agents)
            if (autoStr.length >= 3) {
                $scope.agents = '';
                HelperService.getAgents(function (data) {
                    $scope.agents = data
                });
                document.getElementById('townsel').style.visibility = 'visible';
                document.getElementById('townsel').style.width = '100%';
                document.getElementById('townsel').size = 8;
            }
            else {
                document.getElementById('townsel').style.visibility = 'hidden';
            }
        };


        $scope.getAgents = function (str) {
            return $http.get('http://localhost:9000/api/agents/' + str).then(function (response) {
                return response.data;
            });
        }

        $scope.getCustomers = function (str) {
            return $http.get('http://localhost:9000/api/customers/' + str).then(function (response) {
                return response.data;
            });
        }

        $scope.getShippers = function (str) {
            return $http.get('http://localhost:9000/api/shippers/' + str).then(function (response) {
                return response.data;
            });
        }

        $scope.getProducts = function (str) {
            return $http.get('http://localhost:9000/api/products/' + str).then(function (response) {
                return response.data;
            });
        }


        /*Function removes Item from itemsArray of items that belong to the invoice */
        $scope.deleteItem = function (itemId) {
            DataService.delete("items", itemId, function (data) {
                if (data != false) {
                    for (var i = 0; i < $scope.itemsList.length; i++) {
                        if ($scope.itemsList[i].id == itemId) {
                            $scope.itemsList.splice(i, 1)
                        }
                    }
                }
            })
        }

        /* AddToInvoice creates and inserts items from the modal to the database, and
        then to the local array of items which are displayed in the modal
        
        The function Checks if the item is already in the itemsList which would mean it is
        attached to the invoice. If the item is in the list it updates it both in the invoice 
        and list.
        */
        $scope.addToInvoice = function () {

            item = {
                id: 0,
                invoiceId: $scope.invoice.id,
                productId: $scope.newItem.product.id,
                product: $scope.newItem.product.name,
                price: $scope.newItem.product.price,
                quantity: $scope.newItem.quantity
            }

            for (var i = 0; i < $scope.itemsList.length; i++) {
                if ($scope.itemsList[i].id == $scope.newItem.id) {
                    item.id = $scope.newItem.id
                    DataService.update("items", item.id, item, function (response) {
                        if (response == false) {
                            return console.log("ERROR Updating")
                        }
                        else {

                            readCurrentInvoice(response.invoiceId)
                        }

                        $scope.itemsList[i] = {
                            id: response.id,
                            invoiceId: response.invoiceId,
                            productId: response.productId,
                            product: response.product,
                            price: response.price,
                            quantity: response.quantity
                        }
                        $scope.newItem = {};
                    })
                    return
                }
            }

            DataService.insert("items", item, function (response) {
                if (response == false) {
                    return console.log("ERROR")
                }

                $scope.itemsList.push({
                    id: response.id,
                    invoiceId: response.invoiceId,
                    productId: response.productId,
                    product: response.product,
                    price: response.price,
                    quantity: response.quantity
                });

                $scope.newItem = {};
                readCurrentInvoice(response.invoiceId)
            })



        }

        function readCurrentInvoice(id) {
            DataService.read("invoices", id, function (response) {
                if (response == false) {
                    return console.log("ERROR getting Invoice")
                }
                $scope.invoice = response;

            })
        }

        $scope.nextStep = function (invoiceNum) {
            var cancel = $scope.cancel;
            if (cancel != true) { cancel = false }
            var dataSet = 'invoices/' + invoiceNum + '/next/' + cancel;
            DataService.next(dataSet, function (response) {
                console.log(response)
                $scope.invoice = response;
                $scope.invoice.shippedOn = new Date(response.shippedOn);
                updateCheck($scope.invoice.status);

            })
        }

        function listInvoices() {
            var getPageNumber;
            if($scope.currentPage>0) {getPageNumber=$scope.currentPage-1;};
            var dataSet = "invoices/paginate?currentPage=" + getPageNumber + "&perPage=" + 10 + "&sort=" + $scope.sort;
            if ($scope.selector != "") dataSet += "&search=" + $scope.selector + "&findBy=" + $scope.srchFilter;
            console.log(dataSet);
            DataService.list(dataSet, function (data) {
                $scope.invoices = data.invoicesList;
                $scope.totalPages = data.totalPages;
                $scope.totalItems = data.totalItems;
                $scope.currentPage = data.currentPage + 1;
            });


        };

        $scope.pageChanged = function () {
            listInvoices();
        };

        $scope.sortChanged = function () {
            listInvoices();
        };

        $scope.searchChanged = function (keyEvent) {
            if (keyEvent.which == 13 || keyEvent.type == 'click') listInvoices();
        };
       
        $scope.searchChanged = function () {
            if ($scope.selector.length>=2 || $scope.selector=="") listInvoices();
        };

        $scope.updateItem = function (item) {
            console.log("bein");
            // $scope.newItem=item;
            $scope.newItem.product = {
                id: item.productId,
                name: item.product,
                price: item.price,
                quantity: item.quantity
            }
            $scope.newItem.id = item.id;
            $scope.newItem.quantity = item.quantity;
            $scope.newItem.productPrice = item.price;

        }

        function updateCheck(status) {
            if (status == "InvoicePaid" || status == "OnHold" || status == "Ready" || status == "Delivered") {
                $scope.invoiceUpdate = false;
            } else
            { $scope.invoiceUpdate = true; }

        }

        function listAgents() {
            DataService.list("agents", function (data) {
                $scope.agents = data;
            })
        }
    }]);

}());
