(function() {
 application.factory('HelperService', ['$rootScope','DataService', function($rootScope,DataService){
    return {

        getTowns: function(name,callback) {DataService.list("towns/"+name, function (data) {            
                   return callback(data);
        })},

        getAgents: function(callback) {DataService.list("agents/", function (data) {
                   return callback(data);
        })}
    }
 
 }]);

}());