import { Regon } from '../src/Regon';

test('Should return login ID', async () => {
  const regon = new Regon({ dev: true });
  const id = await regon.login();
  expect(id).toBeDefined();
  expect(id).toHaveLength(20);
});

test('Should logout with return true', async () => {
  const regon = new Regon({ dev: true });
  const sid = await regon.login();
  const hasLoggedOut = await regon.logout(sid);
  expect(hasLoggedOut).toBe(true);
});

test('Should return company data', async () => {
  const regon = new Regon({ dev: true });
  const data = await regon.getCompanyData({ Nip: '5261040828' });
  expect(data).toStrictEqual({
    Regon: [ '000331501' ],
    Nip: [ '5261040828' ],
    StatusNip: [ '' ],
    Nazwa: [ 'GŁÓWNY URZĄD STATYSTYCZNY' ],
    Wojewodztwo: [ 'MAZOWIECKIE' ],
    Powiat: [ 'm. st. Warszawa' ],
    Gmina: [ 'Śródmieście' ],
    Miejscowosc: [ 'Warszawa' ],
    KodPocztowy: [ '00-925' ],
    Ulica: [ 'ul. Test-Krucza' ],
    NrNieruchomosci: [ '208' ],
    NrLokalu: [ '' ],
    Typ: [ 'P' ],
    SilosID: [ '6' ],
    DataZakonczeniaDzialalnosci: [ '' ],
    MiejscowoscPoczty: [ 'Warszawa' ] 
  });
});
