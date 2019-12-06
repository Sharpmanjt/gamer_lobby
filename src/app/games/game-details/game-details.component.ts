import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {

  @Input()
  game: Game;

  @Input()
  createHandler: Function;

  @Input()
  updateHandler: Function;

  @Input()
  deleteHandler: Function;

  constructor(private gameService: GameService) {}

    createGame(game: Game){
      this.gameService.createGame(game).then((newGame: Game) =>{
        this.createHandler(newGame);
      })
    }

    updateGame(game: Game){
      this.gameService.updateGame(game).then((updatedGame: Game) => {
      this.updateHandler(updatedGame);
    });
  }
    deleteGame(gameId: number)
    {
      this.gameService.deleteGame(gameId).then((deletedGameId: number) =>{
        this.deleteHandler(deletedGameId)
      })
    }
  
  ngOnInit() {
  }

}
