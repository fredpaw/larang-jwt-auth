import { Router } from '@angular/router';
import { JwtauthService } from './../../services/jwtauth.service';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  }

  public error = [];

  constructor(private jwtauth: JwtauthService, private token: TokenService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.jwtauth.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    this.error = error.error.errors
  }

  handleResponse(data) {
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

}
