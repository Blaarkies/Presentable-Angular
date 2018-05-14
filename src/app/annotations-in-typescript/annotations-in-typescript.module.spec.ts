import { AnnotationsInTypescriptModule } from './annotations-in-typescript.module';

describe('AnnotationsInTypescriptModule', () => {
  let annotationsInTypescriptModule: AnnotationsInTypescriptModule;

  beforeEach(() => {
    annotationsInTypescriptModule = new AnnotationsInTypescriptModule();
  });

  it('should create an instance', () => {
    expect(annotationsInTypescriptModule).toBeTruthy();
  });
});
