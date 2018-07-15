import { TestBed, inject } from '@angular/core/testing';

import { JwtauthService } from './jwtauth.service';

describe('JwtauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtauthService]
    });
  });

  it('should be created', inject([JwtauthService], (service: JwtauthService) => {
    expect(service).toBeTruthy();
  }));
});
