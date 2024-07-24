import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskQuotesProviderComponent } from './task-quotes-provider.component';

describe('TaskQuotesProviderComponent', () => {
  let component: TaskQuotesProviderComponent;
  let fixture: ComponentFixture<TaskQuotesProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskQuotesProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskQuotesProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
