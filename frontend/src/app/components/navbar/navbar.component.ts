import { TokenService } from './../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean;

  constructor(private auth: AuthService, private router: Router, private token:TokenService) { }

  ngOnInit() {
    this.auth.authStatus.subscribe(
      value => this.loggedIn = value
    );
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.auth.changeAuthStatus(false);
    this.token.remove();
    this.router.navigateByUrl('/login');
  }

}
