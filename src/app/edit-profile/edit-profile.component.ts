import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent implements OnInit {
  User_ID
  first_name
  last_name
  email

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.User_ID = localStorage.getItem("id")

    this.databaseService.GetProfileInfo(this.User_ID).subscribe(
      res=>{
        this.first_name = res[0]
        this.last_name = res[1]
        this.email = res[2] 
      },
      err=>{
        console.log("Connection failed!")
      }
    )
  }

  ValidateName(data) {
    var firstname = data.FirstName
    var lastname = data.LastName

    console.log(firstname)
    console.log(lastname)

    if((firstname == this.first_name || firstname == "") && (lastname == this.last_name || lastname == "")) {
      document.getElementById("last_name").innerHTML = "You can only save changes if you change your name."
    }
    else {
      document.getElementById("last_name").innerHTML = ""

      this.databaseService.ChangeNames(this.User_ID, firstname, lastname).subscribe(
        res=>{
          console.log(res)
          location.reload()

        },
        err=>{
          console.log("Connection failed!")
        }
      )
    }
  }

  ValidateEmail(data) {
    var email = data.Email

    if(email == this.email || email == "") {
      document.getElementById("email").innerHTML = "You can only save changes if you change your email."
    }
    else {
      document.getElementById("email").innerHTML = ""

      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

      if(mailformat.test(email)) {
        document.getElementById("email").innerHTML = ""

        this.databaseService.ChangeEmail(this.User_ID, email).subscribe(
          res=>{
            console.log(res)

            if(res == "emailtaken") {
              document.getElementById("email").innerHTML = "Email already taken."
            }
            else {
              document.getElementById("email").innerHTML = ""
              location.reload()
            }
          },
          err=>{
            console.log("Connection failed!")
          }
        )
      }
      else {
        document.getElementById("email").innerHTML = "Please enter a valid email address."
      }
    }
  }

  ValidateCurrentPassword(data) {
    var current_password = data.CurrentPassword
    
    if(current_password == "") {
      document.getElementById("current_password").innerHTML = "Please enter your current password."
    }
    else {
      document.getElementById("current_password").innerHTML = ""

      this.databaseService.VerifyPassword(this.User_ID, current_password).subscribe(
        res=>{
          console.log(res)

          if(res == "nomatch") {
            document.getElementById("current_password").innerHTML = "This password is incorrect."
          }
          else {
            document.getElementById("current_password").innerHTML = ""
            this.ValidateNewPasswords(data)
          }
        },
        err=>{
          console.log("Connection failed!")
        }
      )
    }
  }

  ValidateNewPasswords(data) {
    var new_password = data.NewPassword
    var confirm_password = data.ConfirmPassword
    var password_format = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/

    if(new_password == "") {
      document.getElementById("new_password").innerHTML = "Please enter your new password."
    }
    else if(confirm_password == "") {
      document.getElementById("new_password").innerHTML = ""
      document.getElementById("confirm_password").innerHTML = "Please confirm your password."
    }
    else {
      document.getElementById('confirm_password').innerHTML = ""

      var character_counter = 0
      var last_character

      for(var i = 0; i < new_password.length; i++) {
        if(new_password.charAt(i) == last_character) {
          character_counter++
          
          if(character_counter >= 2) {
            document.getElementById("new_password").innerHTML = "Your password cannot have a character repeated three times or more in a row."
            return false
          }
          else {
            document.getElementById("new_password").innerHTML = ""
          }
        }
        else {
            character_counter = 0
            last_character = new_password.charAt(i)
        }
      }

      if(password_format.test(new_password)) {
        document.getElementById("confirm_password").innerHTML = ""
        
        if(new_password == confirm_password) {
          document.getElementById("confirm_password").innerHTML = ""

          this.databaseService.ChangePassword(this.User_ID, new_password).subscribe(
            res=>{
              console.log(res)
              location.reload()
            },
            err=>{
              console.log("Connection failed!")
            }
          )
        }
        else {
          document.getElementById("confirm_password").innerHTML = "This password does not match your new password."
        }
      }
      else{
        document.getElementById("new_password").innerHTML = "Your password must be at least 8 characters long, have at least one lowercase letter, one uppercase letter, one numeric digit, one special character and cannot have any spaces."
      }
    }
  }

}
