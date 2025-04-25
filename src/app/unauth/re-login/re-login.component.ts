import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-re-login',
  templateUrl: './re-login.component.html',
  styleUrls: ['./re-login.component.css'],
})
export class ReLoginComponent implements OnInit {
  AuthForm!: FormGroup;
  @Output() credentials = new EventEmitter<{
    username: string;
    password: string;
  }>();

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm(): void {
    this.AuthForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.AuthForm.valid) {
      this.credentials.emit(this.AuthForm.value);
    }
  }
}
