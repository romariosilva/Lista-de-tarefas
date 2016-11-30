function getTarefas(){
    this.items = [];

    //Carregar os items que estão no storage para a tela
    var lista = localStorage.getItem('listaTarefas');

    if(lista !== null)
        this.items = angular.fromJson(lista);


    //Criar o listaTarefas como a chave e o valor será os items convertivos em string formato Json
    this.save = function(){
        var lista = angular.toJson(this.items);
        localStorage.setItem('listaTarefas', lista);
    }    
    
    //Irá receber a item onde irá retirar do array por meio de sua posição.
    this.remove = function(item){
        var pos = this.items.indexOf(item);
        this.items.splice(pos, 1);
    }  

    this.add = function(item){
        this.items.push(item);
    }          
}