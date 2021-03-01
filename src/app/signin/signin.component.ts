import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {
  UserID = localStorage.getItem("id")

  constructor(private databaseService:DatabaseService) { }

  ngOnInit(): void {
    if (this.UserID != "0" && this.UserID != null) {
      window.location.href = "/suspiciousactivitydetector"
      //window.location.href = "/"
    }
  }

  validate_email(data): boolean {
    var email = data.Email

    var empty_email = this.check_empty(email)

    if(empty_email) {
      document.getElementById("signinerror").innerHTML = "";

      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

      if(mailformat.test(email)) {
        document.getElementById("signinerror").innerHTML = ""

        return true
      }
      else {
        document.getElementById("signinerror").innerHTML = "Please enter a valid email address."

        return false
      }
    }
    else {
      document.getElementById("signinerror").innerHTML = "Please enter your email address."
      return false
    }
  }

  validate_password(data): boolean {
    var password = data.Password

    var empty_password = this.check_empty(password)

    if(empty_password) {
      document.getElementById("signinerror").innerHTML = ""

      return true
    }
    else {
      document.getElementById("signinerror").innerHTML = "Please enter your password."
      return false
    }
  }

  master_validate(data): void {
    var email = this.validate_email(data)
    var password = this.validate_password(data)

    if(email && password) {
      document.getElementById("signinerror").innerHTML = ""
      
      this.databaseService.Login(data).subscribe(
        res=>{
          var Response = res

          if(Response == 'deniedemail') {
            document.getElementById("signinerror").innerHTML = "The email typed in does not exist."
          }
          else if(Response == 'deniedpassword') {
            document.getElementById("signinerror").innerHTML = "The password typed in is incorrect."
          }
          else {
            document.getElementById("signinerror").innerHTML = ""

            localStorage.setItem("id", Response)

            console.log(localStorage.getItem("id"))

            window.location.href = "/suspiciousactivitydetector"
            //window.location.href = "/"
          }
        },
        err=>{
          console.log(err)

          document.getElementById("signinerror").innerHTML = "There is a problem logging into your account. Please try again later."
        }
      )
    }
    else if(!email && !password) {
      document.getElementById("signinerror").innerHTML = "Please enter your email and password."
    }
  }

  check_empty(query): boolean {
    if(query == "") {
      return false
    }
    else
      return true
  }

}
