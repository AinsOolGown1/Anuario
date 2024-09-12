import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarGraduadoComponent } from './modal-editar-graduado.component';

describe('ModalEditarGraduadoComponent', () => {
  let component: ModalEditarGraduadoComponent;
  let fixture: ComponentFixture<ModalEditarGraduadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalEditarGraduadoComponent]
    });
    fixture = TestBed.createComponent(ModalEditarGraduadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
