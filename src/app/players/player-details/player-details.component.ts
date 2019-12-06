import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit{
  @Input()
  player: Player;

  playerJoinGame: boolean;

  constructor(
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      switch (data.kind){
        case "add":
          this.player = { name: '', rank: '', score: 0, time: '', favoriteGame: '', status: '', currentGame: '' };
          break;
        case "update":
          this.getPlayer();
          break;
        case "join":
          this.getPlayer();
          this.playerJoinGame = true;
          break;
      }
    })  
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
    this.playerService.createPlayer(player).then((newPlayer: Player) => {
      this.router.navigate(['/playerList']);
    });
  }

  updatePlayer(player: Player): void {
    this.player = player;
    this.playerService.updatePlayer(player).then((updatedPlayer: Player) => {
      this.router.navigate(['/playerList']);
    });
  }

  joinGame(player: Player): void {
    this.player = player;
  }

  cancel(): void {
    this.location.back();
  }
}
