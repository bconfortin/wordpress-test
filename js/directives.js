//function usada para diretivas alpha, numeric e alphanumeric
var directives_floatnumber = function (e, k, params) {
    var p = $.extend({
        ichars: "!@#$%^&*()+=[]\\\';,/{}|\":<>?~`.- ",
        nchars: "",
        allow: ""
    }, params);

    if (p.nocaps) p.nchars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (p.allcaps) p.nchars += "abcdefghijklmnopqrstuvwxyz";

    var s = p.allow.split('');
    for (var i = 0; i < s.length; i++) if (p.ichars.indexOf(s[i]) != -1) s[i] = "\\" + s[i];
    p.allow = s.join('|');

    var reg = new RegExp(p.allow, 'gi');
    var ch = p.ichars + p.nchars;
    ch = ch.replace(reg, '');

    if (ch.indexOf(k) != -1) return false;
    if (e.ctrlKey && k == 'v') return false;

    return true;
};

//habilita a funcionalidade button-loading de acordo com a expressão fornecida
app.directive('buttonLoading', function () {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(
                function () {
                    return scope.$eval(attrs.buttonLoading);
                },
                function (value) {
                    if (value) {
                        if (!attrs.hasOwnProperty('ngDisabled')) {
                            element.addClass('disabled').attr('disabled', 'disabled');
                        }

                        element.data('resetText', element.html());
                        element.html(element.data('loading-text'));
                    } else {
                        if (!attrs.hasOwnProperty('ngDisabled')) {
                            element.removeClass('disabled').removeAttr('disabled');
                        }

                        element.html(element.data('resetText'));
                    }
                }
            );
        }
    };
});

//ao ser inserido em um ng-repeat, dispara evento ao fim da iteracao
app.directive('ngFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    if (typeof scope[attr.ngFinishRender] == 'function') {
                        scope[attr.ngFinishRender]();
                    }
                }, 10);
            }
        }
    };
});

//dispara evento quando clicado a tecla ESC
app.directive('ngEsc', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 27) {
                scope.$safeApply(function () {
                    scope.$eval(attrs.ngEsc);
                });

                event.preventDefault();
            }
        });
    };
});

//adiciona foco no input quando o mesmo é exibido
app.directive('autofocus', function ($timeout) {
    return function (scope, element, attrs) {
        attrs.$observe('autofocus', function () {
            $timeout(function () {
                element[0].focus();
            }, 50);
        });
    };
});

//verifica se o valor do input é igual ao outro input informado
app.directive('equals', function () {
    return {
        restrict: 'A', // only activate on element attribute
        require: 'ngModel', // get a hold of NgModelController
        link: function (scope, elem, attrs, ctrl) {
            if (!ctrl) return; // do nothing if no ng-model

            // watch own value and re-validate on change
            scope.$watch(attrs.ngModel, function () {
                validate();
            });

            // observe the other value and re-validate on change
            attrs.$observe('equals', function () {
                validate();
            });

            var validate = function () {
                // values
                var val1 = ctrl.$viewValue;
                var val2 = elem.inheritedData("$formController")[attrs.equals].$viewValue;

                // set validity
                ctrl.$setValidity('equals', val1 === val2);
            };
        }
    };
});

app.directive('ngEnterShift', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13 && !event.shiftKey) {
                scope.$safeApply(function () {
                    scope.$eval(attrs.ngEnterShift);
                });

                event.preventDefault();
            }
        });
    };
});

//dispara evento quando o valor do input é alterado e foco retirado (ng-change + ng-blur)
app.directive('ngChanged', function () {
    return {
        link: function (scope, elem, attrs) {
            elem.on('change', function () {
                scope.$safeApply(function () {
                    scope.$eval(attrs.ngChanged);
                });
            });
        }
    };
});

//adiciona mascara ao input de acordo com o valor definido em $locale
app.directive('ngMaskDate', function ($locale) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, attrs, ctrl) {
            var mask = attrs.mask || $locale.DATETIME_FORMATS.shortDate.replace(/[a-zA-Z]/g, 9);
            ctrl.$formatters.push(function (value) {
                var input = angular.element(el).val(value).unmask(mask).mask(mask);
                return value ? input.val() : undefined;
            });
        }
    };
});
app.directive('ngMaskTime', function ($locale) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, attrs, ctrl) {
            var mask = attrs.mask || $locale.DATETIME_FORMATS.shortTime.replace(/[a-zA-Z]/g, 9);
            ctrl.$formatters.push(function (value) {
                var input = angular.element(el).val(value).unmask(mask).mask(mask);
                return value ? input.val() : undefined;
            });
        }
    };
});
////gera mascara monetaria para o valor digitado
//app.directive('ngMaskDecimal', function ($locale) {
//    return {
//        restrict: 'A',
//        link: function (scope, el, attrs) {
//            el.bind('blur', function () {
//                var precision = attrs.precision || 2,
//                    separator = attrs.separator || ',',
//                    value = el[0].value;

//                var s = value.replace(/,/g, ".");
//                if (s == '') s = '0';

//                if (!isNaN(s)) {
//                    var n = parseFloat(s);
//                    s = n.toFixed(precision);
//                    s = s.replace(/\./g, separator);
//                    el[0].value = s;
//                }
//            });
//        }
//    };
//});

//permite a digitacao apenas de caracteres do alfabeto
app.directive('ngFilterAlpha', function () {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            el.bind('keypress', function (e) {
                var k;
                if (!e.charCode) k = String.fromCharCode(e.which);
                else k = String.fromCharCode(e.charCode);

                var p = $.extend({
                    nchars: '1234567890'
                }, (attrs.alpha ? eval(String.format('({0})', attrs.alpha)) : {}));

                if (!directives_floatnumber(e, k, p)) e.preventDefault();
            });
        }
    };
});

//permite a digitacao apenas de caracteres numericos
app.directive('ngFilterNumeric', function () {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            el.bind('keypress', function (e) {
                var k;
                if (!e.charCode) k = String.fromCharCode(e.which);
                else k = String.fromCharCode(e.charCode);

                var az = "abcdefghijklmnopqrstuvwxyz";
                az += az.toUpperCase();

                var p = $.extend({
                    nchars: az
                }, (attrs.numeric ? eval(String.format('({0})', attrs.numeric)) : {}));

                if (!directives_floatnumber(e, k, p)) e.preventDefault();
            });
        }
    };
});

app.directive('ngSearchUuid', function () {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            if (typeof scope.$root['searchs'] === 'undefined' || scope.$root['searchs'] === null) {
                scope.$root['searchs'] = {};
            }
            scope.$root['searchs'][attrs.ngSearchUuid] = scope;
        }
    };
});

app.directive('ngUppercase', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attrs, ctrl) {
            ctrl.$parsers.push(function (input) {
                return input ? input.toUpperCase() : "";
            });
            $(el).css("text-transform", "uppercase");
        }
    };
});

app.directive('uiPopoverCustom', function ($popover) {
    return {
        scope: {
            uiPopoverCustomModel: '='
        },
        link: function (scope, el, attrs) {


            scope.$watch('uiPopoverCustomModel', function (value, old) {
                if (value !== old) {
                    var myPopover = $popover(el, { title: attrs.uiPopoverCustom, placement: 'auto right', contentTemplate: attrs.uiPopoverCustomTemplate, trigger: 'manual', autoClose: true });
                    console.log(myPopover);
                    myPopover.$scope.contentData = value;
                    el.unbind('click').bind('click', function () {
                        myPopover.$promise.then(myPopover.show);
                    });
                }
            }, true);
        }
    };
});

app.directive('ngRole', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attr, model) {
            var unregister = scope.$watch(function () {
                scope.$AuthRoles = {
                    insert: model.$modelValue.flInsert,
                    update: model.$modelValue.flUpdate,
                    delete: model.$modelValue.flDelete
                };
            }, initialize);

            function initialize() {
                unregister();
            }
        }
    };
});

app.directive('ngInsertRole', function () {
    return {
        link: function (scope, el) {
            if (!scope.$parent.$AuthRoles.insert) {
                angular.element(el).remove();
            }
        }
    };
});

app.directive('ngUpdateRole', function () {
    return {
        link: function (scope, el) {
            if (!scope.$parent.$AuthRoles.update) {
                angular.element(el).remove();
            }
        }
    };
});

app.directive('ngDeleteRole', function () {
    return {
        link: function (scope, el) {
            if (!scope.$parent.$AuthRoles.delete) {
                angular.element(el).remove();
            }
        }
    };
});

app.directive('uiTokenField', function () {
    return {
        link: function (scope, el) {
            angular.element(el).tokenfield();
        }
    };
});

app.directive('ngCleanDocument', function () {

    return {
        restrict: 'A',
        link: function (scope, el) {
            console.log(el);

            el.on('blur keyup change', function () {

                // scope.$evalAsync(clean);

                //  console.log(el.value  );

            });
            clean();

            function clean() {

                //    console.log('clean');

            }

            /*
            scope: {
                data:'='
            }
            data = data.replace(".", "");
            data = data.replace(".", "");
            data = data.replace("-", "");
            data = data.replace("/", "");
            */

        }
    };

});

app.directive('uiMdclick', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {
            angular.element(el).on('mousedown', function (e) {
                if (e.which == 2) {
                    e.preventDefault();
                    var fn = $parse(attrs.uiMdclick);
                    scope.$safeApply(function () {
                        fn(scope, { $event: e });
                    });
                }
            });
        }
    };
});

app.directive('uiKeepPosition', function ($window) {
    return {
        scope: {
            uiKeepPosition: '='
        },
        restrict: 'A',
        link: function (scope) {
            angular.element($window).on("scroll", function () {
                if (scope.uiKeepPosition.active) {
                    scope.uiKeepPosition.scrollPosition = this.scrollY;
                }
            });
        }
    };
});

app.directive('flexibleWidth', function ($parse, $timeout) {
    return {
        link: function (scope, elem, attr) {
            
            scope.$watch('$last', function (v) {
                if (v) {
                    if (typeof scope[attr.flexibleWidth] == 'function') {
                        scope[attr.flexibleWidth](elem[0].parentNode.parentNode.parentNode.offsetHeight);
                    }
                };
            })
        }
    }
});