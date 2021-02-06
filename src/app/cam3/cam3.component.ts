import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cam3',
  templateUrl: './cam3.component.html',
  styleUrls: ['./cam3.component.sass']
})
export class Cam3Component implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openConfirm(): void {
    const openConfirmDialog = this.dialog.open(ConfirmDeletionDialogComponent)

    openConfirmDialog.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}')
    })
  }

  selectFiletype(): void {
    const openFiletypeDialog = this.dialog.open(SelectFiletypeDialogComponent)

    openFiletypeDialog.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}')
    })
  }

  closeConfirm(): void {
    this.dialog.closeAll()
  }
}

@Component({
  selector: 'confirm-deletion-dialog',
  templateUrl: '../confirm-deletion-dialog/confirm-deletion-dialog.component.html',
})
export class ConfirmDeletionDialogComponent {
  constructor(public dialog: MatDialog) {}
}

@Component({
  selector: 'select-filetype-dialog',
  templateUrl: '../select-filetype-dialog/select-filetype-dialog.component.html',
})
export class SelectFiletypeDialogComponent {
  constructor(public dialog: MatDialog) {}
}
