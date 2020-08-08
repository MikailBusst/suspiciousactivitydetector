import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'suspiciousactivitydetector';

  url = null

  retrieve_filetype(file_name): string {
    var file_extension = ""

    var final_file = file_name.split("\\").pop()

    file_extension = final_file.split(".").pop()

    return file_extension
  }

  onSelectFile(event) {
    const file = event.target.files && event.target.files[0]

    console.log(file.name)

    var file_extension = this.retrieve_filetype(file.name)

    console.log(file_extension)

    if(file_extension == "webm" || file_extension == "mkv" || file_extension == "flv" || file_extension == "vob" || file_extension == "ogv" || file_extension == "ogg" || file_extension == "drc" || file_extension == "gif" || file_extension == "gifv" || file_extension == "mng" || file_extension == "avi" || file_extension == "MTS" || file_extension == "mts" || file_extension == "M2TS" || file_extension == "m2ts" || file_extension == "TS" || file_extension == "ts" || file_extension == "mov" || file_extension == "qt" || file_extension == "wmv" || file_extension == "yuv" || file_extension == "rm" || file_extension == "rmvb" || file_extension == "viv" || file_extension == "asf" || file_extension == "amv" || file_extension == "mp4" || file_extension == "m4p" || file_extension == "m4v" || file_extension == "mpg" || file_extension == "mp2" || file_extension == "mpeg" || file_extension == "mpe" || file_extension == "mpv" || file_extension == "mpg" || file_extension == "mpeg" || file_extension == "m2v" || file_extension == "svi" || file_extension == "3gp" || file_extension == "3g2" || file_extension == "mxf" || file_extension == "roq" || file_extension == "nsv" || file_extension == "f4v" || file_extension == "f4p" || file_extension == "f4a" || file_extension == "f4b") {
      document.getElementById("invalidfile").innerHTML = ""

      if (file) {
        var reader = new FileReader()
        reader.readAsDataURL(file)
  
        reader.onload = (event) => {
          this.url = (<FileReader>event.target).result
        }
      }
    }
    else {
      document.getElementById("invalidfile").innerHTML = "Invalid file"
    }
  }
}
