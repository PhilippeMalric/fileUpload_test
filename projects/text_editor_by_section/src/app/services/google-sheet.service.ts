import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import * as GoogleSpreadsheet from 'google-spreadsheet';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetService {
  constructor(private http: HttpClient) {}

  public async getCooker(): Promise<Observable<any>> {
    const doc = new GoogleSpreadsheet(
      '1KZ2v46ya4m_7ALyxJnAXVX3osYIT0gxv9oHtFDnuJ_g'
    );

    await doc.useServiceAccountAuth({
      client_email:
        'test-google-drive@projet-de-loi-accq.iam.gserviceaccount.com',
      private_key: environment.accountService.private_key
    });

    const sheetno = 'o5ebpca';
    const sheetid = '1bb_20eA0LrLyA9lsc_00acCykfYrCJWpZqeqXhlCRnc';
    const url = `https://spreadsheets.google.com/feeds/list/${sheetid}/${sheetno}/public/values?alt=json`;

    return this.http.get(url).pipe(
      map((res: any) => {
        const data = res.feed.entry;

        const returnArray: Array<any> = [];
        if (data && data.length > 0) {
          data.forEach(entry => {
            const obj = {};
            for (const x in entry) {
              if (x.includes('gsx$') && entry[x].$t) {
                obj[x.split('$')[1]] = entry[x]['$t'];
              }
            }
            returnArray.push(obj);
          });
        }
        return returnArray;
      })
    );
  }
  public getLogos(): Observable<any> {
    const sheetno = 'oets9t2';
    const sheetid = '1bb_20eA0LrLyA9lsc_00acCykfYrCJWpZqeqXhlCRnc';
    const url = `https://spreadsheets.google.com/feeds/list/${sheetid}/${sheetno}/public/values?alt=json`;

    return this.http.get(url).pipe(
      map((res: any) => {
        const data = res.feed.entry;
        console.log('data');
        console.log(data);
        const returnArray: Array<any> = [];
        if (data && data.length > 0) {
          data.forEach(entry => {
            const obj = {};
            for (const x in entry) {
              if (x.includes('gsx$') && entry[x].$t) {
                obj[x.split('$')[1]] = entry[x]['$t'];
              }
            }
            returnArray.push(obj);
          });
        }
        return returnArray;
      })
    );
  }
}

//sheet
//https://spreadsheets.google.com/feeds/worksheets/1bb_20eA0LrLyA9lsc_00acCykfYrCJWpZqeqXhlCRnc/private/full
//o5ebpca

//search :
///private/full/
