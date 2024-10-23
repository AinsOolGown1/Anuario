import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenesMasivasComponent } from './imagenes-masivas.component';

describe('ImagenesMasivasComponent', () => {
  let component: ImagenesMasivasComponent;
  let fixture: ComponentFixture<ImagenesMasivasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagenesMasivasComponent]
    });
    fixture = TestBed.createComponent(ImagenesMasivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
