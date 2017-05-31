(function () {

    application.controller("AgentsCtrl", ['$scope', '$anchorScroll', 'DataService', 'HelperService', function ($scope, $anchorScroll, DataService, HelperService) {
        $scope.modalShown = false;
        $scope.currentPage = 1;
        $scope.sort = "+name";
        $scope.selector = "";
        
        listAgents();
        $scope.selected = {};

        $scope.edit = function (currentAgent) {
            $scope.agent = currentAgent;
           
            $scope.modalShown = true;
            $scope.selected.townName = "";
            document.getElementById('townsel').style.visibility = 'hidden';
  
        };

        $scope.save = function () {
            if ($scope.agent.id == 0 && (DataService.isCurrentUserAdmin()))
                DataService.insert("agents", $scope.agent, function (data) { listAgents(); $scope.modalShown = false; });

            else if ((DataService.isCurrentUserAdmin()) || ($scope.agent.id == credentials.currentUser.id))
                DataService.update("agents", $scope.agent.id, $scope.agent, function (data) {listAgents(); $scope.modalShown = false; });
        };

        $scope.delete = function (agentId) {
            if (DataService.isCurrentUserAdmin()) {
                DataService.delete("agents", agentId, function (data) { listAgents(); $scope.modalShown = false; });
            }
        };


        $scope.new = function () {
            $scope.agent = {
                id: 0,
                name: ""
            };
            document.getElementById('townsel').style.visibility = 'hidden';
            $scope.modalShown = true;
            $scope.selected.townName = "";
            
           
        };

          function listAgents() {
        
           $scope.modalShown = false;
            var getPageNumber;
            if($scope.currentPage>0) {getPageNumber=$scope.currentPage-1;};
            var dataSet = "agents/paginate?currentPage=" +getPageNumber +"&perPage=" +10+ "&sort=" + $scope.sort;
            if ($scope.selector != "") dataSet += "&search=" + $scope.selector + "&findBy="+ $scope.srchFilter;
            console.log(dataSet);
            DataService.list(dataSet, function(data){
                $scope.agents = data.agentsList;
                $scope.totalPages = data.totalPages;
                $scope.totalItems = data.totalItems;
                $scope.currentPage = data.currentPage+1;
            });
           


        }


        $scope.refresh = function () {
            listAgents();
            
        };
        
       $scope.pageChanged = function(){
            listAgents();
        };

        $scope.sortChanged = function(){
            listAgents();
        };

         $scope.searchChanged = function(keyEvent){
            if(keyEvent.which == 13) listAgents();
        };
    
        $scope.searchChanged = function(){
            if($scope.selector.length>=2 || $scope.selector=="") listAgents();
        };

 

  


        $scope.textUp = function (keyEvent) {            
            if (keyEvent.key == "ArrowDown") document.getElementById('townsel').focus();
        };


        $scope.addTown = function (keyEvent) {
            if ((keyEvent.key == "Enter") || (keyEvent.type === 'click')) {
                for (var i = 0; i < $scope.towns.length; i++) {
                    if ($scope.towns[i].id === $scope.selected.townId) {
                        for (var j = 0; j < $scope.agent.towns.length; j++) {
                            if ($scope.towns[i].id == $scope.agent.towns[j].id) {
                                document.getElementById('townsel').style.visibility = 'hidden';
                                $scope.selected.townName = '';
                                return;
                            }
                        }
                        $scope.selected.townName = $scope.towns[i].name;
                        $scope.agent.towns.push($scope.towns[i]);
                        document.getElementById('townsel').style.visibility = 'hidden';
                        $scope.selected.townName = '';
                        break;
                    }
                }
                selectedTowns = [];
                for (var i = 0; i < $scope.agent.towns.length; i++) {
                    currentTownPrep = {
                        "id": $scope.agent.towns[i].id,
                        "zip": $scope.agent.towns[i].zip,
                        "name": $scope.agent.towns[i].name,
                        "region": $scope.agent.towns[i].region,
                        "regionId": $scope.agent.towns[i].regionId
                    };
                    selectedTowns.push(currentTownPrep);
                }
                $scope.agent.towns = selectedTowns;
            }
        };

        $scope.removeTown = function (town) {
            for (var i = 0; i < $scope.agent.towns.length; i++) {
                if ($scope.agent.towns[i].id == town.id) {
                    $scope.agent.towns.splice(i, 1);
                }

            }
        };


        $scope.autocomplete = function (autoStr) {
            console.log("ss " + $scope.towns);
            if (autoStr.length >= 3) {
                $scope.towns = '';
                HelperService.getTowns(autoStr, function (data) {                    
                    $scope.towns = data;
                });
                document.getElementById('townsel').style.visibility = 'visible';
                document.getElementById('townsel').style.width = '100%';
                document.getElementById('townsel').size = 8;
            }
            else {
                document.getElementById('townsel').style.visibility = 'hidden';
            }
        };

    }]);
}());