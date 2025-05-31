import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GarantiesPage } from './garanties.page';

describe('GarantiesPage', () => {
  let component: GarantiesPage;
  let fixture: ComponentFixture<GarantiesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GarantiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
