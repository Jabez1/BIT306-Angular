import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupHomeComponent } from './sup-home.component';

describe('SupHomeComponent', () => {
  let component: SupHomeComponent;
  let fixture: ComponentFixture<SupHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
