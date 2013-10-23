angular.module('dojo-chat', [])
  .service('ChatService', [
    function() {
      var todos = [
        {text:'learn angular', done:true},
        {text:'build an angular app', done:false}
      ];

      function getTodos() {
        return todos;
      }

      function addTodo(text) {
        todos.push({text:text, done:false});
      }
      return {
        getTodos: getTodos,
        addTodo: addTodo
      }
  }])
  .controller('ChatCtrl', ['$scope', 'ChatService',
    function($scope, ChatService) {
      $scope.todos = ChatService.getTodos();
     
      $scope.addTodo = function() {
        ChatService.addTodo($scope.todoText);
        $scope.todoText = '';
      };
     
    }]);