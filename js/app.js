/**
 * Created by Administrator on 2016/12/19.
 */

var app = angular.module('myApp',['ionic','Controller','myService']);
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
    $stateProvider.state('main',{
        url:'/qq',
        templateUrl:'view/main.html',
        abstract: true
    }).state('main.recommend',{
        url:'/recommend',
        views:{
            "recommend":{
                templateUrl:"view/recommend.html",
                controller:"recommendCtrl"
            }
        }
    }).state('main.toplist',{
        url:'/toplist',
        views:{
            "toplist":{
                templateUrl:"view/toplist.html",
                controller:"toplistCtrl"
            }
        }
    }).state('main.search',{
        url:'/search',
        views:{
            "search":{
                templateUrl:"view/search.html",
                controller:"searchCtrl"
            }
        }
    }).state('music',{
        url:'/music/:id',
        templateUrl:'view/music.html',
        controller:'musicCtrl'
    }).state('list',{
        url:'/list/:id',
        templateUrl:'view/list.html',
        controller:'listCtrl'
    });
    $urlRouterProvider.otherwise('/qq/recommend');
}]);