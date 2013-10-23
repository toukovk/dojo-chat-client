angular.module('dojo-chat', [])
  .service('ChatService', [
    function() {
      var messages = [
        {text:'learn angular', done:true},
        {text:'build an angular app', done:false}
      ];

      function getMessages() {
        return messages;
      }

      function addMessage(text) {
        messages.push({text:text, done:false});
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