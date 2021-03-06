import { Injectable } from '@angular/core';
import { Player } from './player';
import { Http, Response } from '@angular/http';

@Injectable()
export class PlayerService {
  private playersUrl = '/api/players';

  constructor(private http: Http) {
    }

  // get("/api/player/:id")
  getPlayer(playerId: String): Promise<void | Player> {
    return this.http.get(this.playersUrl + "/" + playerId)
               .toPromise()
               .then(response => response.json() as Player)
               .catch(this.handleError);
            
  }

  // get("/api/players")
  getPlayers(): Promise<void | Player[]> {
    return this.http.get(this.playersUrl)
               .toPromise()
               .then(response => response.json() as Player[])
               .catch(this.handleError);
            
  }

  getColumns(): string[] {
    return ["Name","Rank","Score","Time","Favorite Game","Status"]
  }

  // post("/api/players")
  createPlayer(newPlayer: Player): Promise<void | Player> {
    return this.http.post(this.playersUrl, newPlayer)
               .toPromise()
               .then(response => response.json() as Player)
               .catch(this.handleError);
  }

  // delete("/api/players/:id")
  deletePlayer(delPlayerId: String): Promise<void | String> {
    return this.http.delete(this.playersUrl + '/' + delPlayerId)
               .toPromise()
               .then(response => response.json() as String)
               .catch(this.handleError);
  }

  // put("/api/players/:id")
  updatePlayer(putPlayer: Player): Promise<void | Player> {
    var putUrl = this.playersUrl + '/' + putPlayer._id;
    return this.http.put(putUrl, putPlayer)
               .toPromise()
               .then(response => response.json() as Player)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
