/* globals app, menus, $script */
app.controller('MainController', function ($scope, $timeout, $window, VIEW, $interval, $injector, localStorageService, $searchModal, $rootScope, $modal, $http, $controller) {
    //*------------ local definitions ------------*//
    var $resource;


    //if (!IHub) {
    //    IHub = $.connection.NotificationUsers;
    //}

    //IHub.client.atualizaMensagens = function (msg) {
    //    var exist = true;
    //    try {
    //        var e = $controller("WhatsAppCentralController", { "$scope": {} }, true);
    //    } catch (e) {
    //        exist = false;
    //    }
    //    if (exist) {
    //        $scope.$broadcast('setNewMessage', msg);
    //    } else {
    //        $scope.countMsgs++;
    //        $scope.$safeApply();
    //    }
    //};

    //IHub.client.atualizaCountMensagem = function () {
    //    $scope.getNotSeenMessages();
    //};

    //IHub.client.atualizaCountAgenda = function () {
    //    $scope.getNotSeenAppointment();
    //};

    //$.connection.hub.start().done(function () {
    //    IHub.server.updateConnection();
    //});

    //$scope.$on('updateMsgCount', function (event, msg) {
    //    $scope.countMsgs++;
    //    $scope.$safeApply();
    //});

    //$scope.$on('openMsgChat', function (event) {
    //    $scope.getNotSeenMessages();
    //});

    $scope.getNotSeenMessages = function () {
        _UsuarioService.GetNotSeenMessages()
        .success(function (response) {
            $scope.countMsgs = response;
            $scope.$safeApply();
        }).error(function (response) {
            msgbox(response);
        });
    };

    $scope.getNotSeenAppointment = function () {
        _UsuarioService.GetNotSeenAppointment()
        .success(function (response) {
            $scope.countAppointments = response;
            $scope.$safeApply();
        }).error(function (response) {
            msgbox(response);
        });
    };

    //
    // vars
    //
    $scope.startPushService = function () {
        if ('serviceWorker' in navigator) {
            //console.log('Service Worker is supported');
            navigator.serviceWorker.register('/Content/js/sw.js').then(function (reg) {

                setTimeout(function () {
                    reg.pushManager.subscribe({
                        userVisibleOnly: true
                    }).then(function (sub) {
                        $scope.registerChrome(sub.endpoint);
                    });
                }, 3000);

               
            }).catch(function (error) {
                console.log(':^(', error);
            });
        }
    }

    $scope.registerChrome = function (endpoint) {
        var endpointParts = endpoint.split('/');
        var registrationId = endpointParts[endpointParts.length - 1];
        var id = new Date().getTime();
        if ($window.localStorage.getItem('browserId')) {
            id = $window.localStorage.getItem('browserId');
        }

        _UsuarioService.SetChromeRegistration(registrationId, id)
        .success(function (response) {
            //msgbox(response);
            $window.localStorage.setItem('browserId', id);
        }).error(function (response) {
            msgbox(response);
        });

    };

    $scope.sendPush = function (endpoint) {
        var data = { body: 'algum texto', title: 'Titulo teste' };

        $http.post('https://android.googleapis.com/gcm/send', {
            registration_ids: [registrationId], // array of registrationIds
            data: data // payload, usefull fields: title, message, timestamp, msgcnt
        }, {
            headers: {
                Authorization: 'key=AIzaSyAgXa4bromMlKgHojWRExepPT8Nvn6lOiI',
                "Content-Type": "application/json"
            }
        }).success(function (response) {
            $scope.response = response;
        }).error(function (error) {
            $scope.error = error;
        });

    };


    var _isDashboardActivated = true;     //flag que verifica se a tab principal esta ativa
    var _uiDefinitions = angular.fromJson($window.localStorage.getItem('nrg.ui-definitions')) || {};
    $scope.ticket = { tpTicket: "" };

    // methods
    //

    var init = function (resource) {
        $resource = resource;
        //$scope.getNotSeenMessages();
        //$scope.getNotSeenAppointment();
        //$scope.startPushService();
    };


    // desativa todas tabs
    var _deactivateTabs = function () {
        $scope.tabs.where(function (u) { return u.active === true; }).forEach(function (item) { item.active = false; });
    };

    //ativa a tab
    var _activateTab = function (tab) {
        tab.active = true;
        Main.scrollTop(tab.scrollPosition);
    };

    //adiciona o id da tab ao rootScope
    var _addTabScope = function (tab) {
        var a = tab.Href.split('?')[0];
        var b = a.split('/');

        if (typeof $scope.$root['tabs'] === 'undefined' || $scope.$root['tabs'] === null) {
            $scope.$root['tabs'] = {};
        }

        $scope.$root['tabs'][String.format('{0}{1}', b[b.length - 2], b[b.length - 1])] = tab.Id;
    };

    //metodo que carrega o painel/dashboard
    var _loadDashboard = function () {
        $window.$script($window.DASHBOARD_SETTINGS.Controller, function () {
            $scope.$safeApply(function () {
                $scope.dashboard.Href = $window.DASHBOARD_SETTINGS.Href;
            });
        });
    };


    //*------------ scope definitions ------------*//

    //
    // vars
    //
    $scope.VIEW = VIEW;                                                 //constante definida para todas telas
    $scope.sidebarHidden = _uiDefinitions.sidebarHidden || false;       //flag para exibicao do menu
    $scope.menu = menus;                                                //lista de menus
    $scope.tabs = [];
    $scope.countMsgs = 0 //lista tabs(abas)
    $scope.searchMenu = {                                               //objeto de filtro de menus
        active: false,
        criteria: _uiDefinitions.searchCriteria,
        results: []
    };
    $scope.headerMenu = {                                               //objeto que contem os menus do header
        settings: $window.MENU_SETTINGS
    };
    $scope.dashboard = { Href: null };
    $scope.pdv = {};//objeto do dashboard/painel


    //
    // methods
    //

    //configura menu para funcionamento do toggle
    $scope.setupMenu = function () {
        Main.setupMenu($('#side li.panel'));
    };

    // exibe/esconde o menu lateral
    $scope.sidebarToggle = function () {
        $scope.sidebarHidden = !$scope.sidebarHidden;

        _uiDefinitions.sidebarHidden = $scope.sidebarHidden;
        $window.localStorage.setItem('nrg.ui-definitions', angular.toJson(_uiDefinitions));
    };

    // verifica se a tab principal esta ativa
    $scope.dashboardActive = function () {
        return _isDashboardActivated || $scope.tabs.length === 0;
    };

    // retorna tab ativa
    $scope.getActiveTab = function () {
        return $scope.tabs.first(function (u) { return u.active === true; });
    };

    // ativa a tab informada
    $scope.activateTab = function (tab, e) {

        _deactivateTabs();

        if (tab === true) {
            _isDashboardActivated = true;
            Main.scrollTop();
        }
        else {
            _isDashboardActivated = false;
            _activateTab(tab);
        }

    };

    // adiciona uma tab na lista
    $scope.addTab = function (tab) {
        _isDashboardActivated = false;

        if (!$scope.tabs.any(function (u) { return u.UniqueId === tab.UniqueId; })) {
            var timestamp = /nocache/g.test(window.location.search) ? new Date().getTime() : $window.TIMESTAMP;
            tab.UniqueId = new Date().getTime();

            tab.Controller = (/v=[\d]+$/).test(tab.Controller) ? tab.Controller.replace(/[\d]+$/, timestamp) : String.format('{0}?tabId={1}&v={2}', tab.Controller, tab.Id, timestamp);

            tab.Href = (/v=[\d]+$/).test(tab.Href) ? tab.Href.replace(/[\d]+$/, timestamp) : String.format('{0}?tabId={1}&v={2}', tab.Href, tab.Id, timestamp);

            $window.$script(tab.Controller, function () {
                $scope.$safeApply(function () {
                    $scope.tabs.push(tab);
                });
            });

            //TODO: remove apos nao estiver sendo usando em nenhum controller
            _addTabScope(tab);
        }
        else {
            _deactivateTabs(tab);
            _activateTab(tab);
        }
    };

    // callback de carregamento da tab
    $scope.tabLoaded = function (tab) {
        _deactivateTabs();
        _activateTab(tab);

        $timeout(function () {
            angular.element(String.format('#{0}', tab.Id))
				.children('.page-content')
				.addClass('page-content-ease-in');
        }, 10);
    };

    // remove uma tab da lista
    $scope.removeTab = function (tab) {

        var currentTab = $scope.tabs.first(function (u) { return u.UniqueId === tab.UniqueId; });
        if (currentTab) {
            var index = $scope.tabs.indexOf(currentTab);
            $scope.tabs.splice(index, 1);

            if (currentTab.active) {
                _deactivateTabs();

                if ($scope.tabs[index]) {
                    $scope.tabs[index].active = true;
                }
                else if ($scope.tabs[index - 1]) {
                    $scope.tabs[index - 1].active = true;
                }
            }
        }
    };

    // abre a tab em uma janela independente
    $scope.popUpTab = function (tab) {
    };

    // dupblica a tab
    $scope.cloneTab = function (tab) {
        var newTab = angular.copy(tab);

        newTab.UniqueId += new Date().getTime();
        $scope.addTab(newTab);
    };

    // busca nos menus de acordo com o criterio informado
    $scope.$watch('searchMenu.criteria', function (value) {
        if (String.IsNullOrEmpty(value)) {
            $scope.searchMenu.active = false;
        }
        else {
            $scope.searchMenu.results = [];
            $scope.searchMenu.active = true;

            var flatMenu = [];
            flattenJsonArray($scope.menu, flatMenu, "Nodes");

            flatMenu.forEach(function (item) {
                if (!item.Nodes) {
                    if (item.Name.toLowerCase().contains(value.toLowerCase())) {
                        $scope.searchMenu.results.push(item);
                    }
                }
            });

            // adiciona highlight nos resultados
            $timeout(function () {
                $('#search-results .result-item')
					.unhighlight({ element: 'mark' })
					.highlight(value, { element: 'mark' });
            });
        }

        _uiDefinitions.searchCriteria = value;
        $window.localStorage.setItem('nrg.ui-definitions', angular.toJson(_uiDefinitions));
    });

    // handler para includes que nao carregarem
    $scope.$on('$includeContentError', function (obj) {
        alert(String.format('Fail load tab: {0}', obj.targetScope.tab.Name), 'Fail');
    });

    //chama carregamento dashboard
    _loadDashboard();

    $scope.init = function () {
        //carrega serviços
        $script([
				String.format('{0}Scripts/Services/Core/Usuarios.js?v={1}', $window.BASEURL, $window.TIMESTAMP)
        ],
			function () {
			    _UsuarioService = $injector.get('UsuarioService');
			    //chama metodo inicial
			    init();
			}
		);
    };

});

var Main = {
    scrollConfig: {
        currentHeight: 0,
        active: false
    },

    setScroll: function () {
        if ($("#scroll-side").length) {
            $("#scroll-side").slimScroll({ height: 'auto', touchScrollStep: 50 });
        }
    },

    destroyScroll: function () {
        if ($("#scroll-side").length) {
            $("#scroll-side").slimScroll({ destroy: true });
        }
    },

    scrollTop: function (position) {
        $('html, body').animate({ scrollTop: position || 0 }, 150);
    },

    setupMenu: function (nodes) {
        nodes.each(function (i, item) {
            var parent = $(item).closest('ul');
            var random = Math.random().toString().replace('0.', '');

            if ($(item).has('ul').length > 0) {
                $(item).children('a').attr('data-parent', '#' + parent.attr('id')).attr('data-target', '#' + random);
                $(item).children('ul').attr('id', random);

                Main.setupMenu($(item).children('ul').find('li'));
            }
        });
    },

    _reloadCookie: function () {
        $("#cookierenew").attr('src', $('#cookierenew').attr('src'));
        setTimeout(Main._reloadCookie, 20000);
    }
};

/*
//Portlet Icon Toggle
$(".portlet-widgets .fa-chevron-down, .portlet-widgets .fa-chevron-up").click(function () {
	$(this).toggleClass("fa-chevron-down fa-chevron-up");
});

//Portlet Refresh Icon
(function ($) {
	$.fn.extend({
		addTemporaryClass: function (className, duration) {
			var elements = this;
			setTimeout(function () {
				elements.removeClass(className);
			}, duration);

			return this.each(function () {
				$(this).addClass(className);
			});
		}
	});
})(jQuery);

$("a i.fa-refresh").click(function () {
	$(this).addTemporaryClass("fa-spin fa-spinner", 2000);
});

//Easing Script for Smooth Page Transitions
$(function () {
	$('.page-content').addClass('page-content-ease-in');
});
*/


//*------------ DOM ------------*//
$(function () {
    // set window size
    Main.scrollConfig.currentHeight = window.innerHeight;

    //// init notification scroll
    //$('#messageScroll, #alertScroll, #taskScroll').slimScroll({
    //    height: '200px',
    //    alwaysVisible: true,
    //    disableFadeOut: true,
    //    touchScrollStep: 50
    //});

    // tabsdrop
    //$('#main-tabs > ul.nav-tabs').tabdrop();

    //disable middle click
    //TODO

    // Tooltips for sidebar toggle and sidebar logout button
    //$('.tooltip-sidebar-toggle, .tooltip-sidebar-logout').tooltip({
    //    selector: "[data-toggle=tooltip]",
    //    container: "body"
    //});

    // logout modal
    $.fn.popup.defaults.pagecontainer = '#wrapper';
    $('#logout').popup({
        transition: 'ease-in-out 0.3s',
        vertical: 'top'
    });

    //força o iframe para reload
    Main._reloadCookie();
});

//$(window).espressoResize(function () {
//    if (window.innerHeight !== Main.scrollConfig.currentHeight) {
//        Main.scrollConfig.currentHeight = window.innerHeight;
//        if (Main.scrollConfig.active) {
//            Main.setScroll();
//        }
//    }
//});

$(window).setBreakpoints({
    distinct: true,
    breakpoints: [768]
});

$(window).on('enterBreakpoint768', function () {
    if (!Main.scrollConfig.active) {
        Main.setScroll();
        Main.scrollConfig.active = true;
    }
});

$(window).on('exitBreakpoint768', function () {
    Main.destroyScroll();
    Main.scrollConfig.active = false;
});