import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheClientComponent } from './fiche-client.component';

describe('FicheClientComponent', () => {
  let component: FicheClientComponent;
  let fixture: ComponentFixture<FicheClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
