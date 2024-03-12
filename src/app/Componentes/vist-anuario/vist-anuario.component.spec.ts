import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistAnuarioComponent } from './vist-anuario.component';

describe('VistAnuarioComponent', () => {
  let component: VistAnuarioComponent;
  let fixture: ComponentFixture<VistAnuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistAnuarioComponent]
    });
    fixture = TestBed.createComponent(VistAnuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
