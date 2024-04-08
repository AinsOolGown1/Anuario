import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroAnuarioComponent } from './filtro-anuario.component';

describe('FiltroAnuarioComponent', () => {
  let component: FiltroAnuarioComponent;
  let fixture: ComponentFixture<FiltroAnuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroAnuarioComponent]
    });
    fixture = TestBed.createComponent(FiltroAnuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
