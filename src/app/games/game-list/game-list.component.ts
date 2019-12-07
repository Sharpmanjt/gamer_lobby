import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
  providers: [GameService]
})
export class GameListComponent implements OnInit {
  games: Game[];
  selectedGame: Game;
  displayedColumns: string[] = ["title","platform","genre","rating","publisher","release", "status", "actions"];
  dataSource: any;
  userIsAdmin: boolean;
  
  constructor(private gameService: GameService, private router: Router) 
  { this.userIsAdmin = localStorage.getItem("admin") === "true";}

  ngOnInit() {
    this.userIsAdmin = localStorage.getItem("admin") === "true";
    if(!this.userIsAdmin)
    {
      this.router.navigate(['/playerList'], { skipLocationChange: false });
    }
    this.getGames();
  }

  getGames(){
    this.gameService.getGames()
    .then((games: Game[]) => {
      this.games = games.map((game) => {
        return game;
      })
      this.dataSource = new MatTableDataSource(games);
    })
    return this.games;
  }

  selectGame(game: Game){
    this.selectedGame = game;
  }

  deleteGame = (gameId: number) => {
    this.gameService.deleteGame(gameId).then(() => {
      this.getGames();
    });
  }

  applyFilter(key: String){
    this.dataSource.filter = key.trim().toLowerCase();
  }
}
