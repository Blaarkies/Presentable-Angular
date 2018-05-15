import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorShowcaseComponent } from './decorator-showcase.component';

describe('DecoratorShowcaseComponent', () => {
  let component: DecoratorShowcaseComponent;
  let fixture: ComponentFixture<DecoratorShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoratorShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoratorShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
