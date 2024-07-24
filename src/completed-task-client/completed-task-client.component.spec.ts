import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTaskClientComponent } from './completed-task-client.component';

describe('CompletedTaskClientComponent', () => {
  let component: CompletedTaskClientComponent;
  let fixture: ComponentFixture<CompletedTaskClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedTaskClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedTaskClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
