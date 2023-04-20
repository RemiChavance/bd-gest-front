import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.user.asObservable();

  private logoutMessage = new BehaviorSubject<boolean>(false);
  logoutMessage$: Observable<boolean> = this.logoutMessage.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): Observable<boolean> {    
    return this.http.post<any>(`${environment.apiURL}/auth/login`, {
      username,
      password
    }, { ...httpOptions, observe: 'response' }).pipe(      
      map(response => {
        if (!response.ok) return false;
        const loggedUser: User = response.body;
        this.user.next(loggedUser);
        this.saveUser(loggedUser);
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  register(username: string, email: string, password: string): Observable<boolean> {    
    return this.http.post<any>(`${environment.apiURL}/auth/register`, {
      username,
      email,
      password
    }, { ...httpOptions, observe: 'response' }).pipe(
      map(response => {
        if (!response.ok) return false;
        return response.body!.success;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  signOut() {
    localStorage.clear();
    this.user.next(null);
    this.logoutMessage.next(true);
    this.logoutMessage.next(false);
  }

  getToken() {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;
    const user: User = JSON.parse(storedUser); 
    return user.token;
  }

  private saveUser(user: User) {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserValue() {
    return this.user.value;
  }

  deleteAccount() {
    if (this.getToken() == null) return;
    const id = this.getUserValue()!.id;

    this.http.delete<any>(`${environment.apiURL}/auth/${id}`).pipe(
      tap(value => {
        if (!value.success) {
          console.error('impossible de supprimer le compte, vérifier le serveur');
        }
      })
    ).subscribe();
  }
}
