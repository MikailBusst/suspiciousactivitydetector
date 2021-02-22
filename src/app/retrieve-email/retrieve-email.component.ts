import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-retrieve-email',
  templateUrl: './retrieve-email.component.html',
  styleUrls: ['./retrieve-email.component.sass']
})
export class RetrieveEmailComponent implements OnInit {
  Email

  constructor(private databaseService:DatabaseService) { }

  ngOnInit(): void {
  }

  validate_Email(data): boolean {
    document.getElementById("email").innerHTML = "";

    this.Email = data.Email

    var empty_email = this.check_empty(this.Email)

    if(empty_email) {
      document.getElementById("email").innerHTML = ""

      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

      if(mailformat.test(this.Email)) {
        document.getElementById("email").innerHTML = ""

        this.databaseService.ForgotPassword(data).subscribe(
          res=>{
            console.log("Email sent.")

            if (res=="notexist" || res=="alreadyexist") {
              this.displayEmailError(res)
            }
            else {
              window.location.replace("/suspiciousactivitydetector/emailsent")
            }
          },
          err=>{
            console.log("Connection failed.")
          }
        )
      }
      else {
        document.getElementById("email").innerHTML = "Please enter a valid email address."

        return false
      }
    }
    else {
      document.getElementById("email").innerHTML = "Please fill in your email address."

      return false
    }
  }

  check_empty(query): boolean {
    if(query == "") {
      return false
    }
    else
      return true
  }

  displayEmailError(res) {
    switch(res) {
      case "notexist": {
        document.getElementById("email").innerHTML = "This email does not exist. Please create a new account."
        break
      }
      case "alreadyexist": {
        document.getElementById("email").innerHTML = "A reset link has already been sent to this email."
        break
      }
    }
  }

}

