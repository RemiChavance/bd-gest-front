import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Bd } from 'src/app/models/bd.model';
import { Serie } from 'src/app/models/serie.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { BdService } from 'src/app/services/bd.service';
import { CollectionService } from 'src/app/services/collection.service';
import { SerieService } from 'src/app/services/serie.service';

@Component({
  selector: 'app-bd',
  templateUrl: './bd.component.html',
  styleUrls: ['./bd.component.scss']
})
export class BdComponent implements OnInit {
  
  bd$!: Observable<Bd | null>;
  serie$!: Observable<Serie | null>;
  user!: User | null;

  added: boolean = false;

  routerSubscription!: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bdService: BdService,
    private serieService: SerieService,
    private collectionService: CollectionService,
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    // subscribe to every url's params change
    // this code will be executed every time param change in url
    this.route.params.subscribe(params =>
      // get the isbn from the url
      // then tell the service : go fetch this bd
      this.bdService.getOneBd(params['isbn'])
    );

    // bind service's observable to this component's observable
    this.bd$ = this.bdService.bd$.pipe(
      tap(bd => {
        if (bd == null) return;
        // if we got a bd, tell the service : go fetch this serie !
        this.serieService.getSerie(bd.serie);
      })
    );

    // bind service's observable to this component's observable
    this.serie$ = this.serieService.serie$;

    this.user = this.authService.getUserValue();
  }

  onSerie(serieId: number) {
    this.router.navigateByUrl(`/serie/${serieId}`);
  }

  onAuthor(authorId: number) {
    this.router.navigateByUrl(`/author/${authorId}`);
  }

  onAddToMyCollection(isbn: string) {
    if (this.user == null) return;
    this.collectionService.addToMyCollection(this.user.id, isbn);
    this.added = true;
  }
}
