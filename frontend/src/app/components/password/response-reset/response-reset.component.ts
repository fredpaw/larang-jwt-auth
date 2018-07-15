import { SnotifyService } from 'ng-snotify';
import { JwtauthService } from './../../../services/jwtauth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    resetToken: null
  }

  public error = [];

  constructor(private route: ActivatedRoute, private jwtauth: JwtauthService, private router: Router, private notify: SnotifyService) {
    route.queryParams.subscribe(params => {
      this.form.resetToken = params['token']
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.jwtauth.changePassword(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data) {
    let _router = this.router;

    this.notify.confirm('Done! Now login with new Password', {
      buttons: [
        {
          text: 'OK',
          action: toaster => {
            _router.navigateByUrl('/login'),
            this.notify.remove(toaster.id)
          }
        }
      ]
    });
  }

  handleError(error) {
    this.error = error.error.errors;
  }

}
