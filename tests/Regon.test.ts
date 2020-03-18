import { Regon } from '../src/Regon';

test('Should return login ID', async () => {
  const regon = new Regon({ dev: true });
  const sid = await regon.login();
  expect(sid).toBeDefined();
  expect(sid).toHaveLength(20);
});

test('Should return true on logout', async () => {
  const regon = new Regon({ dev: true });
  const sid = await regon.login();
  const isOut = await regon.logout(sid);
  expect(isOut).toBe(true);
});

test('Should return company data', async () => {
  const regon = new Regon({ dev: true });
  const data = await regon.getCompanyData({ Regon: '000331501' });
  expect(data).toBeDefined();
});