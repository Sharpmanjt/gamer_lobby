import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import {Game} from '../game';
import { GameService } from '../game.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';

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

  
  constructor(private gameService: GameService) { }

  ngOnInit() {
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

  private getIndexOfGame = (gameId: number) => {
    return this.games.findIndex((game) => {
      return game._id === gameId;
    })
  }

  selectGame(game: Game){
    this.selectedGame = game;
  }

  createNewGame()
  {
    var game: Game = {
      title: "",
      platform:  "",
      genre:  "",
      rating: 1,
      publisher: "",
      release: "",
      status: false
    }

    this.selectedGame = game;
  }

  deleteGame = (gameID: number) => {
    this.gameService.deleteGame(gameID).then(() => {
      this.getGames();
    });
  }


  addGame = (game: Game) => {
    this.selectGame(game);
    console.log("game created");
    this.getGames();
    console.log("get games successful");
  }

  updateGame = (game:Game) => {
    var index = this.getIndexOfGame(game._id);
    if(index !== -1){
      this.games[index] = game;
      this.selectGame(game);
    }
    return this.games;
  }

  applyFilter(key: String){
    this.dataSource.filter = key.trim().toLowerCase();
  }
}
