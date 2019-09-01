import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'interprete';

  data: any;
  separador: any = /\n/g;
  codeLines: any;
  codeWords: any = [];


  obtenerData(){
    console.log(this.data);
    this.codeLines = this.data.split(this.separador);
    console.log(this.codeLines);

    this.getReservedWords();
  }

  getReservedWords(){
    for(let i = 0; i < this.codeLines.length; i++){
      let aux = this.codeLines[i].split('(');

      this.codeWords.push(aux[0].trim());
    }

    console.log(this.codeWords);
  }

}
