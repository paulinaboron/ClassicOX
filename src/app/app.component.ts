import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClassicOX';
  score = 0;
  compScore = 0;
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

    if(this.checkForFive(this.board, "O")){
      this.score++;
    }

    this.compMove()
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

  compMove(){
    for(let i = 0; i < this.height; i++){
      for(let j=0; j < this.width; j++){
        if(this.board[i][j] == ""){
          this.board[i][j] = "X";
          if(this.checkForFive(this.board, "X")){
            this.compScore++;
          }
          return;
        }
      }
    }
  }

  checkForFive(arr: Array<Array<string>>, letter: string):boolean{
    let smallLetter = letter.toLowerCase();
    // Check for five in a row
  for (let i = 0; i < this.height; i++) {
    for (let j = 0; j < this.width - 4; j++) {
      if (arr[i][j] === arr[i][j+1] && arr[i][j] === arr[i][j+2] && arr[i][j] === arr[i][j+3] && arr[i][j] === arr[i][j+4] && arr[i][j] === letter) {
        arr[i][j] = smallLetter;
        arr[i][j+1] = smallLetter;
        arr[i][j+2] = smallLetter;
        arr[i][j+3] = smallLetter;
        arr[i][j+4] = smallLetter;
        return true;
      }
    }
  }

  // Check for five in a column
  for (let j = 0; j < this.width; j++) {
    for (let i = 0; i < this.height - 4; i++) {
      if (arr[i][j] === arr[i+1][j] && arr[i][j] === arr[i+2][j] && arr[i][j] === arr[i+3][j] && arr[i][j] === arr[i+4][j] && arr[i][j] === letter) {
        arr[i][j] = smallLetter;
        arr[i+1][j] = smallLetter;
        arr[i+2][j] = smallLetter;
        arr[i+3][j] = smallLetter;
        arr[i+4][j] = smallLetter;
        return true;
      }
    }
  }

  // Check for five in a diagonal (top-left to bottom-right)
  for (let i = 0; i < this.height - 4; i++) {
    for (let j = 0; j < this.width - 4; j++) {
      if (arr[i][j] === arr[i+1][j+1] && arr[i][j] === arr[i+2][j+2] && arr[i][j] === arr[i+3][j+3] && arr[i][j] === arr[i+4][j+4] && arr[i][j] === letter) {
        arr[i][j] = smallLetter;
        arr[i+1][j+1] = smallLetter;
        arr[i+2][j+2] = smallLetter;
        arr[i+3][j+3] = smallLetter;
        arr[i+4][j+4] = smallLetter;
        return true;
      }
    }
  }

  // Check for five in a diagonal (bottom-left to top-right)
  for (let i = 4; i < this.height; i++) {
    for (let j = 0; j < this.width - 4; j++) {
      if (arr[i][j] === arr[i-1][j+1] && arr[i][j] === arr[i-2][j+2] && arr[i][j] === arr[i-3][j+3] && arr[i][j] === arr[i-4][j+4] && arr[i][j] === letter) {
        arr[i][j] = smallLetter;
        arr[i-1][j+1] = smallLetter;
        arr[i-2][j+2] = smallLetter;
        arr[i-3][j+3] = smallLetter;
        arr[i-4][j+4] = smallLetter;
        return true;
      }
    }
  }

  return false;
  }
}
