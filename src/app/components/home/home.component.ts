import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { Author } from 'src/app/models/author.model';
import { Bd } from 'src/app/models/bd.model';
import { Serie } from 'src/app/models/serie.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorService } from 'src/app/services/author.service';
import { BdService } from 'src/app/services/bd.service';
import { SerieService } from 'src/app/services/serie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  bds$!: Observable<Bd[]>;
  search!: string;

  user!: User | null;

  followedAuthors$!: Observable<Author[]>;
  followedSeries$!: Observable<Serie[]>;

  logoutMessage$!: Subscription;

  constructor(
    private bdService: BdService,
    private authService: AuthService,
    private authorService: AuthorService,
    private serieService: SerieService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.bds$ = this.bdService.bds$;
    this.followedAuthors$ = this.authorService.followedAuthors$;
    this.followedSeries$ = this.serieService.followedSeries$;

    this.logoutMessage$ = this.authService.logoutMessage$.pipe(
      tap(value => { 
        if (value) this.init();
      })
    ).subscribe();

    this.init();
  }

  private init() {
    this.user = this.authService.getUserValue();

    if (this.user != null) {
      this.authorService.getFollowedAuthor(this.user.id);
      this.serieService.getFollowedSerie(this.user.id);
    } else {
      this.bdService.getAllBds();
    }
  }


  onAuthor(authorId: number) {
    this.router.navigateByUrl(`/author/${authorId}`);
  }

  onSerie(serieId: number) {
    this.router.navigateByUrl(`/serie/${serieId}`);
  }

  ngOnDestroy(): void {
    this.logoutMessage$.unsubscribe();
  }
}
