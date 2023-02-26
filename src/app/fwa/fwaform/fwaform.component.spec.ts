import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FwaFormComponent } from './fwaform.component';

describe('FwaformComponent', () => {
  let component: FwaFormComponent;
  let fixture: ComponentFixture<FwaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FwaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FwaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
