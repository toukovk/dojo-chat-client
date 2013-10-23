angular.module('dojo-chat', [])
  .service('ChatService', [
    function() {
      var messages = [
        {text:'learn angular'},
        {text:'build an angular app'}
      ];

      function getMessages() {
        return messages;
      }

      function addMessage(text) {
        messages.push({text:text});
      }
      return {
        getMessages: getMessages,
        addMessage: addMessage
      }
  }])
  .controller('ChatCtrl', ['$scope', 'ChatService',
    function($scope, ChatService) {
      $scope.messages = ChatService.getMessages();
     
      $scope.addMessage = function() {
        ChatService.addMessage($scope.todoText);
        $scope.todoText = '';
      };
     
    }]);