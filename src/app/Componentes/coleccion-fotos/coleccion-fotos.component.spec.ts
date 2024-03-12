import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColeccionFotosComponent } from './coleccion-fotos.component';

describe('ColeccionFotosComponent', () => {
  let component: ColeccionFotosComponent;
  let fixture: ComponentFixture<ColeccionFotosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColeccionFotosComponent]
    });
    fixture = TestBed.createComponent(ColeccionFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
