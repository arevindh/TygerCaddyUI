import { CertificatesModule } from './certificates.module';

describe('CertificatesModule', () => {
  let certificatesModule: CertificatesModule;

  beforeEach(() => {
    certificatesModule = new CertificatesModule();
  });

  it('should create an instance', () => {
    expect(certificatesModule).toBeTruthy();
  });
});
