$(document).ready(function() {
    if (!Raphael.svg) {
        window.location = './notsupported.html';
    }

    // suppress select events
    $(window).bind('selectstart', function(event) {
        event.preventDefault();
    });
    
    // initialize visualization
    Panel.init();
    Controller.init();
});

var input = document.getElementById("input");
var store = document.getElementById("store");
var drawArea = document.getElementById("draw_area");
var grid_width = document.getElementById("grid_x");
var grid_height = document.getElementById("grid_y");
var tile_Size = document.getElementById("tile_size");
var set_Node_Size = 30;
var grid_size_x = 64;
var grid_size_y = 36;
var storeArray = [];
var enterStoreMode = false;





submit.onclick= function(){

    enterStoreMode = false;

    drawArea.style.backgroundImage = 'url("' + input.value + '")';
    $("rect").remove();
    View.startNode = false;
    View.endNode = false;
    View.nodeSize = tile_Size.value;
    Controller.gridSize[0] = grid_width.value;
    Controller.gridSize[1] = grid_height.value;
    
    var numCols = Controller.gridSize[0],
        numRows = Controller.gridSize[1];

    Controller.grid = new PF.Grid(numCols, numRows);
    

    View.init({
        numCols: grid_width.value,
        numRows: grid_height.value
    });

    View.generateGrid(function() {
        Controller.setDefaultStartEndPos();
        Controller.bindEvents();
        //Controller.transition(); // transit to the next state (ready)
    });
}
   
addStore.onclick= function(){
    alert("Select coordinates on grid");     
    enterStoreMode = true;   
    
    console.log(storeArray);
}

exportStore.onclick= function(){
    var jsonStore = JSON.stringify(storeArray);

    download("Store.json", jsonStore);
}

get_array.onclick= function(){
    var gridArray = Controller.grid;
    var jsonGrid = JSON.stringify(gridArray);

    download("Grid.json",jsonGrid);
}

function getStore(gridX, gridY){
    if(enterStoreMode == true){
        var name = prompt("Enter store name");
        storeArray.push({
            x: gridX,
            y: gridY,
            name: name
        });
        enterStoreMode = false;
    }
    Controller.rest();
    return;
    
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

 