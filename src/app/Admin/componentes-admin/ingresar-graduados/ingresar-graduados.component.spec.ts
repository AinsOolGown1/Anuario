import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarGraduadosComponent } from './ingresar-graduados.component';

describe('IngresarGraduadosComponent', () => {
  let component: IngresarGraduadosComponent;
  let fixture: ComponentFixture<IngresarGraduadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresarGraduadosComponent]
    });
    fixture = TestBed.createComponent(IngresarGraduadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
