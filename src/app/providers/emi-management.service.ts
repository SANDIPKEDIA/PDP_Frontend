import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()

export class EMIManagementService {
    
    private result:any;

    constructor(private _http: HttpClient){}

    getEmi(adminId: String): Observable<any> {
      return this._http.get('http://13.127.184.151:5000/api/v1/AllEmiRecord').pipe(
        tap(
          response => { console.log("get goal management Goal : successfull"); },
          error => { console.log("get goal management task : failed"); }
        )
      );
    }
    
    deleteEmi(emiId:String): Observable<any> {
      return this._http.delete(`http://13.127.184.151:5000/api/v1/DeleteEmiRecord/`+emiId).pipe(
        tap(
          response => { 
            console.log("delete emi id : " + emiId + "success"); 
            true;
          },
          error => { 
            console.log("delete emi id : " + emiId + "failed"); 
            false;
          }
        )
      );
    }

    createEmi(payload): Observable<any> {
      return this._http.post(`http://13.127.184.151:5000/api/v1/createemirecord`, payload).pipe(
        tap(
          response => { console.log("create goal : successfull"); },
          error => { console.log("create goal : failed"); }
        )
      );
    }

    updateEmi(emiId, payload): Observable<any> {
      return this._http.put(`http://13.127.184.151:5000/api/v1/editemirecord/` + emiId, payload).pipe(
        tap(
          response => { console.log("update emi : successfull"); },
          error => { console.log("update emi : failed"); }
        )
      );
    }

}