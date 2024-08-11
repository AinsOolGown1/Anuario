import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroColeccionFotosComponent } from './filtro-coleccion-fotos.component';

describe('FiltroColeccionFotosComponent', () => {
  let component: FiltroColeccionFotosComponent;
  let fixture: ComponentFixture<FiltroColeccionFotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroColeccionFotosComponent]
    });
    fixture = TestBed.createComponent(FiltroColeccionFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
