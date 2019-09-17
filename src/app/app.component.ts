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



  obtenerData(){
    var singleStringCode = this.data.replace(/\n/g, ' ');//El código de entrada en una sola línea de código
    console.log(singleStringCode);
    var splitten = singleStringCode.match("Inicio(.*)Fin");;

    if(!splitten){
      this.errors.push('Error, no se detectan delimitadores de inicio y fin.');
    }
    else{
      console.log(splitten[1]);
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
    console.log(this.codeWords);
    this.verifyFunctions(this.codeWords);
    this.drawFace();
  }

  verifyFunctions(codeWords){
    this.codeFunctions = [];
    this.functionsErros = [];
    for(let i = 0; i < codeWords.length; i++){
      if(codeWords[i].indexOf('(')){
        this.codeFunctions.push(codeWords[i].slice(0, codeWords[i].indexOf('(')));
        if(this.reservedWords.some(x => x === codeWords[i].slice(0, codeWords[i].indexOf('('))))
          this.functionsErros.push('0');
        else
        this.functionsErros.push('2');
      }
      else{
        this.functionsErros.push('1');
      }

    }
    console.log(this.codeFunctions);
    console.log(this.functionsErros);
  }

  printErros(){
    this.errorsString = '';
    console.log(this.errors);
    if(this.errors.length)
    for(let i = 0; i<this.errors.length; i++){
      this.errorsString += this.errors[i] + '\n';
    }
    console.log(this.errorsString);
  }

  drawFace(){
    let cx = document.querySelector("canvas").getContext("2d");
    let neutral = document.createElement("svg");
    neutral.innerHTML = '<circle class="cls-1" cx="250" cy="250" r="239"/><path class="cls-2" d="M399,180.81a50.38,50.38,0,1,1-100.76,0"/><path class="cls-2" d="M201.4,180.81a50.38,50.38,0,1,1-100.75,0"/><circle class="cls-3" cx="250" cy="350" r="33"/><text class="cls-4" transform="translate(250 90.18)"><tspan xml:space="preserve">nouhuihsh</tspan></text>';

    console.log(neutral);
  }
  
}
