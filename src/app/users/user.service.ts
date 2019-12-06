import { Injectable } from '@angular/core';
import { User } from './user'
import { Http, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }
}
