// import { environment } from './../../environments/environment.prod';
import { element } from 'protractor';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserServices {
  favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  // public baseUrl: String = "//localhost:3000"
  // public baseUrl: string = "http://5afcaa1d.ngrok.io";
  public baseUrl: String = environment.baseUrl;
  public baseUrl2 = environment.baseUrl2;
  public ownerId = "601870f796b9f2834f045d1a"
  public _ownerId = "601870f796b9f2834f045d1a";

  constructor(private http: HttpClient) { }


  fetchCustomersList(page) {
    let response;
    return this.http.get(this.baseUrl + `/api/v1/admin/getAllCustomerList/${this.ownerId}/${page.limit}/${page.skip}`).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );
  }

  search(filter){
    let response;
    return this.http.get(this.baseUrl + `/api/v1/admin/601870f796b9f2834f045d1a/Search?search=${filter.search}&filter=${filter.filter}`).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );
  }

  getCustomerDetails(userId) {
    let response;
    return this.http.get(this.baseUrl + `/api/v1/admin/getCustomerDetails/${userId}`).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );
  }

  customerAction(userId, payload) {
    let response;
    return this.http.put(this.baseUrl + `/api/v1/admin/customerAction/${userId}`, payload).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );
  }

  loginAdmin(payload){
    let response;
    return this.http.post(this.baseUrl + `/api/v1/admin/loginAdmin`, payload).pipe(
      map((data) => {
        response = data
        return response.response
      })
    );
  }


  changePassword(payload){
    let response;
    return this.http.put(this.baseUrl + `/api/v1/admin/changePassword`, payload).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );
  }

  updateAdminProfile(payload,adminId){
    let response;
    return this.http.post(this.baseUrl + `/api/v1/admin/Profile/updateAdminProfile/${adminId}`, payload).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );
  }

  getAdminProfile(adminId){
    let response;
    return this.http.get(this.baseUrl + `/api/v1/admin/profile/getAdminProfile/${this._ownerId}`).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );
  }


  sendCode(payload){
    let response;
    return this.http.post(this.baseUrl + `/api/v1/admin/forgotPassword`, payload).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );
  }

  verifyCode(code,mobile){
    let response;
    return this.http.get(this.baseUrl + `/api/v1/admin/VerifyForgotPassword/${code}/${mobile}`).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );

  }

  resetPassword(payload){
    let response;
    return this.http.post(this.baseUrl + `/api/v1/admin/ResetPassword`, payload).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );
  }

  orderSearch(filter,ownerId,search){
    let response;
    return this.http.get(this.baseUrl + `/api/v1/admin/orderSearch/${filter}/${ownerId}/${search}`).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );

  }
 
  //


}
