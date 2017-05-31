(function () {

    application.controller("DashboardCtrl", ['$scope', '$anchorScroll', 'DataService', 'HelperService', function ($scope, $anchorScroll, DataService, HelperService) {

        DataService.list("dashboard", function (data) {
            $scope.showRegions = true;
            $scope.showCategories = false;
            $scope.showAgents = false;

            var maxv = 0;
            var maxv2 =0;

            months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
            $scope.dashboardData = data;
            $scope.title = data.title;

            regionSales = new Array();
            regionLabels = new Array();
            categorySales = new Array();
            categoryLabels = new Array();
            agentSales = new Array();
            agentLabels = new Array();
            annualSales = new Array();
            top5Sales = new Array();
            top5Labels = new Array();
            hotsDifference = new Array();
            hotsLabels = new Array();
            invoiceStatusName = new Array();
            invoiceStatusNum = new Array();
            customersCredit = new Array();
            customersDebit = new Array();
            customersName = new Array();


            angular.forEach(data.regions, function (key, value) {
                regionSales.push(key.sales);
                regionLabels.push(key.label);
            });
            angular.forEach(data.categories, function (key, value) {
                categorySales.push(key.sales);
                categoryLabels.push(key.label);
            });
            angular.forEach(data.agents, function (key, value) {
                agentSales.push(key.sales);
                agentLabels.push(key.label);
            });
            angular.forEach(data.top5, function (key, value) {
               top5Sales.push(key.revenue);
               top5Labels.push(key.name);

            });

            angular.forEach(data.hots, function (key, value) {
                hotsDifference.push(key.difference);
                hotsLabels.push(key.name);
            });

            angular.forEach(data.invoices, function (key, value) {
               invoiceStatusName.push(key.status);
               invoiceStatusNum.push(key.count);
            });

            angular.forEach(data.customers, function (key, value) {
               customersCredit.push(key.credit);
               customersName.push(key.name);
               customersDebit.push(key.debit);
                if (key.credit > maxv2) maxv2 = key.credit;
                else if (key.debit>maxv2) maxv2 = key.debit;
            });

            $scope.canc = invoiceStatusNum[0];
            $scope.orde = invoiceStatusNum[1];
            $scope.conf = invoiceStatusNum[2];
            $scope.icre = invoiceStatusNum[3];
            $scope.sent = invoiceStatusNum[4];
            $scope.paid = invoiceStatusNum[5];
            $scope.hold = invoiceStatusNum[6];
            $scope.ready = invoiceStatusNum[7];

            $scope.checkGo = function () {
                var chk = $scope.type;
                if (chk === 'region') {
                    $scope.showRegions = true;
                    $scope.showCategories = false;
                    $scope.showAgents = false;
                }
                else if (chk === 'category') {
                    $scope.showRegions = false;
                    $scope.showCategories = true;
                    $scope.showAgents = false;
                }
                else if (chk === 'agent') {
                    $scope.showRegions = false;
                    $scope.showCategories = false;
                    $scope.showAgents = true;
                }
            };


            angular.forEach(data.sales, function(key, value){
                annualSales.push(key);
                if (key > maxv) maxv = key;
            });
            annualSales.splice(annualSales.valueOf(0),1);
            //annualSales.splice(annualSales.indexOf("24"),1);
            maxv = 100000 * Math.ceil(maxv / 100000);
            var step = maxv / 5;
            maxv2 = 100000 * Math.ceil(maxv2 / 100000);
            var step2 = maxv2 / 5;

            var ctx = document.getElementById("regionSales");
            var chart = new Chart(ctx, {
                type: "pie",
                data: {
                    labels: regionLabels,
                    datasets: [
                        {
                            label: "revenue",
                            data: regionSales,
                            backgroundColor: [
                                'rgba(0, 0, 153, 1)',
                                'rgba(79, 171, 201, 1)',
                                'rgba(255, 102, 0, 1)',
                                'rgba(255, 166, 77, 1)',
                                'rgba(0, 153, 0, 1)',
                                'rgba(144, 238, 144, 1)',
                                'rgba(204, 0, 0, 1)',
                                'rgba(255, 179, 179, 1)'
                            ],
                            borderColor: 'rgba(255, 255, 230, 1)',
                            borderWidth: 1,
                            yAxisID: "rev"
                        }]
                },
                options: {
                    responsive:true,
                    padding: 14,
                    title: {display: true, text: "Sales by Regions", padding: 8, fontFamily: 'Open Sans', fontSize: 16},
                    legend: {position: "right"},
                    scales: {}
                }
            });


            ctx = document.getElementById("categorySales");
            var chart = new Chart(ctx, {
                type: "pie",
                data: {
                    labels: categoryLabels,
                    datasets: [
                        {
                            label: "revenue",
                            data: categorySales,
                            backgroundColor: [
                                'rgba(0, 0, 153, 1)',
                                'rgba(79, 171, 201, 1)',
                                'rgba(255, 102, 0, 1)',
                                'rgba(255, 166, 77, 1)',
                                'rgba(0, 153, 0, 1)',
                                'rgba(144, 238, 144, 1)',
                                'rgba(204, 0, 0, 1)',
                                'rgba(255, 179, 179, 1)',
                                'rgba(153, 0, 153, 1)'
                            ],
                            borderColor: 'rgba(255, 255, 255, 1)',
                            borderWidth: 1,
                            yAxisID: "rev"
                        }]
                },
                options: {
                    padding: 14,
                    title: {
                        display: true,
                        text: "Sales by Category",
                        padding: 8,
                        fontFamily: 'Open Sans',
                        fontSize: 16
                    },
                    legend: {position: "right"},
                    scales: {}
                }
            });

            ctx = document.getElementById("agentSales");
            var chart = new Chart(ctx, {
                type: "pie",
                data: {
                    labels: agentLabels,
                    datasets: [
                        {
                            label: "revenue",
                            data: agentSales,
                            backgroundColor: [
                                'rgba(0, 0, 153, 1)',
                                'rgba(79, 171, 201, 1)',
                                'rgba(255, 102, 0, 1)',
                                'rgba(255, 166, 77, 1)',
                                'rgba(0, 153, 0, 1)',
                                'rgba(144, 238, 144, 1)',
                                'rgba(204, 0, 0, 1)',
                                'rgba(255, 179, 179, 1)',
                                'rgba(153, 0, 153, 1)'
                            ],
                            borderColor: 'rgba(255, 255, 230, 1)',
                            borderWidth: 1,
                            yAxisID: "rev"
                        }]
                },
                options: {
                    padding: 14,
                    title: {display: true, text: "Sales by Agent", padding: 8, fontFamily: 'Open Sans', fontSize: 16},
                    legend: {position: "right"},
                    scales: {}
                }
            });

            ctx = document.getElementById("annualSales");
            var myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: months,
                    datasets: [
                        {
                            label: "revenue",
                            data: annualSales,
                            backgroundColor: 'rgba(0, 0, 153, 0.8)',
                            borderColor: 'rgba(0, 0, 153, 1)',
                            borderWidth: 1,
                            yAxisID: "rev"
                        }]
                },
                options: {
                    padding: 14,
                    title: { display: true, text: "ANNUAL SALES", fontFamily:'Open Sans', fontSize:16},
                    legend: { position: "none" },
                    scales: {
                        yAxes: [
                            { type: "linear", id: "rev", display:true, position:"right", ticks: { stepSize: step, min: 0, max: maxv } }
                        ]
                    }
                }});

            ctx = document.getElementById("top5Sales");
            var chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: top5Labels,
                    datasets: [
                        {
                            label: "revenue",
                            data: top5Sales,
                            backgroundColor: [
                                'rgba(0, 0, 153, 1)',
                                'rgba(79, 171, 201, 1)',
                                'rgba(255, 102, 0, 1)',
                                'rgba(255, 166, 77, 1)',
                                'rgba(0, 153, 0, 1)',
                                'rgba(144, 238, 144, 1)',
                                'rgba(204, 0, 0, 1)',
                                'rgba(255, 179, 179, 1)',
                                'rgba(153, 0, 153, 1)'
                            ],
                            borderColor: [
                                'rgba(255, 255, 255, 1)'
                            ],
                            borderWidth: 1,
                            yAxisID: "rev"
                        }]
                },
                options: {
                    padding: 14,
                    title: {display: true, text: "TOP 5 PRODUCTS", padding: 8, fontFamily: 'Open Sans', fontSize: 16},
                    legend: {position: "right"},
                    scales: {}
                }
            });

            ctx = document.getElementById("hotsSales");
            var chart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: hotsLabels,
                    datasets: [
                        {
                            label: "difference",
                            data: hotsDifference,
                            backgroundColor: [
                                'rgba(0, 0, 153, 1)',
                                'rgba(79, 171, 201, 1)',
                                'rgba(255, 102, 0, 1)',
                                'rgba(255, 166, 77, 1)',
                                'rgba(0, 153, 0, 1)',
                                'rgba(144, 238, 144, 1)',
                                'rgba(204, 0, 0, 1)',
                                'rgba(255, 179, 179, 1)',
                                'rgba(153, 0, 153, 1)',
                                'rgba(0, 179, 0, 1)',
                                'rgba(255, 255, 0, 1)'
                            ],
                            borderColor: [
                                'rgba(255, 255, 255, 1)'
                            ],
                            borderWidth: 1,
                            yAxisID: "rev"
                        }]
                },
                options: {
                    padding: 14,
                    title: {display: true, text: "HOTS", padding: 8, fontFamily: 'Open Sans', fontSize: 16},
                    legend: {position: "right",fontSize: 6},
                    scales: {}
                }
            });


            ctx = document.getElementById("customersSale");
            var myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: customersName,
                    datasets: [
                        {
                            label: "revenue",
                            data: customersCredit,
                            fill: true,
                            lineTension: 0.1,
                            backgroundColor: "rgba(0,0,153,0.6)",
                            borderColor: "rgba(0,0,153,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            spanGaps: false
                        },
                        {
                            label: "revenue",
                            data: customersDebit,
                            fill: true,
                            lineTension: 0.1,
                            backgroundColor: "rgba(204, 0, 0,0.6)",
                            borderColor: "rgba(204, 0, 0,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(255, 51, 51,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(255, 51, 51,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            spanGaps: true
                        }]
                },
                options: {
                    padding: 14,
                    title: { display: true, text: "CUSTOMER SALES", fontFamily:'Open Sans', fontSize:16},
                    legend: { position: "none" },
                    scales: {
                        yAxes: [
                            { type: "linear", id: "rev", display:true, position:"left", ticks: { stepSize: step2, min: 0, max: maxv2 } }
                        ]
                    }
                }});


        });
    }]);
}());