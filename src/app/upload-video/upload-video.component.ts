import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from '../database.service';
import { ActivityDetectorService } from '../activity-detector.service';
import jsPDF from 'jspdf';  

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.sass'],
})
export class UploadVideoComponent implements OnInit {

  url = null
  UserID
  fileToUpload: File = null
  activity_JSON = null
  frame_array = []
  activity_array = []
  file_name
  report_id
  filename_display
  filesize_display
  total_activities = 0
  fighting_percentage
  notfighting_percentage

  constructor(public dialog: MatDialog, private databaseService:DatabaseService, private ads:ActivityDetectorService) { }

  ngOnInit(): void {
    this.UserID = localStorage.getItem("id")

    console.log(this.UserID)

    if(this.UserID == null || this.UserID == "0") {
      this.UserID = 0
    }

    //console.log(this.UserID)
  }

  selectFiletype(): void {
    const openFiletypeDialog = this.dialog.open(SelectFiletypeDialogComponent)

    openFiletypeDialog.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}')
    })
  }

  retrieve_filetype(file_name): string {
    var file_extension = ""

    var final_file = file_name.split("\\").pop()

    file_extension = final_file.split(".").pop()

    return file_extension
  }

  onSelectFile(event) {
    const file = event.target.files && event.target.files[0]

    var activity_JSON = null
    var frame_array = []
    var activity_array = []

    var file_extension = this.retrieve_filetype(file.name)

    //console.log(file_extension)

    if(file_extension == "webm" || file_extension == "mp4") {
      document.getElementById("invalidfile").innerHTML = ""

      if (file) {
        if (file.size <= 50000000) {
          document.getElementById("invalidfile").innerHTML = ""

          $(".videoinfo").removeClass("videoinfo-hidden")
          $(".videoinfo").addClass("videoinfo-show")

          this.file_name = file.name

          //$(".activitylist").removeClass("activitylist-hidden")
          //$(".activitylist").addClass("activitylist-show")

          var rounded_size = 0
          var filesize_unit = ''

          if(file.size < 1000000) {
            rounded_size = Math.round(file.size / 1000)
            filesize_unit = 'KB'
          }
          else{
            rounded_size = Math.round(file.size / 1000000)
            filesize_unit = 'MB'
          }

          //console.log(file.name.length)

          if(file.name.length > 13) {
            this.filename_display = file.name.substring(0,9) + '...' + file_extension
          }
          else {
            this.filename_display = file.name
          }

          this.filesize_display = rounded_size.toString() + " " + filesize_unit

          document.getElementById("videoname").innerHTML = this.filename_display
          document.getElementById("videosize").innerHTML = this.filesize_display

          var reader = new FileReader()
          reader.readAsDataURL(file)
    
          reader.onload = (event) => {
            this.url = (<FileReader>event.target).result
          }

          //this.fileToUpload = file.item(0)

          this.ads.UploadVideo(file).subscribe(
            res=>{
              //console.log(res)
              this.getActivity(res)
            },
            err=>{
              console.log("Connection failed!")
            }
          )

          //activity_JSON = {"15": "Not Fighting", "30": "No person detected", "45": "Not Fighting", "60": "", "75": "Not Fighting", "90": "Not Fighting", "105": "No person detected", "120": "", "135": "Not Fighting", "150": "No person detected"}

          //this.getActivity(activity_JSON)
          
          /*for(var i = 0; i < Object.keys(activity_JSON).length; i++) {
            frame_array.push(activity_JSON[i][0])
            activity_array.push(activity_JSON[i][1])
          }

          console.log(frame_array)
          console.log(activity_array)*/
        }
        else {
          document.getElementById('invalidfile').innerHTML = "The video file is more than 50MB"
        }
      }
    }
    else {
      document.getElementById("invalidfile").innerHTML = "Invalid file"
    }
  }

  getActivity(activity_JSON) {
    var num_fighting = 0
    var num_notfighting = 0

    for(var i = 0; i < Object.keys(activity_JSON).length; i++) {
      var activity = Object.keys(activity_JSON).map((key) => [Number(key), activity_JSON[key]])

      if(activity[i][1] == "") {
        continue
      }
      else if(activity[i][1] == "Fighting") {
        this.total_activities = this.total_activities + 1
        num_fighting = num_fighting + 1
      }
      else if(activity[i][1] == "Not Fighting") {
        this.total_activities = this.total_activities + 1
        num_notfighting = num_notfighting + 1
      }
      else {
        this.total_activities = this.total_activities + 1
      }

      this.fighting_percentage = Math.round(num_fighting / this.total_activities * 100)
      this.notfighting_percentage = Math.round(num_notfighting / this.total_activities * 100)

      this.frame_array.push(activity[i][0])
      this.activity_array.push(activity[i][1])
    }

    $(".loader").removeClass("loader-show")
    $(".loader").addClass("loader-hidden")

    $(".percentages-section").removeClass("percentages-hidden")
    $(".percentages-section").addClass("percentages")

    $(".activitylist").removeClass("activitylist-hidden")
    $(".activitylist").addClass("activitylist-show")

    if(this.UserID != 0 && this.UserID != null) {
      this.AddReport()
      $(".report_button_error").removeClass("download_report_button_denied")
      $(".report_button_error").addClass("download_report_button_denied_hidden")
    }
  }

  AddReport() {
    this.databaseService.AddActivityReport(this.file_name, this.UserID).subscribe(
      res=>{
        //console.log(res)
        this.report_id = res
        this.AddLog()
      },
      err=>{
        console.log("Connection failed!")
      }
    )
  }

  AddLog() {
    var log_array = []

    for(var i = 0; i < this.frame_array.length; i++) {
      log_array.push(this.frame_array[i] + " " + this.activity_array[i])
    }

    this.databaseService.AddActivityLog(this.report_id, JSON.stringify(log_array)).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log("Connection failed!")
      }
    )    
  }

  GenerateActivityReport() {
    var pdf = new jsPDF()
    var j = 1
    var i = 0
    var y_position = 140
    var first_terminator

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
    pdf.setFontSize(15)
    pdf.text(this.filesize_display, 15, 85)

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
        if(j >= 9) {
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

    pdf.save(this.file_name.split('.').slice(0, -1).join('') + ".pdf")
  }

}

@Component({
  selector: 'select-filetype-dialog',
  templateUrl: '../select-filetype-dialog/select-filetype-dialog.component.html',
})
export class SelectFiletypeDialogComponent {
  constructor(public dialog: MatDialog) {}
}
