import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { DatabaseService } from '../database.service';
import jsPDF from 'jspdf';  

@Component({
  selector: 'app-activityreport',
  templateUrl: './activityreport.component.html',
  styleUrls: ['./activityreport.component.sass']
})
export class ActivityreportComponent implements OnInit {

  report_id
  frame_array = []
  activity_array = []
  video_name
  filename_display
  filename_extension
  total_activities
  fighting_percentage
  notfighting_percentage

  constructor(private route: ActivatedRoute, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.report_id = params['report_id']
    })

    this.databaseService.GetActivityReportName(this.report_id).subscribe(
      res=>{
        this.video_name = res
        this.filename_extension = this.video_name.slice(-4)

        if(this.filename_extension == 'webm') {
          this.filename_extension = this.video_name.slice(-5)
        }

        console.log(this.filename_extension)
      },
      err=>{
        console.log("Connection failed")
      }
    )

    this.databaseService.GetActivityLogs(this.report_id).subscribe(
      res=>{
        //console.log(res)
        this.ExtractActivities(res)  
      },
      err=>{
        console.log("Connection failed")
      }
    )
  }

  ExtractActivities(activity_JSON) {
    this.total_activities = Object.keys(activity_JSON).length
    var total_fighting = 0
    var total_notfighting = 0

    for(var i = 0; i < Object.keys(activity_JSON).length; i++) {
      //console.log(activity_JSON)
      var activity = Object.keys(activity_JSON).map((key) => [Number(key), activity_JSON[key]])
      
      var activity_selection = activity[i][1].activity_name

      var frame = activity_selection.split(" ")

      this.frame_array.push(frame[0])

      this.activity_array.push(activity_selection.substr(activity_selection.indexOf(" ") + 1))

      if(this.activity_array[i] == "Fighting") {
        total_fighting = total_fighting + 1
      }
      else if(this.activity_array[i] == "Not Fighting") {
        total_notfighting = total_notfighting + 1
      }
    }

    this.fighting_percentage = Math.round(total_fighting / this.total_activities * 100)
    this.notfighting_percentage = Math.round(total_notfighting / this.total_activities * 100)

    console.log(this.total_activities)
    console.log(this.fighting_percentage)
    console.log(this.notfighting_percentage)
  }

  GenerateActivityReport() {
    var pdf = new jsPDF()
    var j = 1
    var i = 0
    var y_position = 140
    var first_terminator

    if(this.video_name.length > 13) {
      this.filename_display = this.video_name.substring(0,9) + '...' + this.filename_extension
    }
    else {
      this.filename_display = this.video_name
    }

    if(this.activity_array.length > 4) {
      first_terminator = 4
    }
    else {
      first_terminator = this.activity_array.length
    }

    //pdf.setFontType('normal')

    pdf.setFontSize(30)
    pdf.setFont('Helvetica', 'bold')
    pdf.text("Suspicious Activity Detector", 15, 40)

    pdf.setFontSize(20)
    pdf.setFont('Helvetica', 'normal')
    pdf.text("Video:", 15, 60)
    pdf.setFontSize(25)
    pdf.text(this.filename_display, 15, 75)

    pdf.setFontSize(50)
    pdf.setFont('Helvetica', 'bold')

    if(this.fighting_percentage == 100) {
      pdf.text("100%", 40, 105)
      pdf.setFontSize(15)
      pdf.setFont('Helvetica', 'normal')
      pdf.text("Fighting", 51, 115)
    }
    else if (this.fighting_percentage < 100 && this.fighting_percentage >= 10) {
      pdf.text(this.fighting_percentage + "%", 45, 105)
      pdf.setFontSize(15)
      pdf.setFont('Helvetica', 'normal')
      pdf.text("Fighting", 52, 115)
    }
    else {
      pdf.text(this.fighting_percentage + "%", 50, 105)
      pdf.setFontSize(15)
      pdf.setFont('Helvetica', 'normal')
      pdf.text("Fighting", 54, 115)
    }

    pdf.setFontSize(50)
    pdf.setFont('Helvetica', 'bold')

    if(this.notfighting_percentage == 100) {
      pdf.text("100%", 120, 105)
      pdf.setFontSize(15)
      pdf.setFont('Helvetica', 'normal')
      pdf.text("Not Fighting", 128, 115)
    }
    else if (this.notfighting_percentage < 100 && this.notfighting_percentage >= 10) {
      pdf.text(this.notfighting_percentage + "%", 125, 105)
      pdf.setFontSize(15)
      pdf.setFont('Helvetica', 'normal')
      pdf.text("Not Fighting", 129, 115)
    }
    else {
      pdf.text(this.notfighting_percentage + "%", 130, 105)
      pdf.setFontSize(15)
      pdf.setFont('Helvetica', 'normal')
      pdf.text("Not Fighting", 129, 115)
    }

    for(i = 0; i < first_terminator; i++) {
      pdf.line(15, y_position, 195, y_position)
      y_position = y_position + 10
      
      pdf.setFontSize(15)
      pdf.text(this.frame_array[i].toString(), 15, y_position)
      y_position = y_position + 10
      pdf.setFontSize(20)
      pdf.text(this.activity_array[i], 15, y_position)
      y_position = y_position + 10
    }

    if(first_terminator == 4) {
      pdf.addPage()
      y_position = 30
      
      for(i = 4; i < this.activity_array.length; i++) {
        if(j >= 8) {
          j = 0
          pdf.addPage()
          y_position = 30
        }
        
        pdf.line(15, y_position, 195, y_position)
        y_position = y_position + 10
        pdf.setFontSize(15)
        pdf.text(this.frame_array[i].toString(), 15, y_position)
        y_position = y_position + 10
        pdf.setFontSize(20)
        pdf.text(this.activity_array[i], 15, y_position)
        y_position = y_position + 10
  
        j = j + 1
      }
    }

    pdf.save(this.video_name.split('.').slice(0, -1).join('') + ".pdf")
  }

}
