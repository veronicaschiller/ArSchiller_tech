import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptQuotesProviderComponent } from './acept-quotes-provider.component';

describe('AceptQuotesProviderComponent', () => {
  let component: AceptQuotesProviderComponent;
  let fixture: ComponentFixture<AceptQuotesProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AceptQuotesProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AceptQuotesProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
