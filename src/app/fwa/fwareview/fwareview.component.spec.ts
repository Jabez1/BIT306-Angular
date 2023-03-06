import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FwaReviewComponent } from './fwareview.component';

describe('FwareviewComponent', () => {
  let component: FwaReviewComponent;
  let fixture: ComponentFixture<FwaReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FwaReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FwaReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
