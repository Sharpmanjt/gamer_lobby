import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { GameService } from '../../games/game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Game } from 'src/app/games/game';

@Component({
  selector: 'player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css'],
  providers: [PlayerService, GameService]
})
export class PlayerDetailsComponent implements OnInit{
  valPlayerCheck: boolean;
  errName: string;
  errRank: string;
  errScore: string;
  errTime: string;
  errFavoriteGame: string;
  errStatus: string;
  userIsAdmin: boolean;

  @Input()
  player: Player;

  playerJoinGame: boolean;
  games: Game[];
  ranks: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private playerService: PlayerService,
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { this.userIsAdmin = localStorage.getItem("admin") === "true";}

  ngOnInit(): void {
    this.userIsAdmin = localStorage.getItem("admin") === "true";
    if(this.userIsAdmin)
    {
      this.router.navigate(['/playerList'], { skipLocationChange: false });
    }
    this.route.data.subscribe(data => {
      switch (data.kind){
        case "add":
          this.player = { name: '', rank: '', score: "", time: '', favoriteGame: '', status: -1, currentGame: '' };
          break;
        case "update":
          this.getPlayer();
          break;
        case "join":
          this.getPlayer();
          this.playerJoinGame = true;
          break;
      }
      this.getGames();
    })  
  }

  validationCheck(player: Player) : boolean
  {
    this.valPlayerCheck = true;
    if(player.name=="")
    {
      this.errName = "Please enter a valid name.";
      this.valPlayerCheck = false;
    } else {
      this.errName = "";
    }

    if(player.rank=="")
    {
      this.errRank = "Please select a rank.";
      this.valPlayerCheck = false;
    } else {
      this.errRank = "";
    }

    if(player.favoriteGame=="")
    {
      this.errFavoriteGame = "Please enter a favorite game.";
      this.valPlayerCheck = false;
    } else {
      this.errFavoriteGame = "";
    }

    if(player.score == "" || isNaN(Number(player.score)))
    {
      this.errScore = "Please enter a valid score.";
      this.valPlayerCheck = false;
    } else {
      this.errScore = "";
    }

    if(player.time == "")
    {
      this.errTime = "Please enter a valid amount of time.";
      this.valPlayerCheck = false;
    } else {
      this.errTime = "";
    }

    if(player.status == -1 || isNaN(player.status))
    {
      this.errStatus = "Please enter a valid availability.";
      this.valPlayerCheck = false;
    } else {
      this.errStatus = "";
    }

    if(this.playerJoinGame && player.currentGame == "")
    {
      this.errStatus = "Please enter a valid game.";
      this.valPlayerCheck = false;
    } else {
      this.errStatus = "";
    }

    return this.valPlayerCheck;
  }

  getGames(){
    this.gameService.getGames()
    .then((games: Game[]) => {
      this.games = games.map((game) => {
        return game;
      })
    })
    return this.games;
  }

  getPlayer() {
    const id = this.route.snapshot.paramMap.get('id');
    this.playerService
    .getPlayer(id)
    .then((player: Player) => {
      this.player = player;
    })
    return this.player;
  }
  
  createPlayer(player: Player){
    if(this.validationCheck(player))
    {
      this.playerService.createPlayer(player).then((newPlayer: Player) => {
        this.router.navigate(['/playerList']);
      });
    }
  }

  updatePlayer(player: Player): void {
    if(this.validationCheck(player))
    {
      this.player = player;
    this.playerService.updatePlayer(player).then((updatedPlayer: Player) => {
      this.router.navigate(['/playerList']);
    });
    }
  }

  joinGame(player: Player): void {
    if(this.validationCheck(player)){
      this.player = player;
      this.player.status = 0;
      this.playerService.updatePlayer(player).then((updatePlayer: Player) => {
        this.router.navigate(['/playerList']);
      })
    }
  }

  cancel(): void {
    this.location.back();
  }
}
