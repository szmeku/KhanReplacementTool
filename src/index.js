'use strict';

(function () {

    let angular = require('angular');
    angular.element(document).ready(bootstrapApp);

    function bootstrapApp() {

        // var editor = document.querySelector(".editor");
        var editor = document.querySelector(".editor"),
            $editorMenu = angular.element(document.querySelector("#translation_container #action_copy_source")).parent();

        $editorMenu.append('<ui-view name="menu"></ui-view>');
        angular.element(editor).append('<ui-view name="recipes"></ui-view>');

        angular.bootstrap(editor, ['khanReplacementTool']);
    }

    angular.module('khanReplacementTool', [require('angular-ui-router')])
        .config(($stateProvider) => {

            $stateProvider.state('app', {
                url: '',
                views: {
                    menu: {
                        template: require('./menu/menu.html'),
                        controller: require('./menu/menu.ctrl')
                    },
                    recipes: {
                        template: require('./recipes/recipes.html'),
                        resolve: {
                            recipes: () => {
                                return [12, 4, 5, 6, 7, 8, 9];
                            }
                        },
                        controller: ($scope, recipes) => {
                            $scope.recipes = recipes;
                        }
                    }
                }
            });


            require('./recipes/recipes.css');
        });

}());
