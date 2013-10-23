angular.module('dojo-chat', [])
  .service('ChatService', [
    function() {
      var data = {
        messages: [
          {sender: 'XYZ', timestamp: 1382541399510, message:'learn angular'},
          {sender: 'XYZ', timestamp: 1382541399510, message:'build an angular app'}
        ]
      };
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
        data.messages.push(message);
        apply();
        console.log("received message");
        console.log(message);
      });

      var username = 'Touko';
      chat.login(username);
      chat.joinRoom('dojo');
      window.chat = chat;

      function addMessage(text) {
        var message = {
          message: text,
          timestamp: new Date().getTime(),
          sender: username
        }
        data.messages.push(message);
      }
      function setBackendCallback(callback) {
        backendCallback = callback;
      }
      return {
        data: data,
        addMessage: addMessage,
        setBackendCallback: setBackendCallback
      }
  }])
  .directive('message', function() {
    return {
      restrict: 'E',
      transclude: true,
      template: '<li><span>{{msg.message}}</span></li>'
    };
  })
  // <span>{{message.text}}</span>
  .controller('ChatCtrl', ['$scope', 'ChatService',
    function($scope, ChatService) {
      ChatService.setBackendCallback(function() {
        $scope.$apply();
      });
      $scope.data = ChatService.data;
     
      $scope.addMessage = function() {
        ChatService.addMessage($scope.todoText);
        $scope.todoText = '';
      };
     
    }]);