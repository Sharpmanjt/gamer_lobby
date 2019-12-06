import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayerService } from '../player.service';
import * as _ from 'lodash';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
  providers: [PlayerService]
})
export class PlayerListComponent implements OnInit {
  players: Player[]
  selectedPlayer: Player
  displayedColumns: string[] = ['name', 'rank', 'score', 'time', 'favoriteGame', 'status', 'actions']
  dataSource: any;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.getPlayers();
  }

  getPlayers() {
    this.playerService
    .getPlayers()
    .then((players: Player[]) => {
      this.players = players.map((player) => {
        return player;
      })
      this.dataSource = new MatTableDataSource(players);
    })
    return this.players;
  }

  selectPlayer(player: Player){
    this.selectedPlayer = player;
  }

  deletePlayer = (playerId: String) => {
    this.playerService.deletePlayer(playerId).then(() => {
      this.getPlayers();
    });
  }

  //filtering of table
  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
