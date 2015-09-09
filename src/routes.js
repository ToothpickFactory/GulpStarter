.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'home/home.html'
  })
  // .state('event', {
  //   url: '/event/:id',
  //   templateUrl: 'event/event.html',
  //   controller: 'eventCtrl',
  //   resolve:{
  //     event:  function(eventFactory, $stateParams){
  //         return eventFactory.getEvent($stateParams.id);
  //      }
  //  }
  // })

  $urlRouterProvider.otherwise('/');
})
