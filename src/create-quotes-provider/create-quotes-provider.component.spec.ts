import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuotesProviderComponent } from './create-quotes-provider.component';

describe('CreateQuotesProviderComponent', () => {
  let component: CreateQuotesProviderComponent;
  let fixture: ComponentFixture<CreateQuotesProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateQuotesProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateQuotesProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
