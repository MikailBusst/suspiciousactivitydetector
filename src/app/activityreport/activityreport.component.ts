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
    for(var i = 0; i < Object.keys(activity_JSON).length; i++) {
      //console.log(activity_JSON)
      var activity = Object.keys(activity_JSON).map((key) => [Number(key), activity_JSON[key]])
      
      var activity_selection = activity[i][1].activity_name

      var frame = activity_selection.split(" ")

      this.frame_array.push(frame[0])

      this.activity_array.push(activity_selection.substr(activity_selection.indexOf(" ") + 1))
    }
  }

  GenerateActivityReport() {
    var pdf = new jsPDF()
    var j = 1
    var i = 0
    var y_position = 100
    var first_terminator

    if(this.video_name.length > 13) {
      this.filename_display = this.video_name.substring(0,9) + '...' + this.filename_extension
    }
    else {
      this.filename_display = this.video_name
    }

    if(this.activity_array.length > 6) {
      first_terminator = 6
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

    if(first_terminator == 6) {
      pdf.addPage()
      y_position = 30
      
      for(i = 6; i < this.activity_array.length; i++) {
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
