import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Serie } from 'src/app/models/serie.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SerieService } from 'src/app/services/serie.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.scss']
})
export class SerieComponent implements OnInit {

  serie$!: Observable<Serie | null>;
  user!: User | null;
  serieId: number = -1;

  followed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private serieService: SerieService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      tap(params => {
        this.serieService.getSerie(params['id']);
      })
    ).subscribe();

    this.serie$ = this.serieService.serie$.pipe(
      tap(value => {
        if (value == null) return;
        this.serieId = value.id;
      })
    );

    this.user = this.authService.getUserValue();
  }

  onFollow() {
    if (this.user == null) return;
    if (this.serieId == -1) return;
    const userId = this.user!.id;
    this.serieService.followSerie(this.serieId, userId).subscribe();
    this.followed = true;
  }
}
