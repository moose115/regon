import fetch from 'node-fetch';
import { ParametryWyszukiwania } from './interfaces';
import { envelopeZaloguj, envelopeDaneSzukajPodmioty, envelopeWyloguj } from './envelopes';
import { SERVICE_TEST, SERVICE, WSDL_TEST, WSDL } from './constants';
import { parseStringPromise } from 'xml2js';

export class Regon {
  private _key: string
  private _service: string
  private _wsdl: string
  
  constructor({ key = '', dev = false } = {}) {
    this._key = dev ? 'abcde12345abcde12345' : key;
    this._service = dev ? SERVICE_TEST : SERVICE;
    this._wsdl = dev ? WSDL_TEST : WSDL;
  }

  login(): Promise<any> {
    return this.sendEnvelope(envelopeZaloguj(this._key)).then( res => res.ZalogujResponse.ZalogujResult[0] );
  }

  logout(sid: string): Promise<any> {
    return this.sendEnvelope(envelopeWyloguj(sid)).then( res => res.WylogujResponse.WylogujResult[0] === 'true' );
  }

  sendEnvelope(envelope: string, sid: string = ''): Promise<any> {    
    return fetch(this._service, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/soap+xml; charset=utf-8',
        sid,
      },
      body: envelope
    })
      .then( res => res.text() )
      .then( res => res.replace(/\n/g, '').match(/<s:Body>(.*?)<\/s:Body>/)[1])
      .then( res => parseStringPromise(res) )
      .catch( (error: any) => console.log(error));
  }
    
  async getCompanyData(params: ParametryWyszukiwania): Promise<any> {
    try {
      const sid = await this.login();
      const data = await this.sendEnvelope(envelopeDaneSzukajPodmioty(params), sid)
        .then( res => parseStringPromise(res.DaneSzukajPodmiotyResponse.DaneSzukajPodmiotyResult));
      await this.logout(sid);
      return data.root.dane[0];
    } catch (error) {
      return error.body;
    }
  }  
}