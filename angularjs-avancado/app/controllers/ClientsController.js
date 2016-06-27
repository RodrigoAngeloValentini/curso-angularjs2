module.exports = function($scope,$http,$filter,clientAPIService,configValue,bonusGenerator,routeInfo){

    $scope.name = $filter('uppercase')(configValue.appName);
    //$scope.day = new Date();
    //$scope.total = 27.35;
    $scope.msg = "";
    $scope.clients = [];
    $scope.page = routeInfo.routeName;
    $scope.navClass = routeInfo.navClass;

    $scope.bonus = 'BCod.Bonus: '+ bonusGenerator.generator();

    var listClients = function(){
        clientAPIService.getClients().success(function(data,status){
            $scope.clients = data;
            //console.log(data);
            //console.log(status);
        });
    };

    var addClients = function(client){
        clientAPIService.saveClients(client).success(function(data,status){
            console.log(data);
            //console.log(status);
            listClients();
        });
    };
    var destroyClients = function(client){
        client.delete = true;
        clientAPIService.saveClients(client).success(function(data,status){


        });
    };

    listClients();

    $scope.add = function(client){
        //$scope.clients.push(angular.copy(client));
        addClients(angular.copy(client));
        $scope.formClient.$setPristine();
        delete $scope.client;
        $scope.msg = "Adicionado com successo";

    };
    $scope.edit = function(client){
        $scope.client = client;
        $scope.editing =true;
        $scope.msg = "";
    };
    $scope.save = function(){
        //client = angular.copy($scope.client);
        addClients(angular.copy($scope.client));
        $scope.formClient.$setPristine();
        delete $scope.client;
        $scope.editing =false;
        $scope.msg = "Editado com successo";
    };
    $scope.destroy = function (client){
        $scope.clients.splice($scope.clients.indexOf(client),1);
        destroyClients(client);
        $scope.msg = "Deletado com successo";
    };
    $scope.orderBy = function(col){
        $scope.order = col;
        $scope.reverse = !$scope.reverse;
    };
};