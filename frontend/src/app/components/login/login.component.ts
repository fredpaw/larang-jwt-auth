import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from './../../services/token.service';
import { JwtauthService } from './../../services/jwtauth.service';
import { Component, OnInit } from '@angular/core';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  }

  public error = null;

  constructor(private jwtauth:JwtauthService, private token: TokenService, private router: Router, private auth: AuthService, private notify: SnotifyService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.jwtauth.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    this.error = error.error.error;
  }

  handleResponse(data) {
    this.notify.success('Login Success', {timeout: 0})
    this.token.handle(data.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

}
