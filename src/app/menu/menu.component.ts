import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { ActivityDetectorService } from '../activity-detector.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  UserID
  UserStatus
  AdminStatus

  constructor(private databaseService:DatabaseService, private ads:ActivityDetectorService) { }

  ngOnInit(): void {    
    this.UserID = localStorage.getItem("id")

    var name

    /*this.ads.testGoogleBackend().subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log("Connection failed!")
      }
    )*/

    if(this.UserID != 0 && this.UserID != null){
      this.databaseService.GetUserStatus(this.UserID).subscribe(
        res=>{
          this.UserStatus = res
          if(this.UserStatus == "0") {
            this.AdminStatus = false
          }
          else if(this.UserStatus == "1") {
            this.AdminStatus = true
          }
        },
        err=>{
          this.AdminStatus = false
        }
      )
      this.databaseService.GetUserName(this.UserID).subscribe(
        res=>{
          console.log(res)
          name = res
          console.log(name)

          document.getElementById("name").innerHTML = res
        },
        err=>{
          console.log(err)
        }
      )
    }
    
  }

  LogOut(): void {
    localStorage.setItem("id", "0")

    //window.location.href = "/"
    window.location.href = "/suspiciousactivitydetector"
  }
}
