import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskQuotesComponent } from './task-quotes.component';

describe('TaskQuotesComponent', () => {
  let component: TaskQuotesComponent;
  let fixture: ComponentFixture<TaskQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskQuotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
