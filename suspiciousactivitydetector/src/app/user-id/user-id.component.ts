import { Component, Injectable, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.sass']
})

@Injectable()
export class UserIdComponent implements OnInit {

  UserID

  constructor(private databaseService:DatabaseService) { }

  ngOnInit(): void {
  }

}
