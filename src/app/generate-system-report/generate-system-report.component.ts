import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import jsPDF from 'jspdf';  

@Component({
  selector: 'app-generate-system-report',
  templateUrl: './generate-system-report.component.html',
  styleUrls: ['./generate-system-report.component.sass']
})
export class GenerateSystemReportComponent implements OnInit {
  
  year
  month = "0"
  new_users
  new_reports
  total_users
  total_reports

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    var date = new Date()

    this.year = String(date.getFullYear())
  }

  GetStats() {
    if(this.month == "0") {
      document.getElementById("selectdate").innerHTML = "Please select a month."
    }
    else {
      document.getElementById("selectdate").innerHTML = ""

      this.databaseService.GetServiceStats(this.month, this.year).subscribe(
        res=>{
          this.new_users = res[0]
          this.new_reports = res[1]
          this.total_users = res[2]
          this.total_reports = res[3]
  
          this.GenerateSystemReport()  
        },
        err=>{
          console.log("Connection failed!")
        }
      )
    }
  }

  GenerateSystemReport() {
    var date = new Date()

    var year = date.getFullYear()
    var month = this.getMonth(date.getMonth() + 1)
    var day = date.getDate()
    var hour = date.getHours()
    var minute = this.getMinute(date.getMinutes())

    var pdf = new jsPDF()

    pdf.setFontSize(30)
    pdf.setFont('Helvetica', 'bold')
    pdf.text("Suspicious Activity Detector", 15, 40)

    pdf.setFontSize(25)
    pdf.setFont('Helvetica', 'normal')
    pdf.text("System Report", 15, 60)

    pdf.setFontSize(20)
    pdf.setTextColor(78,78,78)
    pdf.text(day + " " + month + " " + year + " " + hour + ":" + minute, 15, 75)

    pdf.setTextColor(0, 0, 0)
    pdf.text("Number of new users registered in " + this.getStringMonth(this.month) + " " + this.year + ": " + this.new_users, 15, 100)
    pdf.text("Number of new activity reports added in " + this.getStringMonth(this.month) + " " + this.year + ": " + this.new_reports, 15, 110)

    pdf.text("Total statistics as of " + day + " " + month + " " + year + ":", 15, 140)
    pdf.text("Total number of users: " + this.total_users, 15, 150)
    pdf.text("Total number of activity reports: " + this.total_reports, 15, 160)

    pdf.save("systemreport(" + day + month + year + ").pdf" )
  }

  getNumericalMonth(num) {
    var month

    switch(num) {
      case 1: {
        month = "01"
        break
      }
      case 2: {
        month = "02"
        break
      }
      case 3: {
        month = "03"
        break
      }
      case 4: {
        month = "04"
        break
      }
      case 5: {
        month = "05"
        break
      }
      case 6: {
        month = "06"
        break
      }
      case 7: {
        month = "07"
        break
      }
      case 8: {
        month = "08"
        break
      }
      case 9: {
        month = "09"
        break
      }
      case 10: {
        month = "10"
        break
      }
      case 11: {
        month = "11"
        break
      }
      case 12: {
        month = "12"
        break
      }
    }

    return month
  }

  getStringMonth(num): String {
    var month

    switch(num) {
      case "01": {
        month = "January"
        break
      }
      case "02": {
        month = "February"
        break
      }
      case "03": {
        month = "March"
        break
      }
      case "04": {
        month = "April"
        break
      }
      case "05": {
        month = "May"
        break
      }
      case "06": {
        month = "June"
        break
      }
      case "07": {
        month = "July"
        break
      }
      case "08": {
        month = "August"
        break
      }
      case "09": {
        month = "September"
        break
      }
      case "10": {
        month = "October"
        break
      }
      case "11": {
        month = "November"
        break
      }
      case "12": {
        month = "December"
        break
      }
    }

    return month
  }

  getMonth(num): String {
    var month

    switch(num) {
      case 1: {
        month = "January"
        break
      }
      case 2: {
        month = "February"
        break
      }
      case 3: {
        month = "March"
        break
      }
      case 4: {
        month = "April"
        break
      }
      case 5: {
        month = "May"
        break
      }
      case 6: {
        month = "June"
        break
      }
      case 7: {
        month = "July"
        break
      }
      case 8: {
        month = "August"
        break
      }
      case 9: {
        month = "September"
        break
      }
      case 10: {
        month = "October"
        break
      }
      case 11: {
        month = "November"
        break
      }
      case 12: {
        month = "December"
        break
      }
    }

    return month
  }

  getMinute(num) {
    var minute

    switch(num) {
      case 1: {
        minute = "01"
        break
      }
      case 2: {
        minute = "02"
        break
      }
      case 3: {
        minute = "03"
        break
      }
      case 4: {
        minute = "04"
        break
      }
      case 5: {
        minute = "05"
        break
      }
      case 6: {
        minute = "06"
        break
      }
      case 7: {
        minute = "07"
        break
      }
      case 8: {
        minute = "08"
        break
      }
      case 9: {
        minute = "09"
        break
      }
      default: {
        minute = num
      }
    }

    return minute
  }

  changeMonth(year) {
    this.year = year
  }

  GetMonth(month) {
    this.month = month
  }

}
