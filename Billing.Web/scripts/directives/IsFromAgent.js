(function() {
    application.directive("isFromAgent", [function() {
        return {
            priority: 10,
            restrict: 'A',
            scope: { param: '@'},
            link: function(scope, $element, attrs) {
             var agentId=scope.param;
             agentId= parseInt(agentId,10)
                 if (agentId===credentials.currentUser.id)
                {
                      $element.css({'display':'inline'})
                }
            }
        };
    }]);
}());