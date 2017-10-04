/*app.filter('telefone', function($window){
    return function(input){
        if(!input) return;

        input = input.replace(/[^0-9]/g, '');
        input = input.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        return input;
    }
});
*/
app.filter('cep', function ($window) {
    return function (input) {
        if (!input) return;

        input = input.replace(/[^0-9]/g, '');
        input = input.replace(/(\d{5})(\d{3})/, "$1-$2");
        return input;
    }
});

app.filter('customDate', function ($window, $locale, $filter) {
    return function (input, format) {
        if (!input) return null;
        var _date = $filter('date')(new Date(input), format ? format : $locale.DATETIME_FORMATS.shortDate);
        return _date;
    };
});

app.filter('startFrom', function () {

    return function (input, start) {
        if (input != null) {
            start = +start; //parse to int
            return input.slice(start);
        }
    }
});

app.filter('format', function ($window) {
    // a - Represents an alpha character (A-Z,a-z)
    // 9 - Represents a numeric character (0-9)
    // * - Represents an alphanumeric character (A-Z,a-z,0-9)
    return function (input, format) {
        if (!input || !format) return;

        $window.fakeinput = $window.fakeinput ? $window.fakeinput : $('<input/>');
        $(fakeinput).val(input).mask(format);
        return fakeinput.val();
    }
});