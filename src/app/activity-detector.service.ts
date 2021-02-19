import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityDetectorService {

  MasterLink = 'http://127.0.0.1:5000'
  //MasterLink = 'https://adsbackend.et.r.appspot.com/'
  //MasterLink = 'https://adsbackend-bglcdbk5sa-as.a.run.app'
  //MasterLink = 'http://121.123.49.31'

  constructor(private http:HttpClient) { }

  UploadVideo(videodata) {
    //console.log(videodata)
    const formData: FormData = new FormData()
    formData.append('file', videodata, videodata.name)
    return this.http.post<any>(this.MasterLink, formData)
  }
}
