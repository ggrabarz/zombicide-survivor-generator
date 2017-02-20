/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatabusService } from './databus.service';

describe('DatabusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabusService]
    });
  });

  it('should ...', inject([DatabusService], (service: DatabusService) => {
    expect(service).toBeTruthy();
  }));
});
