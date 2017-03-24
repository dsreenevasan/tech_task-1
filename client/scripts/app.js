(function() {
    'use strict';

    var states = [
        {
            name: 'main',
            state:
            {
                url:'/main',
                templateUrl: 'views/main.html',
                data: {
                    text: "Main",
                    visible: false
                }
            }
        }
    ];

    var app = angular.module('web', [
        'ui.router',
        'ui.materialize',
        'ngCookies'
    ]);

    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/main');

        angular.forEach(states, function (state) {
            $stateProvider.state(state.name, state.state);
        });
    });

})();