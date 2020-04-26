# REGON
[English README](https://github.com/mustaf115/regon/blob/master/README.md)

REGON to polski rejestr podmiotów gospodarczych. Ta biblioteka to interfejs łączący się z usługą BIR1.1.

## Instalacja

`npm i regon`
lub
`yarn add regon`

## Usage

Najpierw należy pozyskać klucz do usługi ([instrukcja](https://api.stat.gov.pl/Home/RegonApi)).

Potem:
```js
// Typescript import
import { Regon } from 'Regon';
// CommonJS require
const Regon = require('Regon');

const regon = new Regon({ key: 'api_key' }); // lub new Regon({ dev: true }) w celach testowych, klucz niepotrzebny

const searchParameters: ParametryWyszukiwania = {
	Krs?: string,
	Krsy?: string[],
	Nip?: string,
	Nipy?: string[],
	Regon?: string,
	Regony14zn?: string[],
	Regony9zn?: string[]
};

regon.getCompanyData(searchParameters) // zwraca Promise
	.then( companyInfo => ... );
```
