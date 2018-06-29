var colores = ["R", "B" ,"G" ,"Y", "P", "O"];
var coloresGame=[null, null, null, null];
var coloresPlayer = [null, null, null, null];
var findOk = false;
$.generaColoresRep = function(){
    for(var i = 0; i<4; i++){
        coloresGame[i]=colores[Math.floor(Math.random()*6)];
    }  
    var coloresGameCopy = [coloresGame[0], coloresGame[1], coloresGame[2], coloresGame[3]];
}
$.generaColoresSinRep = function(){
    var pos; // 0<x<6
     var i = 0;
    do{
        //Math.random() // [0,1) colores[10] = undefined
        
        pos = Math.floor(Math.random() * (5 - 0 + 1)) + 0; // [0, 5])
        if(colores[pos] != null){
            coloresGame[i]=colores[pos];
            colores[pos]=null;
            i++;
        }
        
    }while(i<4);

    var coloresGameCopy = [coloresGame[0], coloresGame[1], coloresGame[2], coloresGame[3]];
}

var posPlayer = 0;
var filaGame = 1;
var maxTamanoJugada = 4;
var blanco = 0;
var negro = 0;

$.accionJugador = function(){
    posPlayer++;
    $.coloreaJugada(filaGame);

    if(posPlayer===maxTamanoJugada){
        $.validaSolucion();
        $.pintaPista(filaGame);
        if(blanco === 4){
            alert("Enhorabuena ha ganado.\n"+coloresGame[0]+coloresGame[1]+coloresGame[2]+coloresGame[3] + "\nPulse F5 para jugar otra vez.");

        }else if(filaGame === 10){
            alert("Ups! Ha perdido. F5 para jugar de nuevo.\n"+coloresGame[0]+coloresGame[1]+coloresGame[2]+coloresGame[3]);
        }
        posPlayer = 0;
        blanco = 0;
        negro = 0;
        coloresPlayer = [null, null, null, null];
        filaGame++;
    }
}

$.validaSolucion = function(){
coloresGameCopy = [coloresGame[0], coloresGame[1], coloresGame[2], coloresGame[3]];
for(var i = 0; i<maxTamanoJugada; i++){
    if(coloresGame[i]===coloresPlayer[i]){
        coloresGameCopy[i] = null;
        coloresPlayer[i]=undefined;
        blanco++;
        
    }
}

}

//Comprobado y no funciona.
$.pintaPista = function(fila){
    var color = null;
    var white = blanco;
    var black = 0;
    var contBlack = 1;

    //Bucle que pinta tantos haciertos blancos como haya habido. Esos aciertos vienen del método valida solución.
    while(white >= 0){
        $("#pista"+fila+"_"+(white)).css('background-color', 'white');
        white--;
    }

    //alert(coloresGameCopy[0]+coloresGameCopy[1]+coloresGameCopy[2]+coloresGameCopy[3]);


    //Bucle que cuenta aciertos negros una vez puesto a null los blancos en el GameCopy.
    for(var i = 0; i<4; i++){
        findOk=false;
        for(var j = 0; j<4 && !findOk; j++){
            if(coloresPlayer[i]===coloresGameCopy[j]){
                coloresGameCopy[j]=null;
                black++;
                findOk=true;
            }
        }
    }

    //alert(coloresGameCopy[0]+coloresGameCopy[1]+coloresGameCopy[2]+coloresGameCopy[3]);
    //alert(black);
    //Bucle que pinta tantos haciertos negros como haya habido.
    while(black > 0){
        color = $("#pista"+fila+"_"+(contBlack)).css('background-color');
        //alert(color);
        if (color !== 'rgb(255, 255, 255)') {
            $("#pista"+fila+"_"+(contBlack)).css('background-color', 'black');
            black--;
        }
        contBlack++;
    }
}

//Comprobado y funciona.
$.game = function(){
    
        $("#red").click(function(){
             coloresPlayer[posPlayer]="R";
               $.accionJugador();
            
        });

        $("#blue").click(function(){
            coloresPlayer[posPlayer]="B";
               $.accionJugador();
                
            
        });

        $("#green").click(function(){
            coloresPlayer[posPlayer]="G";
               $.accionJugador();
            
        });

        $("#yellow").click(function(){
                coloresPlayer[posPlayer]="Y";
               $.accionJugador();
            
        });

        $("#pink").click(function(){
                coloresPlayer[posPlayer]="P";
               $.accionJugador();
        });

        $("#orange").click(function(){
                coloresPlayer[posPlayer]="O";
               $.accionJugador();
            
        });
        }



//Comprobado y funciona.
$.coloreaJugada = function(fila){
    for(var i=0; i<=maxTamanoJugada; i++){
        switch(coloresPlayer[i]){
            case "R":
            $("#col"+fila+"_"+(i+1)).css('background-color', 'red');
            break;
            case "B":
            $("#col"+fila+"_"+(i+1)).css('background-color', 'blue');
            break;
            case "G":
            $("#col"+fila+"_"+(i+1)).css('background-color', 'green');
            break;
            case "Y":
            $("#col"+fila+"_"+(i+1)).css('background-color', 'yellow');
            break;
            case "P":
            $("#col"+fila+"_"+(i+1)).css('background-color', 'deeppink');
            break;
            case "O":
            $("#col"+fila+"_"+(i+1)).css('background-color', 'orange');
            break;
        }
    }

}


$.gameRep = function(){
    $("#btn_repeticion").click(function(){
        $.generaColoresRep();
        $.game();
    });
}

$.gameSinRep = function(){
    $("#btn_Sinrepeticion").click(function(){
        $.generaColoresSinRep();
        $.game();
    });

}


$(function(){

    $.gameRep();
    $.gameSinRep();
    

});

        
        
        