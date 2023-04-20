import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Author } from 'src/app/models/author.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  author$!: Observable<Author | null>;
  user!: User | null;
  authorId: number = -1;

  followed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.route.params.pipe(
      tap(params => {
        this.authorService.getAuthor(params['id']);
      })
    ).subscribe();

    this.author$ = this.authorService.author$.pipe(
      tap(value => {
        if (value == null) return;
        this.authorId = value.id;
      })
    );

    this.user = this.authService.getUserValue();
  }

  onFollow() {
    if (this.user == null) return;
    if (this.authorId == -1) return;
    const userId = this.user!.id;
    this.authorService.followAuthor(this.authorId, userId).subscribe();
    this.followed = true;
  }

}
