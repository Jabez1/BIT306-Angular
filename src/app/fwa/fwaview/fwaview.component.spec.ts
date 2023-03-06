import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FwaViewComponent } from './fwaview.component';

describe('FwaviewComponent', () => {
  let component: FwaViewComponent;
  let fixture: ComponentFixture<FwaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FwaViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FwaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
