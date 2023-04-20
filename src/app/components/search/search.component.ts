import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Bd } from 'src/app/models/bd.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  search!: string;

  bds$!: Observable<Bd[]>;
  bds: Bd[] = [];
  cache: Bd[] = [];

  selectedSearchType: 'Titre' | 'ISBN' | 'Auteur' | 'Série' = 'Titre';

  constructor(
    private searchService: SearchService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.bds$ = this.searchService.searchResult$.pipe(
      tap(value => {
        this.cache = this.bds;
        this.bds = value;
      })
    );
  }

  onTypeSearch() {
    if (this.search.length < 3) return;

    if (this.selectedSearchType === 'Titre') {
      this.searchService.searchByTitle(this.search);
      return;
    }

    if (this.selectedSearchType === 'ISBN') {
      this.searchService.searchByISBN(this.search);
      return;
    }

    if (this.selectedSearchType === 'Auteur') {
      this.searchService.searchByAuthor(this.search);
      return;
    }

    if (this.selectedSearchType === 'Série') {
      this.searchService.searchBySerie(this.search);
      return;
    }
  }

  onSearch() {
    let bd = null;

    if (this.selectedSearchType === 'Titre') {
      bd = this.bds.find(x => x.title == this.search);
    } else {
      bd = this.cache.find(x => x.title == this.search);
    }

    if (bd == null) return;
    this.router.navigateByUrl(`/bd/${bd.isbn}`);
  }

  onSelectedSearchTypeChange() {
    this.searchService.clearSearch();
  }

  onSelect() {
    console.log("select");
  }
}
