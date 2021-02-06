import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  //MasterLink = 'http://localhost:8080/SuspiciousActivityDetector/'
  MasterLink = 'https://sad-backend-app.herokuapp.com'

  constructor(private http:HttpClient) { }

  CreateUser(data):Observable<any> {
    const formData: FormData = new FormData()

    formData.append('firstname', data.FirstName)
    formData.append('lastname', data.LastName)
    formData.append('email', data.Email)
    formData.append('password', data.Password)
    formData.append('status', '0')

    return this.http.post<any>(this.MasterLink + 'add_user.php', formData)
  }

  GetUserID():Observable<any> {
    return this.http.get(this.MasterLink + 'get_user_id.php')
  }

  Login(data): Observable<any> {
    const formData: FormData = new FormData()

    formData.append('email', data.Email)
    formData.append('password', data.Password)

    return this.http.post<any>(this.MasterLink + 'login.php', formData)
  }

  GetUserStatus(ID): Observable<any> {
    const formData: FormData = new FormData()

    formData.append('id', ID)

    return this.http.post<any>(this.MasterLink + 'get_user_status.php', formData)
  }

  GetUserName(ID): Observable<any> {
    const formData: FormData = new FormData()

    formData.append('id', ID)

    return this.http.post<any>(this.MasterLink + 'get_user_name.php', formData)
  }
}
