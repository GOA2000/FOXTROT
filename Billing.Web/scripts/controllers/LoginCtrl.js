(function () {

    application.controller("LoginCtrl", ['$route','$scope', '$rootScope', '$http', '$location', 'LoginService', 'localStorageService',
        function ($route,$scope, $rootScope, $http, $location, LoginService, localStorageService) {
            $http.get("config.json").then(
                function (response) {
                    BillingConfig = response.data;
                    $scope.debug = BillingConfig.debugMode;
                    var remToken = localStorageService.get('MistralBilling');
                    if (remToken != null) {
                        var promise = $http({
                            method: "post",
                            url: BillingConfig.source + "remember",
                            data: {
                                "apiKey": BillingConfig.apiKey,
                                "signature": BillingConfig.signature,
                                "remember": remToken
                            }
                        });
                        promise.then(
                            function (response) {
                                credentials = response.data;
                                var expireDate = (new Date());
                                expireDate.setDate(expireDate.getDate() + 30);
                                localStorageService.set('MistralBilling', credentials.remember, { 'expired': expireDate });
                                $rootScope.currentUser = credentials.currentUser.name;
                                currentUser=$rootScope.currentUser.split(" ");
                                $rootScope.userImgName=currentUser[0];
                                $route.reload();
                                $location.path(redirectTo);
                               

                            },
                            function (reason) {
                                console.log(reason);
                            });
                    }
                }, function (reason) {
                    console.log(reason);
                });

            $scope.loginAs = function (username) {
                $scope.user = { name: username, pass: "billing", remember: true };
                $scope.login();
            };

            $scope.changeColor = function () {
                var chkBox = angular.element(document.querySelector('.chkbox'));
                if ($scope.user.remember == true) {
                    chkBox.css({ 'border': '5px solid white' });

                }
                else if ($scope.user.remember == false) {
                    chkBox.css({
                        'border': '1px solid white'
                    });
                }
            };

            $scope.login = function () {
                console.log($scope.user);
                var userData = LoginService.encode($scope.user.name + ":" + $scope.user.pass);
                $http.defaults.headers.common.Authorization = "Basic " + userData;
                var promise = $http({
                    method: "post",
                    url: BillingConfig.source + "login",
                    data: {
                        "apiKey": BillingConfig.apiKey,
                        "signature": BillingConfig.signature,
                        "remember": $scope.user.remember
                    }
                });
                promise.then(
                    function (response) {
                        credentials = response.data;
                        if ($scope.user.remember) {
                            var expireDate = (new Date());
                            expireDate.setDate(expireDate.getDate() + 30);
                            localStorageService.set('MistralBilling', credentials.remember, { 'expired': expireDate });
                        }
                        $rootScope.currentUser = credentials.currentUser.name;
                        currentUser=$rootScope.currentUser.split(" ");
                        $rootScope.userImgName=currentUser[0];
                        $location.path(redirectTo);
                    },
                    function (reason) {
                        console.log("Test user failed to log in: ");
                        credentials.currentUser.id = 0;
                        $location.path("/login");
                    });
            };
        }
    ]);

    application.controller("LogoutCtrl", ['$http', 'localStorageService', '$location', function ($http, localStorageService, $location) {

        var request = $http({
            method: "get",
            url: BillingConfig.source + "logout",
            async: false
        });


        request.then(
            function (response) {
                localStorageService.clearAll("MistralBilling");
                //  $location.path( "/login" );
                window.location.reload();

                return true;
            },
            function (reason) {
                return false;
            });
    }]);
}());