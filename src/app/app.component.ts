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
  winner: string = "";

  constructor() {
    this.createBoard(this.width, this.height);
  }

  createBoard(w: number, h: number) {
    this.board = [];
    for (let i = 0; i < h; i++) {
      this.board.push(new Array(w).fill(""));
    }
  }

  cellClick(i: number, j: number) {
    console.log('cell clicked', i, j);
    if (this.board[i][j] == "") this.board[i][j] = "O";

    if (this.checkForFive(this.board, "O")) {
      this.score++;
      this.checkForWinner();
    }

    this.compWinMove(i, j)
  }

  save(w: string, h: string, s: string) {
    console.log('save', w, h, s);
    if (w != "") this.width = parseInt(w);
    if (h != "") this.height = parseInt(h);
    if (s != "") this.maxScore = parseInt(s);

    this.score = 0;
    this.compScore = 0;

    this.createBoard(this.width, this.height);
  }

  restart() {
    this.score = 0;
    this.compScore = 0;
    this.maxScore = 10;
    this.width = 10;
    this.height = 10;
    this.createBoard(this.width, this.height);
    this.winner = "";
  }

  compWinMove(i: number, j: number) {
    // Check for three O's in a row
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width - 2; j++) {
        if (this.board[i][j] === "O" && this.board[i][j+1] === "O" && this.board[i][j+2] === "O") {
          if (j > 0 && this.board[i][j-1] === "") {
            this.board[i][j-1] = "X";
            return;
          } else if (j < this.width - 3 && this.board[i][j+3] === "") {
            this.board[i][j+3] = "X";
            return;
          }
        }
      }
    }
  
    // Check for three O's in a column
    for (let j = 0; j < this.width; j++) {
      for (let i = 0; i < this.height - 2; i++) {
        if (this.board[i][j] === "O" && this.board[i+1][j] === "O" && this.board[i+2][j] === "O") {
          if (i > 0 && this.board[i-1][j] === "") {
            this.board[i-1][j] = "X";
            return;
          } else if (i < this.height - 3 && this.board[i+3][j] === "") {
            this.board[i+3][j] = "X";
            return;
          }
        }
      }
    }
  
    // Check for three O's in a diagonal (top-left to bottom-right)
    for (let i = 0; i < this.height - 2; i++) {
      for (let j = 0; j < this.width - 2; j++) {
        if (this.board[i][j] === "O" && this.board[i+1][j+1] === "O" && this.board[i+2][j+2] === "O") {
          if (i > 0 && j > 0 && this.board[i-1][j-1] === "") {
            this.board[i-1][j-1] = "X";
            return;
          } else if (i < this.height - 3 && j < this.width - 3 && this.board[i+3][j+3] === "") {
            this.board[i+3][j+3] = "X";
            return;
          }
        }
      }
    }
  
    // Check for three O's in a diagonal (bottom-left to top-right)
    for (let i = 2; i < this.height; i++) {
      for (let j = 0; j < this.width - 2; j++) {
        if (this.board[i][j] === "O" && this.board[i-1][j+1] === "O" && this.board[i-2][j+2] === "O") {
          if (i < this.height - 1 && j > 0 && this.board[i+1][j-1] === "") {
            this.board[i+1][j-1] = "X";
            return;
          }
        }
      }
    }

    this.compMove(i, j);
  }
  

  compMove(i: number, j: number) {
    const pos = this.getNextPosition(i, j);
    if (pos) {
      const [x, y] = pos;
      this.board[x][y] = "X";
      if (this.checkForFive(this.board, "X")) {
        this.compScore++;
        this.checkForWinner();
      }
      return;
    }
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.board[i][j] == "") {
          this.board[i][j] = "X";
          if (this.checkForFive(this.board, "X")) {
            this.compScore++;
            this.checkForWinner();
          }
          return;
        }
      }
    }
  }

  getNextPosition(i: number, j: number){
    const positions = [
      [i-1, j-1], [i-1, j], [i-1, j+1],
      [i, j-1], [i, j+1],
      [i+1, j-1], [i+1, j], [i+1, j+1]
    ];
  
    for (const pos of positions) {
      const [x, y] = pos;
      if (this.isValidMove(x, y)) {
        return pos;
      }
    }
  
    // If no valid positions found, return null
    return null;
  };

  isValidMove(i: number, j: number){
    return i >= 0 && i <= this.width && j >= 0 && j <= this.height && this.board[i][j] === '';
  };

  checkForFive(arr: Array<Array<string>>, letter: string): boolean {
    let smallLetter = letter.toLowerCase();
    // Check for five in a row
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width - 4; j++) {
        if (arr[i][j] === arr[i][j + 1] && arr[i][j] === arr[i][j + 2] && arr[i][j] === arr[i][j + 3] && arr[i][j] === arr[i][j + 4] && arr[i][j] === letter) {
          arr[i][j] = smallLetter;
          arr[i][j + 1] = smallLetter;
          arr[i][j + 2] = smallLetter;
          arr[i][j + 3] = smallLetter;
          arr[i][j + 4] = smallLetter;
          return true;
        }
      }
    }

    // Check for five in a column
    for (let j = 0; j < this.width; j++) {
      for (let i = 0; i < this.height - 4; i++) {
        if (arr[i][j] === arr[i + 1][j] && arr[i][j] === arr[i + 2][j] && arr[i][j] === arr[i + 3][j] && arr[i][j] === arr[i + 4][j] && arr[i][j] === letter) {
          arr[i][j] = smallLetter;
          arr[i + 1][j] = smallLetter;
          arr[i + 2][j] = smallLetter;
          arr[i + 3][j] = smallLetter;
          arr[i + 4][j] = smallLetter;
          return true;
        }
      }
    }

    // Check for five in a diagonal (top-left to bottom-right)
    for (let i = 0; i < this.height - 4; i++) {
      for (let j = 0; j < this.width - 4; j++) {
        if (arr[i][j] === arr[i + 1][j + 1] && arr[i][j] === arr[i + 2][j + 2] && arr[i][j] === arr[i + 3][j + 3] && arr[i][j] === arr[i + 4][j + 4] && arr[i][j] === letter) {
          arr[i][j] = smallLetter;
          arr[i + 1][j + 1] = smallLetter;
          arr[i + 2][j + 2] = smallLetter;
          arr[i + 3][j + 3] = smallLetter;
          arr[i + 4][j + 4] = smallLetter;
          return true;
        }
      }
    }

    // Check for five in a diagonal (bottom-left to top-right)
    for (let i = 4; i < this.height; i++) {
      for (let j = 0; j < this.width - 4; j++) {
        if (arr[i][j] === arr[i - 1][j + 1] && arr[i][j] === arr[i - 2][j + 2] && arr[i][j] === arr[i - 3][j + 3] && arr[i][j] === arr[i - 4][j + 4] && arr[i][j] === letter) {
          arr[i][j] = smallLetter;
          arr[i - 1][j + 1] = smallLetter;
          arr[i - 2][j + 2] = smallLetter;
          arr[i - 3][j + 3] = smallLetter;
          arr[i - 4][j + 4] = smallLetter;
          return true;
        }
      }
    }

    return false;
  }

  checkForWinner() {
    if (this.score >= this.maxScore) {
      this.winner = "You win!";
    }
    else if (this.compScore >= this.maxScore) {
      this.winner = "Computer wins!";
    }
    console.log(this.winner);
  }
}
