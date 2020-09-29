import { TestBed } from '@angular/core/testing';

import { TalkServiceService } from './talk-service.service';

describe('TalkServiceService', () => {
  let service: TalkServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalkServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
