import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGraduadoComponent } from './editar-graduado.component';

describe('EditarGraduadoComponent', () => {
  let component: EditarGraduadoComponent;
  let fixture: ComponentFixture<EditarGraduadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarGraduadoComponent]
    });
    fixture = TestBed.createComponent(EditarGraduadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
