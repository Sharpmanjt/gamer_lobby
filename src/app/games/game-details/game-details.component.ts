import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  @Input()
  game: Game;
  errormsg: String;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      switch (data.kind){
        case "add":
          this.game = { title: "", platform:  "", genre:  "", rating: 1, 
            publisher: "", release: "", status: false }
          break;
        case "update":
          this.getGame();
          break;
      }
    })  
  }

  getGame() {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameService
    .getGame(id)
    .then((game: Game) => {
      this.game = game;
    })
    return this.game;
  }

  createGame(game: Game){
    if(game.title=="")
    {
      console.log("error");
      this.errormsg = "no title";
    }
    else{
      this.gameService.createGame(game).then((newGame: Game) =>{
        this.router.navigate(['/gameList']);
      })
    }
  }

  updateGame(game: Game){
    this.game = game;
    this.gameService.updateGame(game).then((updatedGame: Game) => {
      this.router.navigate(['/gameList']);
    });
  }
  
  cancel(): void {
    this.location.back();
  }
}
