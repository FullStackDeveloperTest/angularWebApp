import { TestBed } from '@angular/core/testing';

import { ClickedUserService } from './clicked-user.service';

describe('ClickedUserService', () => {
  let service: ClickedUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClickedUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
