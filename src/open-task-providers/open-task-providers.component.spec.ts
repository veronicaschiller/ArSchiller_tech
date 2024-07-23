import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTaskProvidersComponent } from './open-task-providers.component';

describe('OpenTaskProvidersComponent', () => {
  let component: OpenTaskProvidersComponent;
  let fixture: ComponentFixture<OpenTaskProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenTaskProvidersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenTaskProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
