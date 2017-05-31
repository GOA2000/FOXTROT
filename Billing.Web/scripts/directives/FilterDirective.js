(function() {
    application.directive('navFilter', [function () {
        return {
            restrict: 'EA',
            scope: '=',
            templateUrl: 'views/filter.html',
            link: function (scope, elem, attr) {
                if (attr.filterOn) scope.filter = true;
                if (attr.pagingOn) scope.pagination = true;
                if (attr.sortType) {
                    scope.sorter = attr.sortType.split(';');
                    opt = Array();
                    for(var i=0; i<scope.sorter.length; i++){
                        sortOpt = scope.sorter[i].split('|');
                        opt.push({ key: sortOpt[0], value: sortOpt[1]});
                    }
                    scope.sorter = opt;
                    scope.sort = opt[0].key;
                }

                if (attr.srchType) {
                    scope.srchParam = attr.srchType.split(';');
                    srch = Array();
                    for(var i=0; i<scope.srchParam.length; i++){
                        srchOpt = scope.srchParam[i].split('|');
                        srch.push({ key: srchOpt[0], value: srchOpt[1]});
                    }
                    scope.srchParam = srch;
                    scope.srchFilter = srch[0].key;
                }
            }
        };
    }]);
}());

