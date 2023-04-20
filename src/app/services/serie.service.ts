import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Serie } from '../models/serie.model';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  private serie = new BehaviorSubject<Serie | null>(null);
  serie$: Observable<Serie | null> = this.serie.asObservable();

  private followedSeries = new BehaviorSubject<Serie[]>([]);
  followedSeries$: Observable<Serie[]> = this.followedSeries.asObservable();

  constructor(private http: HttpClient) { }

  getSerie(serieId: number) {
    this.http.get<any>(`${environment.apiURL}/serie/${serieId}`).pipe(
      map(value => {
        const serie = {
          id: value.serie.id,
          title: value.serie.title,
          bds: value.bds
        };
        return serie;
      }),
      tap(value => {
        this.serie.next(value);
      })
    ).subscribe()
  }

  followSerie(serieId: number, userId: number) : Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/serie/follow/${serieId}`, { userId }).pipe(
      tap(value => {
        if (!value.success) {
          console.error('impossible de suivre la série, vérifier le serveur');
        }
      })
    );
  }

  getFollowedSerie(userId: number) {
    this.http.get<any>(`${environment.apiURL}/serie/followed/${userId}`).pipe(
      tap(value => {
        this.followedSeries.next(value.series);
      })
    ).subscribe();
  }
}
