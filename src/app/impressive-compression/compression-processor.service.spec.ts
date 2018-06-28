import { TestBed, inject } from '@angular/core/testing';

import { CompressionProcessorService } from './compression-processor.service';

describe('CompressionProcessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompressionProcessorService]
    });
  });

  it('should be created', inject([CompressionProcessorService], (service: CompressionProcessorService) => {
    expect(service).toBeTruthy();
  }));
});
