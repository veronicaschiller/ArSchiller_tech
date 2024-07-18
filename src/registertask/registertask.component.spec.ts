import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistertaskComponent } from './registertask.component';

describe('RegistertaskComponent', () => {
  let component: RegistertaskComponent;
  let fixture: ComponentFixture<RegistertaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistertaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistertaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
