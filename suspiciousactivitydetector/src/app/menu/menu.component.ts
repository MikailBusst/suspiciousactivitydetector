import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  UserID
  UserStatus
  AdminStatus

  constructor(private databaseService:DatabaseService) { }

  ngOnInit(): void {    
    this.UserID = localStorage.getItem("id")

    var firstname, lastname, name

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
          firstname = res.FirstName
          lastname = res.LastName
          name = firstname + " " + lastname

          document.getElementById("name").innerHTML = name
        },
        err=>{
          console.log(err)
        }
      )
    }
    
  }

  LogOut(): void {
    localStorage.setItem("id", "0")

    window.location.href = "/"
  }
}
