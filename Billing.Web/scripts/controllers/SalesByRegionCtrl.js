(function () {

    application.controller("SalesByRegionCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {

        $scope.showButtonShow = true;
        $scope.showSales = false;
        $scope.showAgentRegion = false;
       $scope.requestData = {
            startDate: new Date(2016, 1, 1),
            endDate: new Date(2017, 1, 1)
        };


        $scope.getSalesByRegion = function () {
            DataService.insert("salesbyregion", $scope.requestData, function (data) {
                $scope.salesByRegionData = data;
                $scope.showButtonShow = true;
                $scope.showSales = true;
                $scope.showAgentRegion = false;
            });
        }


        $scope.getSalesByAgent = function (currentAgent) {


            $scope.agentRequestData = {
                Id: currentAgent.agentId,
                startDate: $scope.requestData.startDate,
                endDate: $scope.requestData.endDate
            };

            DataService.insert("salesbyagent", $scope.agentRequestData, function (agentdata) {
                $scope.salesByAgentData = agentdata;
                $scope.showAgentRegion = true;
                $scope.showSales = false;
                $scope.showButtonShow = false;

            });

        }


    }]);
}());
