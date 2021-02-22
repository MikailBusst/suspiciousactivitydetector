import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-selectreport',
  templateUrl: './selectreport.component.html',
  styleUrls: ['./selectreport.component.sass']
})
export class SelectreportComponent implements OnInit {

  UserID
  Report_Time = []
  Report_Video = []
  Report_ID = []

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.UserID = localStorage.getItem("id")

    this.databaseService.GetActivityReports(this.UserID).subscribe(
      res=>{
        //console.log(res)
        this.ExtractValues(res)
      },
      err=>{
        console.log("Connection failed!")
      }
    )
  }

  ExtractValues(res) {
    var original_time = []

    for(var i = 0; i < res.length; i++) {
      this.Report_ID.push(res[i][0])
      original_time.push(res[i][1])
      this.Report_Video.push(res[i][2])
    }

    this.ExtractDate(original_time)
  }

  ExtractDate(original_time) {
    var first_string, day, month, year
    for(var i = 0; i < original_time.length; i++) {
      first_string = original_time[i].split(" ")[0]
      year = first_string.substring(0, 4)
      month = this.getMonth(first_string.substring(5, 7))
      day = first_string.substring(8, 10)
      this.Report_Time.push(day + " " + month + " " + year)
    }
  }

  getMonth(month): String {
    var month_string

    switch(month) {
      case "01": {
        month_string = "January"
        break
      }
      case "02": {
        month_string = "February"
        break
      }
      case "03": {
        month_string = "March"
        break
      }
      case "04": {
        month_string = "April"
        break
      }
      case "05": {
        month_string = "May"
        break
      }
      case "06": {
        month_string = "June"
        break
      }
      case "07": {
        month_string = "July"
        break
      }
      case "08": {
        month_string = "August"
        break
      }
      case "09": {
        month_string = "September"
        break
      }
      case "10": {
        month_string = "October"
        break
      }
      case "11": {
        month_string = "November"
        break
      }
      case "12": {
        month_string = "December"
        break
      }
    }

    return month_string
  }

}
