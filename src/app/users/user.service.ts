import { Injectable } from '@angular/core';
import { User } from './user'
import { Http, Request } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = '/api/users';

  constructor(private http: Http) { }

  getUser(username: String): Promise<void | User> {
    console.log(this.http.post(this.usersUrl, username)
    .toPromise()
    .then(response => response.json() as User));

    return this.http.post(this.usersUrl, username)
               .toPromise()
               .then(response => response.json() as User)
               .catch(this.handleError);
            
  }

  /*getUsers(): Promise<void | User[]> {
    return this.http.post(this.usersUrl)
               .toPromise()
               .then(response => response.json() as User[])
               .catch(this.handleError);
            
  }*/

  createUser(newUser: User): Promise<void | User> {
    return this.http.post(this.usersUrl, newUser)
               .toPromise()
               .then(response => response.json() as User)
               .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
