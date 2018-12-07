import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken = '';
  // public APIUrl = 'http://localhost:59797';
  // private APIUrl = 'http://recipesapi.gearhostpreview.com/recipesAPI';
  public APIUrl = 'http://recipesapi-env.w5aa2v8pme.us-east-2.elasticbeanstalk.com';
  public isAuthorized = false;
  public uName: string;
  public uID: string;

  constructor(private httpClient: HttpClient) { }

  signup(usr: string, email: string, password: string) {
    const signupData = {'UserName': usr, 'Email': email, 'Password': password, 'ConfirmPassword': password};
    const httpHeader: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json' });
    return this.httpClient.post(this.APIUrl + '/api/Account/Register', signupData, {headers: httpHeader});
  }

  logon(usr: string, password: string) {
    const loginData = `username=${encodeURIComponent(usr)}&password=${encodeURIComponent(password)}&grant_type=password`;
    const httpHeader: HttpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded' });
    return this.httpClient.post(this.APIUrl + '/Token', loginData, { headers: httpHeader, observe: 'response' });
  }

  updateUserID() {
    const httpParameters: HttpParams = new HttpParams().set(
      'userName', this.uName);
    const httpHeader: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authToken}`
      }
    );
    this.httpClient.get(this.APIUrl + '/api/User', { headers: httpHeader, params: httpParameters }).subscribe(
      (val: string) => {
        this.uID = val;
      }
    );
  }

}
