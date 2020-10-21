import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { FeedComponent } from './feed/feed.component';
import { Cam1Component } from './cam1/cam1.component';
import { Cam2Component } from './cam2/cam2.component';
import { Cam3Component } from './cam3/cam3.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RetrieveEmailComponent } from './retrieve-email/retrieve-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeletionDialogComponent } from './confirm-deletion-dialog/confirm-deletion-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectFiletypeDialogComponent } from './select-filetype-dialog/select-filetype-dialog.component';
import { AddFeedDialogComponent } from './add-feed-dialog/add-feed-dialog.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { DatabaseService } from './database.service';
import { EmailExistsDialogComponent } from './email-exists-dialog/email-exists-dialog.component';
import { UserIdComponent } from './user-id/user-id.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UploadVideoComponent,
    FeedComponent,
    Cam1Component,
    Cam2Component,
    Cam3Component,
    SigninComponent,
    SignupComponent,
    RetrieveEmailComponent,
    ResetPasswordComponent,
    ConfirmDeletionDialogComponent,
    SelectFiletypeDialogComponent,
    AddFeedDialogComponent,
    AdminDashboardComponent,
    EmailExistsDialogComponent,
    UserIdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RecaptchaModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'camera_feed',
        component: FeedComponent
      },
      {
        path: 'admin_dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'reset_password',
        component: ResetPasswordComponent
      },
      {
        path: 'retrieve_email',
        component: RetrieveEmailComponent
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: '',
        component: UploadVideoComponent
      }
    ])
  ],
  providers: [
    DatabaseService,
    UserIdComponent
  ],

  entryComponents: [
    SignupComponent,
    EmailExistsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
