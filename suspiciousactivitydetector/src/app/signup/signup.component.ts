import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})

export class SignupComponent implements OnInit {
  FirstName
  LastName
  Email
  Password
  ConfirmPassword
  AddStatus
  Response
  dialogRef
  UserID = localStorage.getItem("id")

  recaptcha: any[]
  
  constructor(private databaseService:DatabaseService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.UserID != "0" && this.UserID != null) {
      window.location.href = "/"
    }
  }

  validate_FirstName(data): boolean {
    this.FirstName = data.FirstName

    var empty_name = this.check_empty(this.FirstName)

    if(empty_name) {
      document.getElementById("first_name").innerHTML = ""

      return true
    }
    else {
      document.getElementById("first_name").innerHTML = "Please fill in your first name."

      return false
    }
  }

  validate_LastName(data): boolean {
    this.LastName = data.LastName

    var empty_name = this.check_empty(this.LastName)

    if(empty_name) {
      document.getElementById("last_name").innerHTML = ""

      return true
    }
    else {
      document.getElementById("last_name").innerHTML = "Please fill in your last name."

      return false
    }
  }

  validate_Email(data): boolean {
    this.Email = data.Email

    var empty_email = this.check_empty(this.Email)

    if(empty_email) {
      document.getElementById("email").innerHTML = ""

      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

      if(mailformat.test(this.Email)) {
        document.getElementById("email").innerHTML = ""

        return true
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

  validate_Password(data): boolean {
    this.Password = data.Password

    var empty_password = this.check_empty(this.Password)

    if(empty_password) {
      document.getElementById("password").innerHTML = ""

      var character_counter = 0
      var last_character
      var password_format = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/

      for(var i = 0; i < this.Password.length; i++) {
        if(this.Password.charAt(i) == last_character) {
          character_counter++
          
          if(character_counter >= 2) {
            document.getElementById("password").innerHTML = "Your password cannot have a character repeated three times or more in a row."
            return false
          }
        }
        else {
            character_counter = 0
            last_character = this.Password.charAt(i)
        }
      }

      if(password_format.test(this.Password)) {
        document.getElementById("confirm_password").innerHTML = ""
        
        return true
      }
      else{
        document.getElementById("password").innerHTML = "Your password must be at least 8 characters long, have at least one lowercase letter, one uppercase letter, one numeric digit, one special character and cannot have any spaces."

        return false
      }
    }
    else {
      document.getElementById("password").innerHTML = "Please fill in your password."

      return false
    }
  }

  validate_ConfirmPassword(data): boolean {
    this.ConfirmPassword = data.ConfirmPassword

    var empty_password = this.check_empty(this.ConfirmPassword)

    if(empty_password) {
      document.getElementById("confirm_password").innerHTML = ""

      if(this.Password == this.ConfirmPassword) {
        document.getElementById("confirm_password").innerHTML = ""

        return true
      }
      else {
        document.getElementById("confirm_password").innerHTML = "This password does not match the other password."

        return false
      }
    }
    else {
      document.getElementById("confirm_password").innerHTML = "Please fill in your password again."

      return false
    }
  }

  resolved(captchaResponse: any[]): void {
    this.recaptcha = captchaResponse
    document.getElementById("captcha").innerHTML = ""
  }

  master_validate(data): void {
    var firstname = this.validate_FirstName(data)
    var lastname = this.validate_LastName(data)
    var email = this.validate_Email(data)
    var password = this.validate_Password(data)
    var confirmpassword = this.validate_ConfirmPassword(data)

    if (this.recaptcha == null) {
      document.getElementById("captcha").innerHTML = "Please confirm that you are not a robot."
    }

    if(firstname && lastname && email && password && confirmpassword && this.recaptcha != null) {
      this.databaseService.CreateUser(data).subscribe(
        res=>{
          console.log(res)

          this.Response = res

          if(this.Response == "emailexists") {
            document.getElementById("email").innerHTML = "This email already exists."
          }
          else {
            document.getElementById("email").innerHTML = ""

            localStorage.setItem("id", res)

            window.location.href = "/"
          }
        },
        err=>{
          console.log(err)

          this.dialogRef = this.dialog.open(EmailExistsDialogComponent)
        }
      )
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

@Component({
  selector: 'app-email-exists-dialog',
  templateUrl: '../email-exists-dialog/email-exists-dialog.component.html'
})
export class EmailExistsDialogComponent {
  constructor(public dialogRef: MatDialogRef<EmailExistsDialogComponent>) { }

  close(): void {
    this.dialogRef.close()
  }
}
