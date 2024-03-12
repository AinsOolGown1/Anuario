import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerListaGraduadosComponent } from './ver-lista-graduados.component';

describe('VerListaGraduadosComponent', () => {
  let component: VerListaGraduadosComponent;
  let fixture: ComponentFixture<VerListaGraduadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerListaGraduadosComponent]
    });
    fixture = TestBed.createComponent(VerListaGraduadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
