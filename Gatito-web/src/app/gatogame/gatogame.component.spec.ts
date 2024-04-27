import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatogameComponent } from './gatogame.component';

describe('GatogameComponent', () => {
  let component: GatogameComponent;
  let fixture: ComponentFixture<GatogameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GatogameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GatogameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
