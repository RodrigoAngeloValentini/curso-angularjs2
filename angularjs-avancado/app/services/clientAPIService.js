module.exports = function($http,configValue){

    var _getClients = function(){
      return $http.get(configValue.apiURL);
    };
    var _saveClients = function(client){
        return $http.post(configValue.apiURL);
    };

    var _getClient = function(id){
        return $http.get(configValue.apiURL+'?id='+id);
    };

    return {
        getClients:_getClients,
        getClient:_getClient,
        saveClients:_saveClients
    };
};