import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarColecFotosComponent } from './ingresar-colec-fotos.component';

describe('IngresarColecFotosComponent', () => {
  let component: IngresarColecFotosComponent;
  let fixture: ComponentFixture<IngresarColecFotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresarColecFotosComponent]
    });
    fixture = TestBed.createComponent(IngresarColecFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
