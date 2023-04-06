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
  board: Array<Array<string>> = [];

  constructor(){
    this.createBoard(this.width, this.height);
  }

  createBoard(w: number, h: number){
    this.board = [];
    for(let i = 0; i < h; i++){
      this.board.push(new Array(w).fill(""));
    }
  }

  cellClick(i: number, j: number){
    console.log('cell clicked', i, j);
    if(this.board[i][j] == "") this.board[i][j] = "O";
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
