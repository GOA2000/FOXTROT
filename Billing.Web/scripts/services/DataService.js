(function () {

    var DataService = function ($http, $rootScope) {
        var source = BillingConfig.source;
        $http.defaults.headers.common.Token = credentials.token;
        $http.defaults.headers.common.ApiKey = BillingConfig.apiKey;

        return {
            promise: function (dataSet) {
                return $http.get(source + dataSet);
            },

            next: function (dataSet, callback) {
               $http.get(source + dataSet)
                    .success(function (data, status, headers) {
                        $rootScope.message = "";
                        return callback(data);
                    })
                    .error(function (error) {
                        return callback(false);
                    });
            },


            list: function (dataSet, callback) {
                $rootScope.message = "Please wait...";
                $http.get(source + dataSet)
                    .success(function (data, status, headers) {
                        $rootScope.message = "";
                        return callback(data);
                    })
                    .error(function (error) {
                        return callback(false);
                    });
            },

            read: function (dataSet, id, callback) {
                $http.get(source + dataSet + "/" + id)
                    .success(function (data) {
                        return callback(data);
                    })
                    .error(function (error) {
                        swal(
                            'Oops...',
                            'Something went wrong!',
                            'error'
                        )
                        return callback(false);
                    });
            },

            insert: function (dataSet, data, callback) {
                $http({ method: "post", url: source + dataSet, data: data })
                    .success(function (data) {
                        return callback(data);
                    })
                    .error(function (error) {
                        swal(
                            'Oops...',
                            'Something went wrong!',
                            'error'
                        )
                        $scope.showCustomer = false;
                        return callback(false);
                    });
            },
            update: function (dataSet, id, data, callback) {
                swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this data!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, update it!",
                    cancelButtonText: "No, cancel!",
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            $http({ method: "put", url: source + dataSet + "/" + id, data: data })
                                .success(function (data) {
                                  //  swal("Updated!", "Your data has been updated.", "success");
                                    return callback(data);
                                })
                                .error(function (error) {
                                    swal("Error!", "Something went wrong.", "error");
                                    return callback(false);
                                });
                        }
                        else {
                            swal("Cancelled", "Your data is safe.", "error");
                        }
                    });

            },

            delete: function (dataSet, id, callback) {
                swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this data!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel!",
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            $http({ method: "delete", url: source + dataSet + "/" + id })
                                .success(function () {
                                    //swal("Deleted!", "Your data has been deleted.", "success");
                                    return callback(true);
                                })
                                .error(function (error) {
                                    swal("Error!", "Something went wrong", "error");
                                    return callback(false);
                                });
                        }
                        else {
                            swal("Cancelled", "Your data is safe.", "error");
                        }
                    });

            },
            isCurrentUserAdmin: function () {
                var isUserAdmin = false;
                var currentRoles = credentials.currentUser.roles;
                for (var i = 0, len = currentRoles.length - 1; i <= len; i++) {
                    if (currentRoles[i] === 'admin') {
                        return true;
                    }
                }
                return isUserAdmin;
            }
        };
    };

    application.factory("DataService", DataService);

}());