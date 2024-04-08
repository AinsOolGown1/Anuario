import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuariovistaComponent } from './anuariovista.component';

describe('AnuariovistaComponent', () => {
  let component: AnuariovistaComponent;
  let fixture: ComponentFixture<AnuariovistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnuariovistaComponent]
    });
    fixture = TestBed.createComponent(AnuariovistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
