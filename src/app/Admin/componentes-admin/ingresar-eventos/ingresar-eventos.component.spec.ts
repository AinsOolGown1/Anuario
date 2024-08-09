import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarEventosComponent } from './ingresar-eventos.component';

describe('IngresarEventosComponent', () => {
  let component: IngresarEventosComponent;
  let fixture: ComponentFixture<IngresarEventosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresarEventosComponent]
    });
    fixture = TestBed.createComponent(IngresarEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
