import { SnotifyService } from 'ng-snotify';
import { JwtauthService } from './../../../services/jwtauth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public form = {
    email: null
  };

  constructor(private jwtauth: JwtauthService, private notify: SnotifyService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.notify.info('Waiting...', {timeout: 5000});
    this.jwtauth.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    );
  }

  handleResponse(res) {
    this.notify.success(res.data, {timeout: 0});
    this.form.email = null;
  }

}
