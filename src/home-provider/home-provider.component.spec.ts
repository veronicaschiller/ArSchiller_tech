import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProviderComponent } from './home-provider.component';

describe('HomeProviderComponent', () => {
  let component: HomeProviderComponent;
  let fixture: ComponentFixture<HomeProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeProviderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
