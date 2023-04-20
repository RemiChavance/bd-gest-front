import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  
  private author = new BehaviorSubject<Author | null>(null);
  author$: Observable<Author | null> = this.author.asObservable();

  private followedAuthors = new BehaviorSubject<Author[]>([]);
  followedAuthors$: Observable<Author[]> = this.followedAuthors.asObservable();
  
  constructor(private http: HttpClient) { }

  getAuthor(authorId: number) {
    this.http.get<any>(`${environment.apiURL}/author/${authorId}`).pipe(
      map(value => {
        const author = {
          ...value.author,
          bds: value.bds
        }
        return author;
      }),
      tap(value => {
        this.author.next(value);
      })
    ).subscribe()
  }

  followAuthor(authorId: number, userId: number) : Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/author/follow/${authorId}`, { userId }).pipe(
      tap(value => {
        if (!value.success) {
          console.error('impossible de suivre l\'auteur, vérifier le serveur');
        }
      })
    );
  }

  getFollowedAuthor(userId: number) {
    this.http.get<any>(`${environment.apiURL}/author/followed/${userId}`).pipe(
      tap(value => {
        this.followedAuthors.next(value.authors);
      })
    ).subscribe();
  }
}
