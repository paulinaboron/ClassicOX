import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClassicOX';
  score = 0;
  maxScore = 10;
  width = 10;
  height = 10;
  board: Array<Array<number>> = [];

  constructor(){
    this.createBoard(this.width, this.height);
  }

  createBoard(w: number, h: number){
    this.board = [];
    for(let i = 0; i < h; i++){
      this.board.push(new Array(w).fill(0));
    }
  }

  createRange(number: number){
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  cellClick(event: MouseEvent){
    console.log('cell clicked', event);
    if(event.target instanceof HTMLElement){
      event.target.innerText = 'O';
    }
  }

  save(w: string, h: string, s: string){
    console.log('save', w, h, s);
    if(w != "") this.width = parseInt(w);
    if(h != "") this.height = parseInt(h);
    if(s != "")this.maxScore = parseInt(s);

    this.createBoard(this.width, this.height);
  }

  restart(){
    this.score = 0;
    this.maxScore = 10;
    this.width = 10;
    this.height = 10;
    this.createBoard(this.width, this.height);
  }
}
