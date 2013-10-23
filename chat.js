angular.module('dojo-chat', [])
  .service('ChatService', [
    function() {
      var messages = [];
      var username = 'Touko';
      var currentRoom = 'dojo';
      var backendCallback;

      function apply() {
        if(backendCallback) {
          backendCallback();
        }
      }

      var chat = new ChatConnector("http://192.168.102.66:8080");
      
      chat.handleAllRooms(function (rooms){
        console.log("all the rooms");
        console.log(rooms);
      });

      chat.handleJoinedRooms(function (rooms){
        console.log("joined rooms");
        console.log(rooms);
      });

      chat.handleUsersInRoom(function (roomUsers){
        console.log("users in room");
        console.log(roomUsers);
      });
      chat.handleReceiveMessage(function (message){
        message.formattedTimestamp = new XDate(message.timestamp).toString("d.MM.yyyy HH:MM");
        messages.push(message);
        apply();
        console.log("received message");
        console.log(message);
      });

      chat.login(username);
      chat.joinRoom(currentRoom);
      window.chat = chat;

      function addMessage(text) {
        // var message = {
        //   message: text,
        //   timestamp: new Date().getTime(),
        //   sender: username
        // }
        chat.sendMessage(currentRoom, text);
        // messages.push(message);
      }
      function setBackendCallback(callback) {
        backendCallback = callback;
      }
      return {
        messages: messages,
        addMessage: addMessage,
        setBackendCallback: setBackendCallback
      }
  }])
  .directive('message', function() {
    return {
      restrict: 'E',
      transclude: true,
      template: '<li><span>{{msg.formattedTimestamp}} {{msg.sender}}: {{msg.message}}</span></li>'
    };
  })
  // <span>{{message.text}}</span>
  .controller('ChatCtrl', ['$scope', 'ChatService',
    function($scope, ChatService) {
      ChatService.setBackendCallback(function() {
        $scope.$apply();
      });
      $scope.messages = ChatService.messages;
     
      $scope.addMessage = function() {
        ChatService.addMessage($scope.todoText);
        $scope.todoText = '';
      };
     
    }]);