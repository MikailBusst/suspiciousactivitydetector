import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.sass'],
})
export class UploadVideoComponent implements OnInit {

  url = null
  UserID

  constructor(public dialog: MatDialog, private databaseService:DatabaseService) { }

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

    console.log(file)

    console.log(file.name)

    var file_extension = this.retrieve_filetype(file.name)

    console.log(file_extension)

    if(file_extension == "webm" || file_extension == "mkv" || file_extension == "flv" || file_extension == "vob" || file_extension == "ogv" || file_extension == "ogg" || file_extension == "drc" || file_extension == "gif" || file_extension == "gifv" || file_extension == "mng" || file_extension == "avi" || file_extension == "MTS" || file_extension == "mts" || file_extension == "M2TS" || file_extension == "m2ts" || file_extension == "TS" || file_extension == "ts" || file_extension == "mov" || file_extension == "qt" || file_extension == "wmv" || file_extension == "yuv" || file_extension == "rm" || file_extension == "rmvb" || file_extension == "viv" || file_extension == "asf" || file_extension == "amv" || file_extension == "mp4" || file_extension == "m4p" || file_extension == "m4v" || file_extension == "mpg" || file_extension == "mp2" || file_extension == "mpeg" || file_extension == "mpe" || file_extension == "mpv" || file_extension == "mpg" || file_extension == "mpeg" || file_extension == "m2v" || file_extension == "svi" || file_extension == "3gp" || file_extension == "3g2" || file_extension == "mxf" || file_extension == "roq" || file_extension == "nsv" || file_extension == "f4v" || file_extension == "f4p" || file_extension == "f4a" || file_extension == "f4b") {
      document.getElementById("invalidfile").innerHTML = ""

      if (file) {
        if (file.size <= 50000000) {
          document.getElementById("invalidfile").innerHTML = ""

          $("#video").removeClass("video-hidden")
          $("#video").addClass("video")

          $("#activity-list").removeClass("activity-list-hidden")
          $("#activity-list").addClass("activity-list")


          var rounded_size = Math.round(file.size / 1000000)

          document.getElementById("videoname").innerHTML = file.name
          document.getElementById("videosize").innerHTML = rounded_size.toString() + " MB"

          var reader = new FileReader()
          reader.readAsDataURL(file)
    
          reader.onload = (event) => {
            this.url = (<FileReader>event.target).result
          }
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
