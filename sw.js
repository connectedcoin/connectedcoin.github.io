// The service worker running in background to receive the incoming
// push notifications and user clicks

// A push has arrived ...
self.addEventListener('push', function(event) {
  // Since there is no payload data with the first version  
  // of push messages, we'll use some static content. 
  // However you could grab some data from  
  // an API and use it to populate a notification

  var title = 'You Have Got a Call';  
  var body = 'Please check your mobile';  
  var icon = 'call.png'; 
    
  console.log('event:', event);
  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon
    })  
  );  
});

self.addEventListener('push', function(event) {
  if (event.data) {
    console.log(event.data.json());
  }
});


// The user has clicked on the notification ...
self.addEventListener('notificationclick', function(event) {
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)      
      var url = '/chrome-push/index.html';    
      return clients.openWindow(url);
  }));
});

/*console.log('Started', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {
  console.log('Push message', event);
    //console.log('Push message title', event.title);
    //console.log('Push message body', event.body);
  var title = 'Push message';
    //var title = event.title;
  event.waitUntil(
    self.registration.showNotification(title, {
      body: 'Message Recieved',
        //body: event.body;
      icon: 'http://localhost:8080/NotifyMe/App7/images/icon.png',
      tag: 'my-tag'
    }));
});
self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag ', event.notification.tag);
    event.notification.close();
    var url = 'http://localhost:8080/NotifyMe/App7/';
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});*/
