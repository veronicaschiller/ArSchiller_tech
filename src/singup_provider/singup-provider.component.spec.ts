import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingupProviderComponent } from './singup-provider.component';

describe('SingupComponent', () => {
  let component: SingupProviderComponent;
  let fixture: ComponentFixture<SingupProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingupProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingupProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
