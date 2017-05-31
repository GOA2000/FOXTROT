(function() {
    application.directive("adminView", [function() {
        return {
            priority: 1,
            restrict: 'A',
            link: function($scope, $element, attrs) {
                var isUserAdmin = false;
                var currentRoles = credentials.currentUser.roles;
                for (var i = 0, len = currentRoles.length - 1; i <= len; i++) {

                    if (currentRoles[i] === 'admin') {
                        isUserAdmin = currentRoles[i];
                        break;
                    }
                }
                if (!isUserAdmin) {
                    $element.css({
                        'display': 'none'
                    });
                }
            }
        };
    }]);
}());