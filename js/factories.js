app.factory('authInterceptor', function () {
    //return {
    //    response: function (response) {
    //        if (response.status === 302) {
    //            console.log(response);
    //            //alert('Sua sessão expirou! Atualize a página.');
    //        }

    //        return response;
    //    }
    //};
});

app.factory('DTHelper', function ($window, $compile, $parse, $templateCache, $modal, $ngBootbox, DTOptionsBuilder) {
    var _settings = {};

    return {
        setTableSettings: function(table, settings) {
            _settings[table] = settings;
        },

        renderColumnFilters: function(dtSettings, nmtemplate) {
            var $tableElement = angular.element(dtSettings.nTable);
            var $filters = angular.element($templateCache.get(nmtemplate == undefined ? 'table-filters' : nmtemplate));
            var $thead = $tableElement.find('thead');
            $thead.append($filters);

            var table = dtSettings.oInstance.DataTable();
            $thead.find('[dt-filter-column]').each(function() {
                var filterColumn = $(this).attr('dt-filter-column');
                var col = dtSettings.aoColumns.first(function(u) { return u.mData == filterColumn; });

                if (col != null) {
                    $(this).on('change', function() {
                        table.column(col.idx).search(this.value).draw();
                    });

                    //if(this.value){
                    //    table.column(col.idx).search(this.value).draw();
                    //};

                    if (!col.bVisible) {
                        $(this).parent().hide();
                    }
                }
            });

            $tableElement.data('$filters', $filters);
            this.setTableSettings(dtSettings);
            return $thead;
        },

        defaultConfiguration: function(url, order, listeners) {
            var options = DTOptionsBuilder.newOptions()
                .withOption('ajax', function (aoData, fnCallback) {
                    $.getJSON(url, aoData, function(result) {
                        fnCallback(result);
                    }).fail(function (response) {
                        msgbox(response.responseJSON);
                    });
                })
                .withDataProp('data')
                .withOption('serverSide', true)
                .withOption('processing', true)
                .withOption('autoWidth', false)
                .withDOM('<\'clearfix\'<\'pull-left form-inline\'l><\'pull-right form-inline\'f>r>t<\'clearfix\'<\'pull-left\'i><\'pull-right\'p>>')
                .withBootstrap();

            if (order) {
                options.withOption('order', order);
            }

            angular.forEach(listeners, function(fn, name) {
                if (typeof fn === 'function') {
                    options.withOption(name, fn);
                }
            });

            return options;
        },

        configureColumns: function(columns, userColumns) {
            if (eval(userColumns) == null) {
                return columns;
            }

            columns.forEach(function(column) {
                if (userColumns.any(function(u) { return u.Name == column.mData; })) {
                    if (userColumns.first(function(u) { return u.Name == column.mData; }).Visible === false) {
                        column.notVisible();
                    }
                }
            });

            return columns;
        },

        toggleTableColumns: function (config) {
            //cria html das opcoes (checkbox) de colunas
            var html = '';
            angular.forEach(config.columns, function(column) {
                if (column.mData) {
                    html += String.format('<label class="checkbox-inline"><input type="checkbox" ng-model="columnsToggle[\'{0}\'][\'{1}\']"> {2}</label>', config.table, column.mData, column.sTitle);
                }
            });

            //exibe janela modal
            var dialog = $ngBootbox.dialog({
                title: $window.GENERIC_RESOURCE.ShowHideColumns,
                message: html,
                className: 'modal-flex modal-size-big',
                keyboard: true,
                buttons: {
                    'save': {
                        label: $window.GENERIC_RESOURCE.Save,
                        className: "btn-green",
                        callback: function () {
                            //chama metodo de callback com as configuracoes das colunas
                            if (typeof config.callback === 'function') {
                                config.callback(resolveColumns());
                            }
                            else if (typeof config.scope[config.callback] === 'function') {
                                config.scope[config.callback](resolveColumns());
                            }
                        }
                    },
                    'close': {
                        label: $window.GENERIC_RESOURCE.Cancel,
                        className: "btn-default"
                    }
                }
            });

            //compila conteudo da janela no scope
            $compile(dialog.find('.modal-content').contents())(config.scope);

            //seta o valor nos checkbox diretamente no scope
            config.scope.columnsToggle = {};
            config.scope.columnsToggle[config.table] = {};
            angular.forEach(config.columns, function(column) {
                if (column.mData) {
                    config.scope.columnsToggle[config.table][column.mData] = column.bVisible === undefined ? true : column.bVisible;
                }
            });

            //metodo que esconde/exibe as colunas de acordo com os valores contidos no scope
            //retorna as colunas com suas configuracoes
            var resolveColumns = function() {
                var resColumns = [];
                var $filters = angular.element(_settings[config.table].nTable).data('$filters');

                angular.forEach(config.scope.columnsToggle[config.table], function (value, key) {

                    var configColumn = config.columns.first(function (u) { return u.mData == key; });
                    if (configColumn) {
                        configColumn.bVisible = value;

                        if (_settings[config.table]) {
                            var dtColumn = _settings[config.table].aoColumns.first(function (u) { return u.mData == key; });
                            if (dtColumn) {
                                _settings[config.table].oInstance.fnSetColumnVis(dtColumn.idx, value, false);

                                if ($filters) {
                                    angular.element($filters.find('td').get(dtColumn.idx))[value ? 'show' : 'hide']();
                                }
                            }
                        }
                    }

                    var userTableColumn = { Name: key, Visible: value };
                    resColumns.push(userTableColumn);
                });

                return resColumns;
            };
        }
    };
});

app.factory('uuid2', [function() {
    var s4 = function() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    return {
        newuuid: function() {
            // http://www.ietf.org/rfc/rfc4122.txt
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";
            return s.join("");
        },
        newguid: function() {
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    };

}
]);

app.factory('$searchModal', ['$window', '$rootScope', '$compile', '$http', '$ngBootbox', 'uuid2', function ($window, $rootScope, $compile, $http, $ngBootbox, uuid2) {

    function $searchModal(config) {
        this.config = config;

        this.uniqueId = uuid2.newuuid();

        this.setTitle = function(title) {
            this.config.title = title;
        };
    }

    $searchModal.prototype = {
        open: function (params) {
            params = (typeof params === "undefined") ? null : params;
            var _this = this;

            $window.$script([this.config.controller], function () {
                $http.get(_this.config.view, { cache: true })
                .success(function (data) {
                    var html = angular.element(data).attr('ng-search-uuid', _this.uniqueId);
                    var dialogConfig = {
                        title: _this.config.title,
                        message: html,
                        className: String.format('modal-flex {0}', _this.config.className || 'modal-size-big'),
                        onEscape: function() {
                            if (!_this.config.scope.$root['searchs'][_this.uniqueId]['hasChange']) return true;
                            return !_this.config.scope.$root['searchs'][_this.uniqueId]['hasChange'];
                        },
                        buttons: {
                            'close': {
                                label: $window.GENERIC_RESOURCE.Close,
                                className: "btn-white"
                            }
                        }
                    };


                    _this.dialog = $ngBootbox.dialog(dialogConfig);
                    $compile(_this.dialog.find('.modal-body').contents())(_this.config.scope);

                    //solucao alternativa para correcao do tamanho do backdrop da modal
                    _this.dialog.on('shown.bs.modal', function(modal) {
                        var interval = $window.setInterval(function () {
                            var bsmodal = angular.element(modal.target).data('bs.modal');
                            if (bsmodal)
                                bsmodal.handleUpdate();
                        }, 10);

                        $window.setTimeout(function() {
                            $window.clearInterval(interval);
                        }, 3000);
                    });

                    if (_this.config.scope.$root['searchs'][_this.uniqueId]) {
                        if (typeof _this.config.scope.$root['searchs'][_this.uniqueId][_this.config.listener] === 'function') {
                            _this.config.select = _this.selected;
                            _this.config.scope.$root['searchs'][_this.uniqueId][_this.config.listener](_this.config, params);

                            if (_this.config.scope.$root['searchs'][_this.uniqueId].hasOwnProperty('hasChange')) {
                                _this.config.scope.$root['searchs'][_this.uniqueId].$watch('hasChange', function (v) {
                                    if (v === true) {
                                        $(_this.dialog).find('.modal-header').find('.close').addClass('hide');
                                        $(_this.dialog).find('.modal-footer').find('[data-bb-handler]').prop('disabled', true);
                                    } else {
                                        $(_this.dialog).find('.modal-header').find('.close').removeClass('hide');
                                        $(_this.dialog).find('.modal-footer').find('[data-bb-handler]').prop('disabled', false);
                                    }
                                });
                            }

                        } else {
                            console.error(String.format('O metodo "{0}" nao foi definido em "{1}". Nao sera possivel selecionar um item.', _this.config.listener, _this.config.controller));
                        }
                    }
                });
            });
        },

        close: function () {
            $(this.dialog).modal('hide');
        }
    };

    //$searchModal.open = function() {
    //    console.log('abrir consulta');
    //};

    return $searchModal;
}]);