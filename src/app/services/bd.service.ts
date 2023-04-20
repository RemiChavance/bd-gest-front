import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bd } from '../models/bd.model';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  private bds = new BehaviorSubject<Bd[]>([]);
  bds$: Observable<Bd[]> = this.bds.asObservable();

  private bd = new BehaviorSubject<Bd | null>(null);
  bd$: Observable<Bd | null> = this.bd.asObservable();


  constructor(private http: HttpClient) { }


  getAllBds() {
    this.http.get<any>(`${environment.apiURL}/bd`).pipe(
      tap(value => this.bds.next(value.bds))
    ).subscribe();
  }


  getOneBd(isbn: string) {
    this.http.get<any>(`${environment.apiURL}/bd/${isbn}`).pipe(
      tap(value => this.bd.next(value))
    ).subscribe();
  }

  markedAsShared(isbn: string, userId: number) {
    this.http.post<any>(`${environment.apiURL}/sharedbd`, { isbn, userId }).pipe(
      tap(value => console.log(value))
    ).subscribe();
  }

  markedAsReturned(isbn: string, userId: number) {
    this.http.delete<any>(`${environment.apiURL}/sharedbd`, { body: { isbn, userId } }).pipe(
      tap(value => console.log(value))
    ).subscribe();
  }
}
