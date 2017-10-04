app.service('uniqueIdFactory', function () {
    return {
        generateUniqueId: function () {
            var timestamp = new Date().getTime();
            return timestamp;
        }
    };
});

app.service('$deleteConfirm', function ($window, $ngBootbox, $q) {
    return {
        open: function () {
            var defer = $q.defer();

            var dlg = $ngBootbox.dialog({
                title: $window.GENERIC_RESOURCE.DeleteRecord,
                message: $window.GENERIC_RESOURCE.DeleteConfirmation,
                className: 'modal-flex',
                keyboard: true,
                buttons: {
                    'delete': {
                        label: String.format("<i class='fa fa-trash-o'></i> {0}!", $window.GENERIC_RESOURCE.YesConfirm),
                        className: "btn-danger",
                        callback: function () {
                            defer.resolve(function() {
                                $(dlg).modal('hide');
                            });
                            return false;
                        }
                    },
                    'cancel': {
                        label: $window.GENERIC_RESOURCE.No,
                        className: "btn-default",
                        callback: function() {
                            defer.reject();
                        }
                    }
                }
            });

            return defer.promise;
        }
    };
});

app.service('$modalConfirm', function ($window, $ngBootbox, $q) {
    return {
        open: function (msg) {
            var defer = $q.defer();

            var dlg = $ngBootbox.dialog({
                title: $window.GENERIC_RESOURCE.Atention,
                message: msg,
                className: 'modal-flex',
                keyboard: true,
                buttons: {
                    'confirm': {
                        label: String.format("<i class='fa fa-check'></i> {0}!", $window.GENERIC_RESOURCE.Yes),
                        className: "btn-success",
                        callback: function () {
                            defer.resolve(function () {
                                $(dlg).modal('hide');
                            });
                            return false;
                        }
                    },
                    'cancel': {
                        label: $window.GENERIC_RESOURCE.No,
                        className: "btn-default",
                        callback: function () {
                            defer.reject();
                        }
                    }
                }
            });

            return defer.promise;
        }
    };
});