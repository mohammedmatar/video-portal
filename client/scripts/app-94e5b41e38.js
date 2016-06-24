/******/!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}// webpackBootstrap
/******/
var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var o=n(1),r=n(2),a=n(3),i=n(4),s=n(5),c=n(6),l=n(7),u=n(8),d=n(9),p=n(10),h=n(11),v=n(12),g=n(13);angular.module("app",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","restangular","ui.router","toastr","angular-md5","ngStorage","infinite-scroll","com.2fdevs.videogular","com.2fdevs.videogular.plugins.controls","com.2fdevs.videogular.plugins.buffering","com.2fdevs.videogular.plugins.overlayplay"]).config(o.config).config(r.routerConfig).run(a.runBlock).service("ToastService",h.ToastService).service("AuthService",v.AuthService).service("VideoListFeatcher",g.VideoListFeatcher).controller("LoginController",i.LoginController).controller("DashboardController",s.DashboardController).controller("VideoPlayerController",c.VideoPlayerController).component("headerSection",{templateUrl:"./app/components/header/header.component.html",controller:l.HeaderComponentController,controllerAs:"$ctrl"}).component("dashboardListVideo",{templateUrl:"./app/components/dashboard-list-video/dashboard-list-video.component.html",controller:u.DashboardListVideoController}).component("rating",{templateUrl:"../app/components/rating/rating.component.html",controller:p.RatingComponentController,bindings:{ratings:"="}}).component("ratePicker",{templateUrl:"../app/components/ratepicker/ratepicker.component.html",controller:d.RatePickerController,controllerAs:"vm",bindings:{videoId:"="}})},function(e,t){"use strict";function n(e,t){"ngInject";e.debugEnabled(!0),t.allowHtml=!0,t.timeOut=3e3,t.positionClass="toast-top-right",t.preventDuplicates=!0,t.progressBar=!0}n.$inject=["$logProvider","toastrConfig"],Object.defineProperty(t,"__esModule",{value:!0}),t.config=n},function(e,t){"use strict";function n(e,t){"ngInject";var n=function(e){return"app/pages/"+e+"/"+e+".page.html"};e.state("login",{url:"/login",templateUrl:n("login"),controller:"LoginController",controllerAs:"vm",resolve:{skipIfAuthenticated:o}}).state("dashboard",{url:"/",templateUrl:n("dashboard"),controller:"DashboardController",controllerAs:"vm",resolve:{redirectIfNotAuthenticated:r}}).state("play",{url:"/play/:sessionId/:videoId",templateUrl:n("video_player"),controller:"VideoPlayerController",controllerAs:"vm",resolve:{redirectIfNotAuthenticated:r}}),t.otherwise("/")}function o(e,t,n){var o=e.defer();return n.isLogin()?o.reject():o.resolve(),o.promise}function r(e,t,n,o){var r=e.defer();return n.isLogin()?r.resolve():(o(function(){t.go("login")}),r.reject()),r.promise}n.$inject=["$stateProvider","$urlRouterProvider"],o.$inject=["$q","$state","AuthService"],r.$inject=["$q","$state","AuthService","$timeout"],Object.defineProperty(t,"__esModule",{value:!0}),t.routerConfig=n},function(e,t){"use strict";function n(e){"ngInject";e.debug("runBlock end")}n.$inject=["$log"],Object.defineProperty(t,"__esModule",{value:!0}),t.runBlock=n},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();t.LoginController=function(){function e(t,o,r,a){"ngInject";n(this,e),this.AuthService=t,this.ToastService=o,this.$sessionStorage=r,this.$state=a}return e.$inject=["AuthService","ToastService","$sessionStorage","$state"],o(e,[{key:"$onInit",value:function(){this.username="",this.password=""}},{key:"login",value:function(){var e=this,t={username:this.username,password:this.password},n=this.AuthService.authenticate(t);n.then(function(t){"error"===t.data.status?e.ToastService.error("500","sorry server error"):"success"===t.data.status&&(e.$sessionStorage.currentUser={sessionId:t.data.sessionId,username:t.data.username},e.ToastService.success("Welcome you ",t.data.username),e.$state.go("dashboard"))}),this.username="",this.password=""}}]),e}()},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});t.DashboardController=function o(){"ngInject";n(this,o)}},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();t.VideoPlayerController=function(){function e(t,o,r,a,i){"ngInject";var s=this;n(this,e),this.$http=o,this.VideoListFeatcher=t,this.$stateParams=r,this.$sce=a,this.$location=i,this.$http({url:"http://localhost:3000/video",method:"GET",params:{sessionId:this.$stateParams.sessionId,videoId:this.$stateParams.videoId}}).then(function(e){s.url="http://"+s.$location.host()+":3000/"+e.data.data.url,s.desc=e.data.data.description,s.name=e.data.data.name,s._id=e.data.data._id,s.ratings=e.data.data.ratings})}return e.$inject=["VideoListFeatcher","$http","$stateParams","$sce","$location"],o(e,[{key:"$onInit",value:function(){}},{key:"getVideoUrl",value:function(e){this.VideoListFeatcher.resolveAsTrustedUrl(e)}}]),e}()},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();t.HeaderComponentController=function(){function e(t,o,r){"ngInject";n(this,e),this.AuthService=t,this.$state=o,this.$window=r,this.showMenu=!1}return e.$inject=["AuthService","$state","$window"],o(e,[{key:"logout",value:function(){this.AuthService.logout()}},{key:"goToState",value:function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0];this.$state.go(e)}},{key:"goToWebsite",value:function(e){this.$window.open(e,"_blank")}}]),e}()},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();t.DashboardListVideoController=function(){function e(t,o,r){"ngInject";n(this,e),this.VideoListFeatcher=t,this.loaderBusy=!0,this.sessionId=o.currentUser.sessionId,this.$window=r,this.videoList=[]}return e.$inject=["VideoListFeatcher","$sessionStorage","$window"],o(e,[{key:"$onInit",value:function(){var e=this;this.VideoListFeatcher.getList().then(function(t){e.videoList=t.data,e.loaderBusy=!1})}},{key:"updateVideoList",value:function(){var e=this;this.loaderBusy=!0,this.VideoListFeatcher.getList(10,this.videoList.length).then(function(t){e.videoList.push.apply(e.videoList,t.data),e.loaderBusy=!1})}},{key:"getUrl",value:function(e){return this.VideoListFeatcher.resolveAsTrustedUrl(e)}}]),e}()},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();t.RatePickerController=function(){function e(t,o,r){"ngInject";n(this,e),this.$http=t,this.$sessionStorage=o,this.ToastService=r}return e.$inject=["$http","$sessionStorage","ToastService"],o(e,[{key:"postClientRate",value:function(e){var t=this;this.rate=e,this.$http({url:"http://localhost:3000/ratings?sessionId="+this.$sessionStorage.currentUser.sessionId,method:"POST",data:{rating:e,videoId:this.videoId}}).then(function(e){"success"===e.data.status?t.ToastService.success("Done !","Thank you For Rating ."):t.ToastService.success("OOPS *__* ","there is an error try later, please !")})}}]),e}()},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();t.RatingComponentController=function(){function e(){"ngInject";n(this,e)}return o(e,[{key:"getRank",value:function(){var e=arguments.length<=0||void 0===arguments[0]?[]:arguments[0],t=50;if(e.length>0){for(var n=e.reduce(function(e,t){return e+t}),o=((t-(n+10))/5^(t-(n+10))/5>>31)-((t-(n+10))/5>>31),r=[],a=[],i=1;o>=i;i++)r.push(0);for(var s=1;s<=5-r.length;s++)a.push(1);return a.concat(r)}return-1}}]),e}()},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();t.ToastService=function(){function e(t){"ngInject";n(this,e),this.toastr=t}return e.$inject=["toastr"],o(e,[{key:"success",value:function(e,t){this.toastr.success(t,e)}},{key:"info",value:function(e,t){this.toastr.info(t,e)}},{key:"error",value:function(e,t){this.toastr.error(t,e)}}]),e}()},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),r=(t.AuthService=function(){function e(t,o,r,a,i){"ngInject";n(this,e),this.$log=t,this.md5=o,this.$http=r,this.$sessionStorage=a,this.$state=i}return e.$inject=["$log","md5","$http","$sessionStorage","$state"],o(e,[{key:"authenticate",value:function(e){return e.password=r(e.password,this.md5),this.$http.post("http://localhost:3000/user/auth",e).then(function(e){return e},function(e){return{code:500,error:e}})}},{key:"isLogin",value:function(){try{return null!==this.$sessionStorage.currentUser.sessionId?!0:!1}catch(e){return!1}}},{key:"logout",value:function(){this.$sessionStorage.currentUser=null,this.$state.go("login")}}]),e}(),function(e,t){return t.createHash(e||"")})},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();t.VideoListFeatcher=function(){function e(t,o,r,a,i,s){"ngInject";n(this,e),this.$q=t,this.$http=o,this.$sessionStorage=r,this.$sce=a,this.$location=i,this.$log=s}return e.$inject=["$q","$http","$sessionStorage","$sce","$location","$log"],o(e,[{key:"getList",value:function(){var e=this,t=arguments.length<=0||void 0===arguments[0]?10:arguments[0],n=arguments.length<=1||void 0===arguments[1]?0:arguments[1];return this.$http({url:"http://localhost:3000/videos",method:"GET",params:{sessionId:this.$sessionStorage.currentUser.sessionId,limit:t,skip:n}}).then(function(e){return e.data},function(t){return e.$q.reject(t.data)})}},{key:"resolveAsTrustedUrl",value:function(e){return this.$sce.trustAsResourceUrl(this.$location.host()+":"+this.$location.port()+"/"+e)}}]),e}()}]),angular.module("app").run(["$templateCache",function(e){e.put("app/main/main.html","<!--\nCreated by mohammed on 6/23/16.\n\n--><div>mola mola moka</div>"),e.put("app/components/dashboard-list-video/dashboard-list-video.component.html",'<div infinite-scroll=$ctrl.updateVideoList() infinite-scroll-disabled=$ctrl.loaderBusy class=grid-items><a when-visible=animateElementIn ng-repeat="video in $ctrl.videoList" ui-sref="play({ sessionId: $ctrl.sessionId, videoId: video._id})" class=grid-item><h1>{{ video.name }}</h1><!--videogular--><!--  vg-media(vg-src="$ctrl.getUrl(video.url)")--><rating ratings=video.ratings></rating><span class="player icon ion-arrow-right-b"></span></a></div>'),e.put("app/components/header/header.component.html",'<section class=navbar><header ng-click="$ctrl.goToState(\'dashboard\')" class="noselect title">Crossover Video Portal</header><span ng-click="$ctrl.showMenu = !$ctrl.showMenu" class="noselect icon ion-navicon-round"></span></section><div ng-show="$ctrl.showMenu === true" ng-click="$ctrl.showMenu = false" class=awesome-menu><span ng-click="$ctrl.goToState(\'dashboard\')" class="noselect icon ion-reply"></span><span ng-click=$ctrl.logout() class="noselect icon ion-power"></span><span ng-click="$ctrl.goToWebsite(\'https://github.com/mohammedmatar/\')" class="noselect icon ion-social-octocat"></span><span ng-click="$ctrl.goToWebsite(\'https://www.linkedin.com/in/jmatar\')" class="noselect icon ion-social-linkedin"></span><!--span(class="icon ion-power", ng-click="$ctrl.logout()")--></div><!--header(class="main-header")--> <!--  | main header-->'),e.put("app/components/login-form/login-form.component.html",""),e.put("app/components/ratepicker/ratepicker.component.html","<div class=rate-me><span ng-class=\"(vm.rate &gt;= 1)?'you-rated-me':''\" ng-click=vm.postClientRate(1) class=\"icon ion-heart\"></span><span ng-class=\"(vm.rate &gt;= 2)?'you-rated-me':''\" ng-click=vm.postClientRate(2) class=\"icon ion-heart\"></span><span ng-class=\"(vm.rate &gt;= 3)?'you-rated-me':''\" ng-click=vm.postClientRate(3) class=\"icon ion-heart\"></span><span ng-class=\"(vm.rate &gt;= 4)?'you-rated-me':''\" ng-click=vm.postClientRate(4) class=\"icon ion-heart\"></span><span ng-class=\"(vm.rate &gt;= 5)?'you-rated-me':''\" ng-click=vm.postClientRate(5) class=\"icon ion-heart\"></span></div>"),e.put("app/components/rating/rating.component.html",'<div class=rating><span ng-repeat="showStar in $ctrl.getRank($ctrl.ratings) track by $index" ng-class="( showStar === 1 )?\'show-star\':\'\' " class="icon ion-heart"></span></div>'),e.put("app/pages/dashboard/dashboard.page.html","<!--Created by mohammed on 6/23/16.\n--><header-section></header-section><dashboard-list-video></dashboard-list-video>"),e.put("app/pages/login/login.page.html",'<!--Created by mohammed on 6/23/16.\n--><div class=login-warpper><div class=login-page><section class=login-header><header class="noselect title">Crossover Video Portal</header></section><form ng-submit=vm.login()><div class=input-container><label><span ng-class="activeInput === \'username\'" class="icon ion-person"></span></label><input type=text placeholder=Username ng-focus="activeInput = \'username\'" ng-model=vm.username autofocus></div><div class=input-container><label><span ng-class="activeInput === \'password\'" class="icon ion-locked"></span></label><input type=password placeholder=Password ng-focus="activeInput = \'password\'" ng-model=vm.password></div><input type=submit value=Login></form></div></div>'),e.put("app/pages/video-player/video-player.page.html","<header-section></header-section><div>mola</div>"),e.put("app/pages/video-player/videoplayer.page.html","<header-section></header-section><div>mola</div>"),e.put("app/pages/video_player/video_player.page.html","<!--br--><!--br--><!--br--><header-section></header-section><div class=video-player><h1>{{vm.name}}</h1><div class=videogular-container><videogular vg-theme=\"'http://www.videogular.com/styles/themes/default/latest/videogular.css'\"><vg-media vg-src=vm.url vg-native-controls=false></vg-media><vg-controls><vg-play-pause-button></vg-play-pause-button><vg-time-display>{{ currentTime | date:'mm:ss' }}</vg-time-display><vg-scrub-bar><vg-scrub-bar-current-time></vg-scrub-bar-current-time></vg-scrub-bar><vg-time-display>{{ timeLeft | date:'mm:ss' }}</vg-time-display><vg-volume><vg-mute-button></vg-mute-button><vg-volume-bar></vg-volume-bar></vg-volume><vg-fullscreen-button></vg-fullscreen-button></vg-controls><vg-buffering></vg-buffering><vg-overlay-play></vg-overlay-play></videogular></div><rate-picker video-id=vm._id></rate-picker><p>{{vm.desc | limitTo: 250}}</p></div>")}]);
//# sourceMappingURL=../maps/scripts/app-94e5b41e38.js.map
