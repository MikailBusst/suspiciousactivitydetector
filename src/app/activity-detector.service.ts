import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityDetectorService {

  //MasterLink = 'http://127.0.0.1:5000'
  MasterLink = 'https://860b68f71a92.ngrok.io'

  constructor(private http:HttpClient) { }

  UploadVideo(videodata) {
    //console.log(videodata)
    const formData: FormData = new FormData()
    formData.append('file', videodata, videodata.name)
    return this.http.post<any>(this.MasterLink, formData)
  }
}
