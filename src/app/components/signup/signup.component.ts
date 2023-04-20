import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  
  // Forms
  signupForm!: FormGroup;
  
  emailCtrl!: FormControl;
  emailInvalid$!: Observable<boolean | null>;

  error: boolean = false;


  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.renderer.addClass(document.body, 'body-signup');

    this.createForm();
  }

  onSubmitForm() {
    if (this.signupForm.invalid) return;
    
    const username = this.signupForm.value.username;
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    
    this.auth.register(username, email, password).pipe(
      tap(response => {
        if (response) {
          this.router.navigateByUrl('/signin');
          console.log("register succeed");
        } else {
          this.error = true;
          console.log("register failed");
        }          
      })
    ).subscribe();
  }

  createForm() {
    // create ctrl for email
    this.emailCtrl = this.formBuilder.control('', [Validators.required, Validators.email]);

    // create form
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: this.emailCtrl,
      password: ['', [Validators.required]]
    }, {
      updateOn: 'change'
    });

    // manage error
    this.emailInvalid$ = this.signupForm.valueChanges.pipe(
      // if email is empty OR email valid => null (we don't display error)
      map(() => !this.emailCtrl.value || this.emailCtrl.valid ? null : true)
    );
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'body-signup');
  }
}
