import { ImpressiveCompressionModule } from './impressive-compression.module';

describe('ImpressiveCompressionModule', () => {
  let impressiveCompressionModule: ImpressiveCompressionModule;

  beforeEach(() => {
    impressiveCompressionModule = new ImpressiveCompressionModule();
  });

  it('should create an instance', () => {
    expect(impressiveCompressionModule).toBeTruthy();
  });
});
