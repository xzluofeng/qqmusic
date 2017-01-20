/**
 * Created by Administrator on 2016/12/19.
 */
(function(angular){
    var app = angular.module("myService",[]);
    app.service("load",["$http",function($http){
        this.getData = function(url, params, callback) {
            $http.get(url, {
                params: params
            }).success(function(data) {
                if (data) {
                    callback(data.showapi_res_body);
                }
            })
        };
    }]);
})(angular);
