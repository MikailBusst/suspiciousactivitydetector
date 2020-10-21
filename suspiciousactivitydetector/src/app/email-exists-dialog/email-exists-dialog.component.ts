import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-exists-dialog',
  templateUrl: './email-exists-dialog.component.html',
  styleUrls: ['./email-exists-dialog.component.sass']
})
export class EmailExistsDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    //Dummy function to stop the error from showing
  }
}
