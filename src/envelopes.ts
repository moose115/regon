import { ParametryWyszukiwania, ParametryPelnyRaport } from './interfaces';

export const envelopeZaloguj = (key: string): string => `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">
    <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>
        <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj</wsa:Action>
    </soap:Header>
    <soap:Body>
        <ns:Zaloguj>
            <ns:pKluczUzytkownika>${key}</ns:pKluczUzytkownika>
        </ns:Zaloguj>
    </soap:Body>
</soap:Envelope>
`;

export const envelopeWyloguj = (sid: string): string => `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">
    <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>
        <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Wyloguj</wsa:Action>
    </soap:Header>
    <soap:Body>
        <ns:Wyloguj>
            <ns:pIdentyfikatorSesji>${sid}</ns:pIdentyfikatorSesji>
        </ns:Wyloguj>
    </soap:Body>
</soap:Envelope>
`;

export const envelopeDaneSzukajPodmioty = (
  params: ParametryWyszukiwania
): string => `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07" xmlns:dat="http://CIS/BIR/PUBL/2014/07/DataContract">
    <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>
        <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukajPodmioty</wsa:Action>
    </soap:Header>
    <soap:Body>
        <ns:DaneSzukajPodmioty>
            <ns:pParametryWyszukiwania>
                ${params.Regon ? `<dat:Regon>${params.Regon}</dat:Regon>` : ''}
                ${params.Nip ? `<dat:Nip>${params.Nip}</dat:Nip>` : ''}
                ${params.Krs ? `<dat:Krs>${params.Krs}</dat:Krs>` : ''}
                ${
  params.Nipy
    ? `<dat:Nipy>${params.Nipy.join(',')}</dat:Nipy>`
    : ''
}
                ${
  params.Regony9zn
    ? `<dat:Regony9zn>${params.Regony9zn.join(
      ','
    )}</dat:Regony9zn>`
    : ''
}
                ${params.Krsy ? `<dat:Krsy>${params.Krsy}</dat:Krsy>` : ''}
                ${
  params.Regony14zn
    ? `<dat:Regony14zn>${params.Regony14zn}</dat:Regony14zn>`
    : ''
}
            </ns:pParametryWyszukiwania>
        </ns:DaneSzukajPodmioty>
    </soap:Body>
</soap:Envelope>
`;

export const envelopeDanePobierzPelnyRaport = (
  params: ParametryPelnyRaport
): string => `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07" xmlns:dat="http://CIS/BIR/PUBL/2014/07/DataContract">
    <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
        <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DanePobierzPelnyRaport</wsa:Action>
        <wsa:To>https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>
    </soap:Header>
    <soap:Body>
        <ns:DanePobierzPelnyRaport>
            <ns:pRegon>${params.Regon}</ns:pRegon>
            <ns:pNazwaRaportu>${params.NazwaRaportu}</ns:pNazwaRaportu>
        </ns:DanePobierzPelnyRaport>
    </soap:Body>
</soap:Envelope>
`;
