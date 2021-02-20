import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from '../database.service';
import { ActivityDetectorService } from '../activity-detector.service';  

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
  num_activities = 0
  file_name
  report_id


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

          var filename_display = ''

          if(file.name.length > 13) {
            filename_display = file.name.substring(0,9) + '...' + file_extension
          }
          else {
            filename_display = file.name
          }

          document.getElementById("videoname").innerHTML = filename_display
          document.getElementById("videosize").innerHTML = rounded_size.toString() + " " + filesize_unit

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
    for(var i = 0; i < Object.keys(activity_JSON).length; i++) {
      //console.log(activity_JSON)
      var activity = Object.keys(activity_JSON).map((key) => [Number(key), activity_JSON[key]])

      if(activity[i][1] == "") {
        continue
      }

      this.frame_array.push(activity[i][0])
      this.activity_array.push(activity[i][1])
    }

    $(".loader").removeClass("loader-show")
    $(".loader").addClass("loader-hidden")

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
      },
      err=>{
        console.log("Connection failed!")
      }
    )
  }

}

@Component({
  selector: 'select-filetype-dialog',
  templateUrl: '../select-filetype-dialog/select-filetype-dialog.component.html',
})
export class SelectFiletypeDialogComponent {
  constructor(public dialog: MatDialog) {}
}
