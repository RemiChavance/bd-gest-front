import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bd } from '../models/bd.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  
  private collection = new BehaviorSubject<Bd[]>([]);
  collection$: Observable<Bd[]> = this.collection.asObservable();


  constructor(private http: HttpClient) { }


  getMyCollection(userId: number) {
    this.http.get<any>(`${environment.apiURL}/collection/${userId}`).pipe(
      map(value => value.bds),
      tap(value => {
        this.collection.next(value)
      })
    ).subscribe()
  }

  addToMyCollection(userId: number, isbn: string) {
    this.http.post<any>(`${environment.apiURL}/collection/${isbn}`, { userId }).pipe(
      tap(value => console.log(value))
    ).subscribe()
  }

  getSharedCollection(id: number) {
    this.http.get<any>(`${environment.apiURL}/collection/${id}`).pipe(
      map(value => value.bds),
      tap(value => {
        this.collection.next(value)
      })
    ).subscribe()
  }
}
