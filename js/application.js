var app = angular.module('Igu.Shuttle', [
    'ngAnimate',
    'ui.tree',
    'checklist-model',
    'datatables',
    'mgcrea.ngStrap', //TODO: verificar e inserir apenas pacotes usados
    'ui.utils.masks',
    'frapontillo.bootstrap-switch',
    'ngBootbox',
    'angucomplete-alt',
    'ngSanitize',
    'SafeApply',
    'flow',
    'angularMoment',
    'ngMask',
    'LocalStorageModule',
    'minicolors',
    'cfp.hotkeys',
    'ckeditor',
    'jkuri.slimscroll',
    'infinite-scroll',
    'naif.base64'
]);

//*------------ run ------------*//
app.run(function ($rootScope, $window, amMoment) {
    $rootScope.cultures = $window.cultures;
    amMoment.changeLocale('pt-br');
});


//*------------ config ------------*//
app.config(function ($controllerProvider, $tooltipProvider, $popoverProvider, $provide, $httpProvider,
    $modalProvider, $asideProvider, $datepickerProvider, $windowProvider, $collapseProvider, localStorageServiceProvider,
    hotkeysProvider) {

    hotkeysProvider.useNgRoute = false;
    hotkeysProvider.includeCheatSheet = false;

    app.controllerProvider = $controllerProvider;
    app.serviceProvider = $provide.service;
    //$httpProvider.interceptors.push('authInterceptor');

    //mantem e sobreescreve metodo window.alert
    //window.baseAlert = $windowProvider.$get().alert;
    //$windowProvider.$get().alert = custom_alert;

    //mantem e sobreescreve metodo window.confirm
    window.baseConfirm = $windowProvider.$get().confirm;
    $windowProvider.$get().confirm = custom_confirm;

    //angular.extend($collapseProvider.defaults, {
    //    animation: 'am-flip-x'
    //});

    localStorageServiceProvider
    .setPrefix('Igu.Shuttle')

    angular.extend($modalProvider.defaults, {
        placement: 'top',
        animation: 'am-fade-and-slide-top',
        container: 'body',
        backdrop: 'static',
        keyboard: false
    });

    angular.extend($asideProvider.defaults, {
        placement: 'right',
        animation: 'am-fade-and-slide-right',
        backdrop: true
    });

    angular.extend($datepickerProvider.defaults, {
        autoclose: true,
        timezone: null,
        dateFormat: 'dd/MM/yyyy',
        modelDateFormat: "yyyy-MM-ddTHH:mm:ss",
        dateType: "string"
    });

    angular.extend($tooltipProvider.defaults, {
        html: true,
        animation: 'am-flip-x',
        container: 'body'
    });

    angular.extend($popoverProvider.defaults, {
        html: true,
        autoClose: true,
        animation: 'am-flip-x',
        placement: 'top',
        container: 'body'
    });
});
//app.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
//    GoogleMapApi.configure({
//        key: 'AIzaSyBdE6Xf8-fdHJ8Rz9Tl9RqyidLQdLAdXnM',
//        v: '3.17',
//        libraries: 'weather,geometry,visualization'
//    });
//}]);

app.config(['flowFactoryProvider', appConfig])
    .directive('appDownloadUrl', [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.bind('dragstart', function (event) {
                    var config = scope.$eval(attrs.appDownloadUrl);
                    if (!config.disabled) {
                        var data = config.mime + ':' + config.name + ':' + window.location.href + config.url;
                        event.dataTransfer.setData('DownloadURL', data);
                    }
                });
            }
        };
    }]).directive("appDragstart", [function () {
        return function (scope, element, attrs) {
            element.bind('dragstart', function (event) {
                scope.$eval(attrs.appDragstart);
            });
        }
    }]).directive("appDragend", [function () {
        return function (scope, element, attrs) {
            element.bind('dragend', function (event) {
                scope.$eval(attrs.appDragend);
            });
        }
    }]).run(function ($rootScope) {
        $rootScope.dropEnabled = true;
    });

function appConfig(flowFactoryProvider) {

    //var myCustomData = {
    //    requestVerificationToken: 'xsrf',
    //    blueElephant: '42'
    //};

    flowFactoryProvider.defaults = {
        target: String.format('{0}api/Imagem/Upload', BASEURL),
        permanentErrors: [404, 500, 501],
        maxChunkRetries: 1,
        chunkRetryInterval: 5000,
        simultaneousUploads: 4
        // query: myCustomData
    };
    //flowFactoryProvider.on('catchAll', function (event) {
    //    console.log('catchAll', arguments);
    //});
    // Can be used with different implementations of Flow.js
    // flowFactoryProvider.factory = fustyFlowFactory;
}
