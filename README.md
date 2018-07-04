# KKIAPAY

[![Build Status](https://travis-ci.org/kkiapay/js-sdk.svg?branch=master)](https://travis-ci.org/kkiapay/js-sdk)
[![npm version](https://img.shields.io/npm/v/kkiapay.svg)](https://www.npmjs.com/package/kkiapay)

Javascript Sdk for KKIAPAY (www.kkipay.me) API

## Features

- [x] MTN Mobile Money Debit & Transfer Request
- [x] Flooz Mobile Money Debit Request
- [ ] Ecobank Express Cash
- [ ] Visa card payments
- [ ] Master card payments

## Installing

Using npm:

```bash
$ npm i -s kkiapay
```

Using cdn:

```html
<script src="https://unpkg.com/kkiapay/dist/kkiapay.bundle.js"></script>
```

## Example

## MTN Mobile Money 

Performing a `Debit` request 

```js
// setup your api key (find one at https://www.kkipay.me)
const k = kkiapay("<your-api-key>")

//request 100 XOF from 67 43 42 70, mobile money account
k.debit("22967434270",100).then((res) => {
    // handle response
}).catch((err) => {
    //handle error
})
```

## Reference

### Response
Server respond in 3 cases : 
  - user completes payment with success ( then block  ) 
  - user payment refuses payment ( catch block)
  - user cancel payment  ( catch block )
  - timeout - 90s  (catch block )
  - system error ( catch block )

<table>
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Type</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>failureCode</td>
      <td>((string))</td>
      <td>The status of requested payment                                                               <li> <code>processing_error</code>  System is busy or user already has a pending payment request</li> <li><code>insufficent_fund</code> User account balance is less than requested amount</li>
      </td> 
   </tr>
  </tbody>
</table>

Response object
