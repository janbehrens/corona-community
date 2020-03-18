import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {
  @Output() open: EventEmitter<string> = new EventEmitter();
  signupFormGroup: FormGroup;
  error: string;

  constructor(private auth: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }

  register() {
    this.auth.doRegister(this.signupFormGroup.value).catch((err) => {
      console.error(err);
    }).then((result: any) => {
      if (result.message) {
        this.error = result.message;
      } else if (result.username) {
        alert(`Hello ${result.username}!`);
      }
    });
  }

  privacy() {
    this.open.emit('privacy');
  }

  terms() {
    this.open.emit('terms');
  }
}
