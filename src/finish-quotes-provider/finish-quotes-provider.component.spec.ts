import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishQuotesProviderComponent } from './finish-quotes-provider.component';

describe('FinishQuotesProviderComponent', () => {
  let component: FinishQuotesProviderComponent;
  let fixture: ComponentFixture<FinishQuotesProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishQuotesProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishQuotesProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
