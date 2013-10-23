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
     
      $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
          count += todo.done ? 0 : 1;
        });
        return count;
      };
     
      $scope.archive = function() {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo) {
          if (!todo.done) $scope.todos.push(todo);
        });
      };
    }]);