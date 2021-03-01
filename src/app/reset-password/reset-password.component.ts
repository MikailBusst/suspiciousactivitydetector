import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private databaseService: DatabaseService) { }

  code
  user_id

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.code = params['code']
    })
    //console.log(this.code)

    this.databaseService.GetResetPasswordCode(this.code).subscribe(
      res=>{
        if(res == "notexist"){
          this.RemovePage()
        }
        else {
          this.user_id = res
        }
      },
      err=>{
        console.log("Connection failed")
      }
    )
  }

  validate_password(data) {
    var password = data.password

    var empty_password = this.check_empty(password)

    if(empty_password) {
      document.getElementById("password").innerHTML = ""

      var character_counter = 0
      var last_character
      var password_format = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,100}$/

      for(var i = 0; i < password.length; i++) {
        if(password.charAt(i) == last_character) {
          character_counter++
          
          if(character_counter >= 2) {
            document.getElementById("password").innerHTML = "Your password cannot have a character repeated three times or more in a row."
            return false
          }
        }
        else {
            character_counter = 0
            last_character = password.charAt(i)
        }
      }

      if(password_format.test(password)) {
        document.getElementById("confirm_password").innerHTML = ""
        
        return this.validate_confirmpassword(data)
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

  validate_confirmpassword(data): boolean {
    var password = data.password
    var confirm_password = data.confirm_password

    var empty_password = this.check_empty(confirm_password)

    if(empty_password) {
      document.getElementById("confirm_password").innerHTML = ""

      if(password == confirm_password) {
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

  master_validate(data) {
    if(this.validate_password(data)) {
      this.databaseService.UpdatePassword(data, this.user_id).subscribe(
        res=>{
          this.DeleteCode()
          window.location.replace("/suspiciousactivitydetector/signin")
          //window.location.replace("/signin")
        },
        err=>{
          console.log("Connection failed")
        }
      )
    }
  }

  RemovePage() {
    $(".rpf").removeClass("reset_password_form")
    $(".rpf").addClass("reset_password_form_hidden")

    $(".rpe").removeClass("reset_password_error_hidden")
    $(".rpe").addClass("reset_password_error")
  }

  DeleteCode(){
    this.databaseService.DeleteResetPasswordCode(this.code).subscribe(
      res=>{
        console.log("Code deleted")
      },
      err=>{
        console.log("Connection failed")
      }
    )
  }

  check_empty(query): boolean {
    if(query == "") {
      return false
    }
    else
      return true
  }

}
