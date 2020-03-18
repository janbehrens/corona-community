import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { version } from '../../package.json';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'corona-community';
  version = version;
  user: User;

  constructor(public auth: AuthService, public dialog: MatDialog) {}

  open(event: string): void {
    switch(event) {
      case 'login':
        const dialogRef = this.dialog.open(LoginDialogComponent, {
          width: '540px'
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result && result.user) {
            this.user = result.user;
            console.log(`Logged in as ${this.user.username}`)
          } else {
            console.log(`Login failed`)
          }
        });
        break;
      case 'terms':
      case 'privacy':
    }
  }

  logout() {
    this.auth.doLogout();
    this.user = null;
  }
}
