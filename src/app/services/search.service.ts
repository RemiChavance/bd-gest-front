import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bd } from '../models/bd.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchResult = new BehaviorSubject<Bd[]>([]);
  searchResult$: Observable<Bd[]> = this.searchResult.asObservable();


  constructor(private http: HttpClient) { }


  searchByTitle(title: string) {
    this.searchBy('title', title);
  }

  searchByISBN(isbn: string) {
    this.searchBy('isbn', isbn);
  }

  searchByAuthor(author: string) {
    this.searchBy('author', author);
  }

  searchBySerie(serie: string) {
    this.searchBy('serie', serie);
  }

  private searchBy(by: string, item: string) {
    this.http.get<any>(`${environment.apiURL}/search/${by}/${item}`).pipe(
      tap(value => this.searchResult.next(value.bds))
    ).subscribe();
  }

  clearSearch() {
    this.searchResult.next([]);
  }

}
