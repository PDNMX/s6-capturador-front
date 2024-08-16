import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  oauth_api: string = environment.OAUTH_API;
  oauth_client_id: string = environment.OAUTH_ClIENT_ID;
  oauth_client_secret: string = environment.OAUTH_CLIENT_SECRET;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      console.log('Formularioinválido');
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    console.log(this.loginForm.value);
    console.log(this.oauth_api);
    console.log(this.oauth_client_id);
    console.log(this.oauth_client_secret);
  }
}
