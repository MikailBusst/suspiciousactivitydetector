import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass']
})
export class FeedComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  cam1show = true
  cam2show = false
  cam3show = false

  ngOnInit(): void {
  }

  activatefeed1(): void {
    this.cam1show = true
    this.cam2show = false
    this.cam3show = false
  }

  activatefeed2(): void {
    this.cam1show = false
    this.cam2show = true
    this.cam3show = false
  }

  activatefeed3(): void {
    this.cam1show = false
    this.cam2show = false
    this.cam3show = true
  }

  openAddFeed(): void {
    const openAddDialog = this.dialog.open(AddFeedDialogComponent)

    openAddDialog.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}')
    })
  }

}

@Component({
  selector: 'app-add-feed-dialog',
  templateUrl: '../add-feed-dialog/add-feed-dialog.component.html',
})
export class AddFeedDialogComponent{
  constructor() { }
}
