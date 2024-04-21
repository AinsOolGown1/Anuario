import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalanuarioComponent } from './modalanuario.component';

describe('ModalanuarioComponent', () => {
  let component: ModalanuarioComponent;
  let fixture: ComponentFixture<ModalanuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalanuarioComponent]
    });
    fixture = TestBed.createComponent(ModalanuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
