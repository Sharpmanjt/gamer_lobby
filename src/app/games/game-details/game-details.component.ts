import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { isNull } from 'util';

@Component({
  selector: 'game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  @Input()
  game: Game;
  errTitle: String;
  errPlatform: String;
  errGenre: String;
  errRating: String;
  errPublisher: String;
  errRelease: String;
  errStatus: String;
  valCheck:boolean;
  userIsAdmin: boolean;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { this.userIsAdmin = localStorage.getItem("admin") === "true"; }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      switch (data.kind){
        case "add":
          this.game = { title: "", platform:  "", genre:  "", rating: 1, 
            publisher: "", release: "", status: "" }
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

  validationCheck(game: Game) : boolean
  {
    this.valCheck = true;
    if(game.title=="")
    {
      this.errTitle = "Please enter a valid title.";
      this.valCheck = false;
    } else {
      this.errTitle = "";
    }

    if(game.publisher=="")
    {
      this.errPublisher = "Please enter a valid publisher.";
      this.valCheck = false;
    } else {
      this.errPublisher = "";
    }

    if(game.genre=="")
    {
      this.errGenre = "Please select a genre.";
      this.valCheck = false;
    } else {
      this.errGenre = "";
    }

    if(game.platform=="")
    {
      this.errPlatform = "Please enter a valid publisher.";
      this.valCheck = false;
    } else {
      this.errPlatform = "";
    }

    if(game.release=="" || isNaN(Number(game.release)))
    {
      this.errRelease = "Please enter a valid release year.";
      this.valCheck = false;
    } else {
      this.errRelease = "";
    }

    if(isNull(game.status))
    {
      this.errStatus = "Please enter a valid availability.";
      this.valCheck = false;
    } else {
      this.errStatus = "";
    }

    return this.valCheck;
  }

  createGame(game: Game){
    if(this.validationCheck(game)){
      this.gameService.createGame(game).then((newGame: Game) =>{
        this.router.navigate(['/gameList']);
      })
    }
  }

  updateGame(game: Game){
    if(this.validationCheck(game))
    {
      this.game = game;
      this.gameService.updateGame(game).then((updatedGame: Game) => {
        this.router.navigate(['/gameList']);
      });
    }
  }
  
  cancel(): void {
    this.location.back();
  }
}
