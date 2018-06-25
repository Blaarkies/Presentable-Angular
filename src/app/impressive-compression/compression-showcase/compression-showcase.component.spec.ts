import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompressionShowcaseComponent } from './compression-showcase.component';

describe('ExplanationComponent', () => {
  let component: CompressionShowcaseComponent;
  let fixture: ComponentFixture<CompressionShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompressionShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompressionShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
