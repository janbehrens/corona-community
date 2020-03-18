import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  credentials = { username: '', password: '' };
  error: string;
  user: User;

  constructor(private auth: AuthService, public dialogRef: MatDialogRef<LoginDialogComponent>) {
    this.dialogRef.disableClose = true;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.auth.doLogin(this.credentials).catch((err) => {
      console.error(err);
    }).then((result: any) => {
      if (result.message) {
        this.error = result.message;
      } else if (result.username) {
        this.dialogRef.close({ user: result });
      }
    });
  }
}
