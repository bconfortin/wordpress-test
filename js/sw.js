//console.log('Started', self);
var id = window.localStorage.getItem('browserId');
self.addEventListener('install', function (event) {
    self.skipWaiting();
    //console.log('Installed', event);
});
self.addEventListener('activate', function (event) {
    //console.log('Activated', event);
});
self.addEventListener('push', function (event) {
    //console.log('Push message', event);
    console.log(id);
    var title = 'Nova Mensagem';
    event.waitUntil(
      self.registration.showNotification(title, {
          body: 'Você tem uma nova mensagem de um cliente',
          //icon: '/Content/images/oral.png',
          tag: 'mensagem'
      }));
});