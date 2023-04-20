import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

  username!: string;
  password!: string;

  error: boolean = false;

  constructor(
    private renderer: Renderer2,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'body-signin');
  }

  onSubmitForm() {
    this.auth.login(this.username, this.password).pipe(
      tap(value => {
        if (value) {
          this.router.navigateByUrl('/home');
          console.log("login succeed");
        } else {
          this.error = true;
          console.log("login failed");
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'body-signin');
  }
}