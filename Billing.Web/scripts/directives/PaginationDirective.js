(function() {
    application.directive('navPagination', [function () {
        return {
            restrict: 'EA',
            scope: '=',
            templateUrl: 'views/pagination.html',
            link: function (scope, elem, attr) {

            }
        };
    }]);
}());

