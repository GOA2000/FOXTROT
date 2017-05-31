(function () {

    application.controller("InvoiceReviewCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {

        $scope.showButtonShow = true;
        $scope.showInvoices = false;
        $scope.showInvoiceGet = false;
        $scope.requestData = {
            startDate: new Date(2016, 1, 1),
            endDate: new Date(2017, 1, 1),
            Id: 5
        };


        $scope.getInvoiceReview = function () {
            DataService.insert("invoicereview", $scope.requestData, function (data) {
                $scope.invoiceReviewData = data;
                $scope.showButtonShow = true;
                $scope.showInvoices = true;
                $scope.showInvoiceGet = false;
            });
        };
        
        
        
//      $scope.requestReviewGetData.id = currentInvoice.invoiceId
/*            $scope.invoiceReviewGetData = {
                Id: currentInvoice.invoiceId,
                startDate: $scope.requestData.startDate,
                endDate: $scope.requestData.endDate
            };*/  


        $scope.getInvoiceReviewGet = function (currentInvoice) {
            DataService.read("invoicereviewget", currentInvoice.invoiceId, function (getdata) {
                $scope.invoiceReviewGetData = getdata;
                $scope.showInvoiceGet = true;
                $scope.showInvoices = false;
                $scope.showButtonShow = false;

            });

        };


    }]);
}());
