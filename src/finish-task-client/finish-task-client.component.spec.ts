import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishTaskClientComponent } from './finish-task-client.component';

describe('FinishTaskClientComponent', () => {
  let component: FinishTaskClientComponent;
  let fixture: ComponentFixture<FinishTaskClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishTaskClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishTaskClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
