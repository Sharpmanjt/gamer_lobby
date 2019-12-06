import { Injectable } from '@angular/core';
import { Game } from './game';
import { Http, Response } from '@angular/http';

@Injectable()
export class GameService {

  private gamesUrl = '/api/games';

  constructor(private http:Http) { }

  getGame(gameId: String): Promise<void | Game> {
    return this.http.get(this.gamesUrl + "/" + gameId)
               .toPromise()
               .then(response => response.json() as Game)
               .catch(this.handleError);
            
  }

  getGames(): Promise<void | Game[]> {
    return this.http.get(this.gamesUrl)
               .toPromise()
               .then(response => response.json() as Game[])
               .catch(this.handleError);
  }

  getColumns(): string[] {
    return ["Title","Platform","Genre","Rating","Publisher","Release", "Status"]
  }

  createGame(newGame: Game): Promise<void | Game> {
    console.log("got to create game method");
    return this.http.post(this.gamesUrl, newGame)
               .toPromise()
               .then(response => response.json() as Game)
               .catch(this.handleError);
  }

  deleteGame(delGameId: number): Promise<void | number> {
    return this.http.delete(this.gamesUrl + '/' + delGameId)
               .toPromise()
               .then(response => response.json() as number)
               .catch(this.handleError);
  }

  updateGame(putGame: Game): Promise<void | Game> {
    var putUrl = this.gamesUrl + '/' + putGame._id;
    return this.http.put(putUrl, putGame)
               .toPromise()
               .then(response => response.json() as Game)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }

}
