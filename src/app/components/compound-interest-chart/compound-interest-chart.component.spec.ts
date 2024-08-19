import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundInterestChartComponent } from './compound-interest-chart.component';

describe('CompoundInterestChartComponent', () => {
  let component: CompoundInterestChartComponent;
  let fixture: ComponentFixture<CompoundInterestChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompoundInterestChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoundInterestChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
