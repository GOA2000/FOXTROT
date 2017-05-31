(function () {

    application.controller("InvoiceReportCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {
        $scope.showInvoices = false;      

        $scope.getInvoiceReport = function () {
            DataService.read("invoicereport", $scope.requestData.id, function (data) {
                if (data)
                    {
                        $scope.invoiceReportData = data;
                        $scope.showInvoices = true;
                    }
                else 
                    {
                        $scope.showInvoices = false;
                    }
            });
        };

    }]);
}());