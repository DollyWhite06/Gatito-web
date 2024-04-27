import { TestBed } from '@angular/core/testing';

import { NewPartidaService } from './new-partida.service';

describe('NewPartidaService', () => {
  let service: NewPartidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPartidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
