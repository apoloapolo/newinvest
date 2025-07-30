import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import User from '../shared/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  readonly userUrl = 'http://localhost:8000/usuario';
  readonly tokenUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${email}/${senha}/`);
  }

  cadastro(user: User): Observable<User> {
    return this.http.post<User>(`${this.userUrl}/`, user);
  }
}
