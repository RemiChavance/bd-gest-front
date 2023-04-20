import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  theme!: 'dark' | 'light';
  showModal: boolean = false;

  user$!: Observable<User | null>;

  constructor(
    private renderer: Renderer2,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initTheme();
    this.user$ = this.auth.user$.pipe();
  }

  initTheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.theme = 'dark';
    } else {
      this.theme = 'light';
    }
    this.changeTheme();
  }

  changeTheme() {
    this.renderer.setAttribute(document.getElementById('html'), 'data-theme', this.theme);
  }

  setDarkTheme() {
    this.theme = 'dark';
    this.changeTheme();
  }

  setLightTheme() {
    this.theme = 'light';
    this.changeTheme();
  }

  onLogout() {
    this.auth.signOut();
    this.router.navigateByUrl('/home');
  }

  onShowDeleteAccountModal() {
    this.showModal = !this.showModal;
  }

  onValidateDeleteAccount() {
    this.onShowDeleteAccountModal();
    this.auth.deleteAccount();
    this.auth.signOut();
    this.router.navigateByUrl('/home');
  }
}
