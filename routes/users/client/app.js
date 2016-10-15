(function() {
    "use strict";

    const angular = require("angular");

    const auth = angular.module("auth", ["ngRoute"]);

    auth.config(["$routeProvider", function($routeProvider) {
        $routeProvider

            .when("/", {
                "redirectTo": "/login",
            })

            .when("/login", {
                "controller": "LoginController",
                "templateUrl": "/public/users/templates/login.html",
                "controllerAs": "LoginCtrl",
            })

            .when("/register", {
                "controller": "RegisterController",
                "templateUrl": "/public/users/templates/register.html",
                "controllerAs": "RegisterCtrl",
            })

            .otherwise({redirectTo: "/login"});
    }]);


    auth.controller("LoginController", ["$scope", "$http", function($scope, $http) {
        $scope.values = {email: "", password: "",};

        $scope.errors = {email: [], password: [], submit: []};

        $scope.submit = function(path) {
            Object.keys($scope.errors).forEach(key => $scope.errors[key] = []);

            const email = $scope.values.email;
            const password = $scope.values.password;

            $http.post(path, {email: email, password: password})
                .then(response => {
                    if (response.data.status) {
                        window.location.href = "/";
                        return;
                    }

                    const errors = response.data.errors;

                    errors.email.forEach(error => $scope.errors.email.push(error));

                    errors.password.forEach(error => $scope.errors.password.push(error));
                })
                .catch(() => $scope.errors.submit.push("Something went wrong, try again later"));
        };

    }]);

    auth.controller("RegisterController", ["$scope", "$http", function($scope, $http) {
        $scope.values = {email: "", password1: "", password2: "", name: ""};

        $scope.errors = {email: [], password1: [], password2: [], name: "", submit: []};

        $scope.submit = function(path) {
            Object.keys($scope.errors).forEach(key => $scope.errors[key] = []);

            const email = $scope.values.email;

            const p1 = $scope.values.password1;
            const p2 = $scope.values.password2;

            if (p2 != p1) {
                $scope.errors.password2.push("Password does not match");
                return;
            }

            const name = $scope.values.name;

            $http.post(path, {email: email, password: p1, name: name})
                .then(response => {
                    if (response.data.status) {
                        window.location.href = "/";
                        return;
                    }

                    const errors = response.data.errors;

                    errors.email.forEach(error => $scope.errors.email.push(error));

                    errors.password.forEach(error => $scope.errors.password1.push(error));

                    errors.name.forEach(error => $scope.errors.name.push(error));
                })
                .catch(() => $scope.errors.submit.push("Something went wrong, try again later"));
        };

    }]);

})();
