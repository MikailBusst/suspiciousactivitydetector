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

    var file_extension = this.retrieve_filetype(file.name)

    //console.log(file_extension)

    if(file_extension == "webm" || file_extension == "mp4") {
      document.getElementById("invalidfile").innerHTML = ""

      if (file) {
        if (file.size <= 50000000) {
          document.getElementById("invalidfile").innerHTML = ""

          $(".videoinfo").removeClass("videoinfo-hidden")
          $(".videoinfo").addClass("videoinfo-show")

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
              console.log(res)
            },
            err=>{
              console.log("Connection failed!")
            }
          )
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

}

@Component({
  selector: 'select-filetype-dialog',
  templateUrl: '../select-filetype-dialog/select-filetype-dialog.component.html',
})
export class SelectFiletypeDialogComponent {
  constructor(public dialog: MatDialog) {}
}
