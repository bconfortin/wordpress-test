var app = angular.module('IguShuttle.Auth', []);

//*------------ run ------------*//
app.run(function ($rootScope, $window) {
    $rootScope.cultures = $window.cultures;
});