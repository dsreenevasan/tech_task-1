(function(){
    'use strict';
    angular
        .module('web')
        .controller('MainController', MainController);
    MainController.$inject = ['$state', '$scope', '$interval', '$cookieStore', 'LoginService', '$timeout'];
    function MainController(state, scope, interval, $cookieStore, LoginService, $timeout){
        var ctrl = this;
        ctrl.showModal = true;
        ctrl.showQn = false;
        ctrl.counter = 67;
        init();

        function init(){
            ctrl.SAFound = false;
            ctrl.type = 'student';
            ctrl.gender = 'M';
            ctrl.passwordsMatch = true;
            ctrl.passwordWithinLength = true;
            ctrl.isSubmitting = false;
            ctrl.yearNotValid = false;
            ctrl.showResetPassword = false;
            /*if($rootScope.showResetPassword){
             ctrl.showResetPassword = true;
             }*/
            ctrl.mailSent = false;

            var currentTime = new Date();
            ctrl.currentTime = "Date of Birth";
            ctrl.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            ctrl.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            ctrl.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            ctrl.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
            ctrl.disable = [false];
            ctrl.today = 'Today';
            ctrl.clear = 'Clear';
            ctrl.close = 'Close';
            var days = 150;
            ctrl.minDate = new Date(1990, 1 ,1).toISOString();
            ctrl.maxDate = new Date(2015, 12 ,31).toISOString();
            console.log(ctrl.minDate + " --- " + ctrl.maxDate);
            ctrl.onStart = function () {
                console.log('onStart');
            };
            ctrl.onRender = function () {
                console.log('onRender');
            };
            ctrl.onOpen = function () {
                console.log('onOpen');
            };
            ctrl.onClose = function () {
                console.log('onClose');
            };
            ctrl.onSet = function () {
                console.log('onSet');
            };
            ctrl.onStop = function () {
                console.log('onStop');
            };

            ctrl.years = ["1","2","3","4"];
            ctrl.year = "1";


            LoginService.GetColleges().then(function (response) {
                console.log(response);
                if(response.status == 200){
                    ctrl.collegesDataLoaded = true;
                    ctrl.colleges = response.data.colleges;
                    ctrl.college = ctrl.colleges[0];
                }
                else{
                    Materialize.toast("Error Getting College List", '3000');
                }
            });

            ctrl.departments = [
                "Aeronautical Engineering","Aerospace Engineering","Agricultural & Irrigation Engineering","Aircraft Maintenance Engineering","Animation","Apparel technology","Applied electronics","Applied Mathematics","Architecture","Automobile Engineering","Avionics","Bio Informatics","Bio Medical Engineering","Biotechnology","Ceramic Technology","Charted Accountancy","Chemical Engineering","Chemistry","Civil Engineering","Communication Systems","Computer Science & Engineering","Cryogenic Engineering","Elecrical Engineering","Electrical & Electronics Engineering","Electronic media","Electronics & Communication Engineering","Electronics & Instrumentation","Embedded Systems","Energy Engineering","Engineering Design","Engineering Physics","English Literature","Finance","Fluid Mechanics","Food Technology","Geo Informatics","Harbour Engineering ","High Voltage Engineering","Hospitality Administration","HR","Humanities & Social Sciences","Industrial Engineering","Information & Communications Technology","Information Technology","Internal Combustion Engineering","Logistics","M.Sc. CS-IT","M.Sc. E-Media","Manufacturing Engineering","Marine Engineering","Marketing","Material Science ","Mathematics","Mechanical Engineering","Mechatronics","Media Sciences","Metallurgy","Mining Engineering","Nano Science and Technology","Other","Photonics ","Physics","Printing Technology","Production Engineering","Remote Sensing","Software Engineering","Systems Engineering & Operations Research","Technology Managment","Telecommunication Engineering","Textile Technology","Theoretical Computer Science","Thermal","Transportation Engineering","VLSI Design","Other"
            ];

            ctrl.department = ctrl.departments[0];
        }

        ctrl.genderStatus = function(gender){
            ctrl.gender = gender;
        };

        ctrl.checkPasswords = function () {
            ctrl.passwordsMatch = ctrl.password === ctrl.confirmPassword;
        };

        ctrl.go = function(state) {
            $state.go(state);
        };

        ctrl.checkLength = function(){
            if(ctrl.password.length > 32 || ctrl.password.length < 8){
                Materialize.toast("Password should be between 8-32 characters", 3000);
                ctrl.passwordWithinLength = true;
            }
            else{
                ctrl.passwordWithinLength = false;
            }
            console.log(ctrl.passwordWithinLength);
        };

        ctrl.validateYear = function () {
            console.log(ctrl.year);
            if(ctrl.year < 1 || ctrl.year > 4){
                Materialize.toast('Year should be between 1 to 4', 3000);
                ctrl.yearNotValid = true;
            }
            else{
                ctrl.yearNotValid = false;
            }
        };

        ctrl.register = function () {
            var obj = {
                email: ctrl.email,
                password: ctrl.password
            };

            $cookieStore.put('userDetails', obj);
            Materialize.toast("Successfully Registered!", 3000);
            /*$(document).ready(function(){
                $('#login').modal('open');
            });*/
            ctrl.email = undefined;
            ctrl.password = undefined;
            angular.element('#login-dummy').triggerHandler('click');
        };

        ctrl.login = function() {
            if($cookieStore.get('userDetails')){
                ctrl.userDetails = $cookieStore.get('userDetails');
            }
            if((ctrl.email == 'root@gmail.com' || ctrl.email == ctrl.userDetails.email) &&
                (ctrl.password == 'password' || ctrl.password == ctrl.userDetails.password)){
                ctrl.showModal = false;
                $cookieStore.put('loggedIn', true);
                ctrl.showQn = true;
                Materialize.toast("Successfully logged in!", 3000);
                angular.element('#q1-dummy').triggerHandler('click');
            }
        };

        ctrl.countdown = function() {
            $timeout(function() {
                console.log(ctrl.counter);
                ctrl.counter--;
                if(ctrl.counter > 0){
                    ctrl.countdown();
                }
            }, 1000);
        };

        ctrl.verify = function(qn){
            if(qn == 1 && ctrl.answer == 'c'){
                Materialize.toast("Right Answer", 3000);
                setTimeout(function () {
                    angular.element('#wait-button').triggerHandler('click');
                    angular.element('#q2-dummy').triggerHandler('click');
                }, 60000);

                ctrl.countdown();
                document.querySelector('#player').setAttribute('alongpath', 'path: 15,1.33,15 15,1.33,12.69 4.89,1.33,10.03; closed:false; dur:6000; inspector:false; delay: 0');
                setTimeout(function () {
                    document.querySelector('#player').setAttribute('rotation', '0 90 0');
                }, 3500);
                setTimeout(function () {
                    ctrl.answer = undefined;
                    angular.element('#wait-dummy').triggerHandler('click');
                }, 7000);
            }
            else if(qn == 2 && ctrl.answer == 'b'){
                Materialize.toast("Right Answer", 3000);

                document.querySelector('#player').setAttribute('alongpath', 'path: 4.89,1.33,10.03 5.69,1.33,14.85 -5.9,1.33,15.11; closed:false; dur:10000; inspector:false; delay: 0');
                document.querySelector('#player').setAttribute('rotation', '0 180 0');
                setTimeout(function () {
                    document.querySelector('#player').setAttribute('rotation', '0 90 0');
                }, 3500);
                setTimeout(function () {
                    angular.element('#final-dummy').triggerHandler('click');
                }, 11000);
            }
            else{
                Materialize.toast("Wrong Answer", 3000);
                if(qn == 1){
                    angular.element('#q1-dummy').triggerHandler('click');
                }
                else{
                    angular.element('#q2-dummy').triggerHandler('click');
                }
            }
        };
        
        ctrl.show = function (qn) {
            if(qn == 1){
                angular.element('#login-dummy').triggerHandler('click');
            }
            else{
                angular.element('#q1-dummy').triggerHandler('click');
            }
        };

        AFRAME.registerComponent('automove-controls', {
            init: function () {
                this.speed = 0.1;
                this.isMoving = true;
                this.velocityDelta = new THREE.Vector3();
            },
            isVelocityActive: function () {
                return this.isMoving;
            },
            getVelocityDelta: function () {
                this.velocityDelta.z = this.isMoving ? -this.speed : 0;
                return this.velocityDelta.clone();
            }
        });


        document.querySelector('a-scene').addEventListener('render-target-loaded', function () {
            var WALL_SIZE = 5,
                WALL_HEIGHT = 3;
            var el = document.querySelector('#walls');
            var wall;


            for (var x = 0; x < map.height; x++)  {
                for (var y = 0; y < map.width; y++) {

                    var i = y*map.width + x;
                    var position = (x-map.width/2)*WALL_SIZE + ' ' + 1.5 + ' ' + (y-map.height/2)*WALL_SIZE;
                    if (map.data[i] === 1) {
                        // Create wall
                        wall = document.createElement('a-box');
                        el.appendChild(wall);
                        wall.setAttribute('color', '#fff');
                        wall.setAttribute('material', 'src: #texture-wall;');
                        wall.setAttribute('width', WALL_SIZE);
                        wall.setAttribute('height', WALL_HEIGHT);
                        wall.setAttribute('depth', WALL_SIZE);
                        wall.setAttribute('position', position);
                        wall.setAttribute('static-body', '');
                    }

                    if (map.data[i] === 2)  {
                        // Set player position
                        document.querySelector('#player').setAttribute('position', position);
                    }

                }
            }
            console.info('Walls added.');
        });
        
    }

})();