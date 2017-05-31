(function () {
    application.controller("AgentRegionCtrl", ['$scope', '$anchorScroll', 'DataService', function ($scope, $anchorScroll, DataService) {
        $scope.regions = BillingConfig.regions;
        var vch = document.getElementById("salesChart");

        $scope.requestData = {
            startDate: new Date(2016,1,1),
            endDate: new Date(2017,1,1)
        };

        
        $scope.getAgentsByRegions = function () {
            DataService.insert("crosstableagentregion", $scope.requestData, function (data) {
                $scope.agentByRegionData = data;
                $scope.showAgentRegion = true;
            });
        };

        $scope.showAgent = function(agent){
            var sales = new Array();
            var maxv = 0;
            angular.forEach(agent.agentSales, function(value, key) {
                if(key != "$id") sales.push(value);
                if(value>maxv) maxv = value;
            });
            maxv = 100000 * Math.ceil(maxv / 100000);
            var step = maxv / 5;
            var cht = new Chart(vch, {
                type: "bar",
                data: {
                    labels: BillingConfig.regions,
                    datasets: [
                        {
                            label: "revenue",
                            data: sales,
                            backgroundColor: 'rgba(64, 159, 255, 0.2)',
                            borderColor: 'rgba(64, 159, 255, 1)',
                            borderWidth: 1,
                            yAxisID: "rev"
                        }]
                },
                options: {
                    title: { display: true, text: agent.agentName, padding:8, fontFamily:'Open Sans', fontSize:16 },
                    legend: { position: "none" },
                    scales: {
                        yAxes: [
                            { type: "linear", id: "rev", display:true, position:"right", ticks: { stepSize: step, min: 0, max: maxv } }
                        ]
                    }
                }});
            $scope.show = true;
        };
    }]);
}());

