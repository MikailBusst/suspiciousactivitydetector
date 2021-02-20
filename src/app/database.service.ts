import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  //MasterLink = 'http://localhost:8080/SuspiciousActivityDetector/'
  MasterLink = 'https://sad-backend-app.herokuapp.com/'

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

  ForgotPassword(data): Observable<any> {
    const formData: FormData = new FormData()

    console.log(data.Email)

    formData.append('email', data.Email)

    return this.http.post<any>(this.MasterLink + 'forgotpassword.php', formData)
  }

  GetResetPasswordCode(code): Observable<any> {
    const formData: FormData = new FormData()

    formData.append('code', code)

    return this.http.post<any>(this.MasterLink + 'check_code.php', formData)
  }

  DeleteResetPasswordCode(code): Observable<any> {
    const formData: FormData = new FormData()

    formData.append('code', code)

    return this.http.post<any>(this.MasterLink + 'delete_code.php', formData)
  }

  UpdatePassword(data, user_id): Observable<any> {
    const formData: FormData = new FormData()

    formData.append('password', data.password)
    formData.append('user_id', user_id)

    return this.http.post<any>(this.MasterLink + 'update_password.php', formData)
  }

  AddActivityReport(video_name, user_id): Observable<any> {
    const formData: FormData = new FormData()

    formData.append("video_name", video_name)
    formData.append("user_id", user_id)

    return this.http.post<any>(this.MasterLink + 'add_activity_report.php', formData)
  }

  GetActivityReports(user_id): Observable<any> {
    const formData: FormData = new FormData()

    formData.append("user_id", user_id)

    return this.http.post<any>(this.MasterLink + 'get_activity_report.php', formData)
  }
}
