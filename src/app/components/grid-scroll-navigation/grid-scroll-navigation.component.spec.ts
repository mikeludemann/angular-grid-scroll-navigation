import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridScrollNavigationComponent } from './grid-scroll-navigation.component';

describe('GridScrollNavigationComponent', () => {
  let component: GridScrollNavigationComponent;
  let fixture: ComponentFixture<GridScrollNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridScrollNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridScrollNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
