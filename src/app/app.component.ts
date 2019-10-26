import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'interprete';

  data: any;//Entrada del texto
  errors: any = [];
  closedParenthesis: any = /(\))/;
  insideParenthesis: any = /\(([^)]+)\)/;
  codeWords: any = [];//Código ya separado en array por funciones
  codeParenthesis: any = [];
  errorsString: string;
  codeFunctions: any = [];//Código ya separado en array por funciones
  functionsErros: any = [];
  reservedWords: any = ['DibujarCara', 'EliminarCara', 'Dormir', 'CambiarModo'];
  arrayTipos: any = ['triste', 'enojada', 'feliz', 'dormida', 'neutral'];
  radio: any = [];
  width: any = [];
  height: any = [];
  tipoCara: any = [];
  nombreCara: any = [];
  coordX: any = [];
  coordY: any = [];
  

  obtenerData(){
    document.getElementById('drawingArea').innerHTML = '';
    this.errors = [];
    this.errorsString = '';
    this.nombreCara = [];
    var singleStringCode = this.data.replace(/\n/g, ' ');//El código de entrada en una sola línea de código
    var splitten = singleStringCode.match("Inicio(.*)Fin");;

    if(!splitten){
      this.errors.push('Error, no se detectan delimitadores de inicio y fin.');
    }
    else{
      //console.log(splitten[1]);
      this.getReservedWords(splitten[1]);
    }


    if(this.errors.length > 0){
      this.printErros();
    }
    
  }

  getReservedWords(singleStringCode){
    this.codeWords =[];
    this.codeWords = singleStringCode.split(')');
    for(let i = 0; i < this.codeWords.length; i++){
      this.codeWords[i] = this.codeWords[i].replace(/ /g, '');
      this.codeWords[i] = this.codeWords[i].replace(/\t/g, '');
    }

    if(this.codeWords[this.codeWords.length-1] == ''){
      this.codeWords.pop();
    }
    for(let i = 0; i < this.codeWords.length; i++){
      if(this.codeWords[i] != ''){
        this.codeWords[i] += ')';
      } 
    }
    //console.log(this.codeWords);
    this.verifyFunctions(this.codeWords);
    
  }

  verifyFunctions(codeWords){
    //console.log(codeWords);
    this.codeFunctions = [];
    this.functionsErros = [];
    let correct = true;
    for(let i = 0; i < codeWords.length; i++){
      if(codeWords[i].indexOf('(') && this.occurrences(codeWords[i], '(', false)==1){
        this.codeFunctions.push(codeWords[i].slice(0, codeWords[i].indexOf('(')));
        if(this.reservedWords.some(x => x === codeWords[i].slice(0, codeWords[i].indexOf('('))))
          this.functionsErros.push('0');
        else{
          this.functionsErros.push('2');
          this.errors.push('Error en línea ' + (i+3) +  ', palabra desconocida.');
          correct = false;
        }
        
      }
      else{
        //console.log(codeWords[i])
        this.functionsErros.push('1');
        this.errors.push('Error en línea ' + (i+3) +  ', declaración de función incorrecta.');
        correct = false;
      }

    }
    //console.log(correct);
    if(correct){
      this.execute();
    }
  }

  printErros(){
    this.errorsString = '';
    if(this.errors.length > 0){
      for(let i = 0; i<this.errors.length; i++){
        this.errorsString += this.errors[i] + '\n';
      }
    }
    else{
      this.errorsString = 'Sin errores de sintaxis.';
      this.execute();
    }
  }

  execute(){
    var regExp = /\(([^)]+)\)/;
    var matches = [];
    var auxArray = [];
    for(let i = 0; i < this.codeFunctions.length; i++){//'DibujarCara', 'EliminarCara', 'Dormir', 'CambiarModo'

      switch(this.codeFunctions[i]){
        case 'DibujarCara':
          matches = regExp.exec(this.codeWords[i]);
          auxArray = matches[1].split(',');
          //console.log('dibujando cara');
          this.drawFace(auxArray[0], auxArray[1], auxArray[2], auxArray[3], auxArray[4], i);
        break;

        case 'EliminarCara':
          matches = regExp.exec(this.codeWords[i]);
          auxArray = matches[1].split(',');
          //console.log('eliminando cara');

        break;

        case 'Dormir':
          matches = regExp.exec(this.codeWords[i]);
          //console.log('durmiendo');
          let time = matches[1] * 1000;
          this.sleep(time);
 
        break;

        case 'CambiarModo':
          matches = regExp.exec(this.codeWords[i]);
          auxArray = matches[1].split(',');
          //console.log('cambio modo');

        break;

        default:


        break;
      }
    }
  }

  drawFace(coordX, coordY, radio, nombreCara, tipoCara, linea){

    let domObject = '';
    let drawingArea = document.getElementById('drawingArea');
    if(this.nombreCara.some(x => x === nombreCara)){
      this.errorsString += 'Error en línea ' + (linea+3) + ' el nombre ' + nombreCara + ' ya ha sido utilizado\n';
    }
    else{
      console.log(radio);
      if(((coordX - radio>=0) && (Number(coordX) + Number(radio) <= 300)) && ((Number(coordY) - Number(radio)>=0) && (Number(coordY) + Number(radio) <= 300))){
        this.nombreCara.push(nombreCara);
        var div = document.createElement("div");
        div.style.width = (radio*2)+'px';
        div.style.height =(radio*2)+'px';
        div.style.marginBottom = coordY + 'px';
        div.style.marginLeft = coordX + 'px';
        div.style.position = 'absolute';
        div.style.background = 'url(../assets/'+ tipoCara +'.svg)';
        div.innerHTML = '<h5>'+nombreCara+'</h5>';
        console.log(div);
        document.getElementById("drawingArea").appendChild(div);
      }
    }
  }

  occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  
  
}

/*Programa Ejercicio
Inicio
   DibujarCara (30,30,20, Sofia, enojada)
   DibujarCara (50,100,20, Carlos,feliz)
   Dormir(2)
   DibujarCara(120, 50, 20, Arturo,neutral)
   Dormir(2)
   CambiarModo(Sofia,neutral)  
   Dormir(2)
   CambiarModo(Carlos,triste)
   Dormir(2)
   CambiarModo( Arturo , triste)
   Dormir(2)
   CambiarModo(Sofia,dormida)  
   Dormir(2)
   CambiarModo(Carlos,enojada)
   Dormir(2)
   CambiarModo( Arturo , feliz )
   Dormir(2)
   EliminarCara(Carlos)
   Dormir(2)
   EliminarCara(Sofia)
   Dormir(2)
   DibujarCara(30,50,30, Azucena, feliz)
   Dormir(2)
   CambiarModo(Sofia,feliz)
   Dormir(2)
Fin
*/