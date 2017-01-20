/**
 * Created by Administrator on 2016/12/19.
 */
var Controller = angular.module("Controller",[]);
Controller.controller('recommendCtrl',['$scope',function($scope){

}]);
Controller.controller('toplistCtrl',['$scope','load','$http',function($scope,load,$http){
    // $scope.dataId='5';
    // console.log(dataId);
    $scope.subject3 = [];
    $scope.subject5 = [];
    $scope.subject6 = [];
    $scope.subject6 = [];
    var params = {
        "showapi_appid": 28448,
        "showapi_sign": "d2bb72ad5dd1485189aba0790c38f59c",
        "topid": 5
    }
    if(sessionStorage.getItem("top5")){
        $scope.subject5 = JSON.parse(sessionStorage.getItem("top5"))
    }else{
        load.getData('http://route.showapi.com/213-4',params,function (data){
            $scope.subject5 = data;
            $scope.subject5.listid = "5";
            sessionStorage.setItem('top5',JSON.stringify($scope.subject5));
        });
    };
    var params1 = {
        "showapi_appid": 28448,
        "showapi_sign": "d2bb72ad5dd1485189aba0790c38f59c",
        "topid": 3
    }
    if(sessionStorage.getItem("top3")){
        $scope.subject3 = JSON.parse(sessionStorage.getItem("top3"))
    }else{
        load.getData('http://route.showapi.com/213-4',params1,function (data){
            $scope.subject3 = data;
            $scope.subject3.listid = "3";
            sessionStorage.setItem('top3',JSON.stringify($scope.subject3));
        });
    };
    var params2 = {
        "showapi_appid": 28448,
        "showapi_sign": "d2bb72ad5dd1485189aba0790c38f59c",
        "topid": 6
    }
    if(sessionStorage.getItem("top6")){
        $scope.subject6 = JSON.parse(sessionStorage.getItem("top6"))
    }else{
        load.getData('http://route.showapi.com/213-4',params2,function (data){
            $scope.subject6 = data;
            $scope.subject6.listid = "6";
            sessionStorage.setItem('top6',JSON.stringify($scope.subject6));
        });
    };
    var params3 = {
        "showapi_appid": 28448,
        "showapi_sign": "d2bb72ad5dd1485189aba0790c38f59c",
        "topid": 26
    }
    if(sessionStorage.getItem("top26")){
        $scope.subject26 = JSON.parse(sessionStorage.getItem("top26"))
    }else{
        load.getData('http://route.showapi.com/213-4',params3,function (data){
            $scope.subject6 = data;
            $scope.subject6.listid = "26";
            sessionStorage.setItem('top26',JSON.stringify($scope.subject6));
        });
    };


    // var arr = [3,5,6,16,17,26];
    // console.log(arr);
    // for(var i = 0;i<arr.length;i++){
    //     console.log(typeof (arr[i]+''));
    //     var str = 'list'+arr[i];
    //     console.log(str);
    //     $scope.str=[];
    //     var params = {
    //         "showapi_appid": 28448,
    //         "showapi_sign": "d2bb72ad5dd1485189aba0790c38f59c",
    //         "topid": arr[i]+''
    //     };
    //     load.getData('http://route.showapi.com/213-4',params,function (data){
    //         console.log(data);
    //         $scope.str = data;
    //     });
    // };
    // console.log($scope.list3);
}]);
Controller.controller('searchCtrl',['$scope','$http','load',function($scope,$http,load){
    var $ = angular.element;
    var dom = document.getElementById("search");
    $scope.subject=[];
    // $(dom).on('blur',function(){
    //     console.log($(dom).val());
    //     search($(dom).val());
    // });
    $scope.searchList = function(){
        search($(dom).val());
    };
    function search(str){
        var params = {
            "showapi_appid": 28448,
            "showapi_sign": "d2bb72ad5dd1485189aba0790c38f59c",
            "keyword": str
        }
        load.getData('http://route.showapi.com/213-1',params,function (data){
            console.log(data);
            $scope.subject = data.pagebean.contentlist;
            console.log($scope.subject);
        });
    };
    //清除输入
    $scope.clear = function(){
        $scope.subject=[];
        // $(dom).val('');
    };
    //存入sessionStorage给音乐播放界面
    $scope.tomic = function(obj){
        obj.url = obj.m4a;
        sessionStorage.setItem('music',JSON.stringify(obj));
    };
}]);
Controller.controller('musicCtrl',['$scope','$stateParams','load',function($scope,$stateParams,load){
    $scope.subjects = [];
    var params = {
        "showapi_appid": 28448,
        "showapi_sign": "d2bb72ad5dd1485189aba0790c38f59c",
        "musicid": $stateParams.id
    }
    load.getData('http://route.showapi.com/213-2', params, function(data) {
        $scope.subjects = data;
        // console.log(data.lyric);
        // $scope.goBack = function(){
        //     history.back();
        // };
        var str = reconvert(data.lyric);
        $scope.lrc = parseLyric(str);

        var $player = $("#player");
        var lyric_wrap = $(".lyric_wrap");
        var lyric = lyric_wrap.find("#lyric");
        playNow($scope.lrc);
        $player.on("playing",function(){

        });



    });

    //解码>>中文
    function reconvert(str){
        str = str.replace(/(\\u)(\w{1,4})/gi,function($0){
            return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g,"$2")),16)));
        });
        str = str.replace(/(&#x)(\w{1,4});/gi,function($0){
            return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g,"$2"),16));
        });
        str = str.replace(/(&#)(\d{1,6});/gi,function($0){
            return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g,"$2")));
        });
        return str;
    };
    //解析歌词的方法
    function parseLyric(lrc) {
        var lyrics = lrc.split("\n");
        var lrcObj = {};
        for(var i=0;i<lyrics.length;i++){
            var lyric = decodeURIComponent(lyrics[i]);
            var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
            var timeRegExpArr = lyric.match(timeReg);
            if(!timeRegExpArr)continue;
            var clause = lyric.replace(timeReg,'');

            for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
                var t = timeRegExpArr[k];
                var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                    sec = Number(String(t.match(/\:\d*/i)).slice(1));
                var time = min * 60 + sec;
                lrcObj[time] = clause;
            }
        }
        return lrcObj;
    };

    //歌词进度
    function playNow(lrc){
        var play = document.getElementById('player');
        play.ontimeupdate = function(){
            var currentTime = Math.round(this.currentTime);
            var index = lrc[currentTime];
            for (var i in lrc) {
                if(i == currentTime){
                    $('.i'+i).addClass('active1').siblings().removeClass('active1');
                    var top = $('.i' + i)[0].offsetTop;
                    $('#lyric').animate({"top":-top+150},300);
                };
            };

        };
    };


    //获取src地址
    $scope.detail = JSON.parse(sessionStorage.getItem('music'));
    console.log($scope.detail);
    document.getElementById('play').src = $scope.detail.url;
    $(".lyric_wrap").css({"background-image":$scope.detail.albumpic_big})
}]);

Controller.controller('listCtrl',['$scope','$stateParams','load',function($scope,$stateParams,load){
    $scope.subjects = [];
    var params = {
        "showapi_appid": 28448,
        "showapi_sign": "d2bb72ad5dd1485189aba0790c38f59c",
        "topid": $stateParams.id
    }
    load.getData('http://route.showapi.com/213-4', params, function(data) {
        $scope.subjects = data;
        // $scope.goBack = function(){
        //     history.back();
        // };
    });
    //存入sessionStorage给音乐播放界面
    $scope.tomic = function(obj){
        sessionStorage.setItem('music',JSON.stringify(obj));
    };
}]);
