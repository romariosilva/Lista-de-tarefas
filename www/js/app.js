// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('mainController', function($scope, $ionicPopup, $ionicListDelegate){
  //instacio o tarefa controle
  var tarefa = new getTarefas();

  $scope.lista = tarefa.items;
  $scope.marcado = false;
  $scope.remover = false;

  
  function getItem(item, novo){
    $scope.data = {};
    $scope.data.novaTarefa = item.nome;

    $ionicPopup.show({
      title: "Nova Tarefa",
      scope: $scope,
      template: "<input type='text' placeholder='Digite a tarefa' autofocus='true' ng-model='data.novaTarefa'>",
      buttons: [
        {text: "OK",
         onTap: function(e){
           item.nome = $scope.data.novaTarefa;
           if(novo)
            tarefa.add(item);

            tarefa.save();
         }},
        {text: "Cancelar"} 
      ]
    });
    $ionicListDelegate.closeOptionButtons();
  }

  //Quando o itemMarcado for clicado, o item.finalizada será true, retornando true para a lista
  $scope.itemEscondido = function(item){
    return item.finalizada && !$scope.marcado;
  }

  //item.finalizada está recebendo true, quando clicado irá receber o valor contrário e assim por diante
  $scope.itemMarcado = function(item){
    item.finalizada = !item.finalizada;
    tarefa.save();
  }

  //Mostra os ícones para remover
  $scope.mostrarRemover = function(){
    return $scope.remover = !$scope.remover;
  }

  //Função para remover cada tarefa, integrada com a função remove de TarefasControle
  $scope.removerItem = function(item){
    tarefa.remove(item);
    tarefa.save();
  }

  $scope.adcionarItem = function(){
    var item = {nome: "", finalizada:false};
    getItem(item, true);
  }

  $scope.editarItem = function(item){
    getItem(item, false);
  }
});
