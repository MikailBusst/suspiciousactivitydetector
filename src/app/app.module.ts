import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { UploadVideoComponent } from './upload-video/upload-video.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RetrieveEmailComponent } from './retrieve-email/retrieve-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDeletionDialogComponent } from './confirm-deletion-dialog/confirm-deletion-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectFiletypeDialogComponent } from './select-filetype-dialog/select-filetype-dialog.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { DatabaseService } from './database.service';
import { EmailExistsDialogComponent } from './email-exists-dialog/email-exists-dialog.component';
import { UserIdComponent } from './user-id/user-id.component';
import { ActivityDetectorService } from './activity-detector.service';
import { EmailsentComponent } from './emailsent/emailsent.component';
import { SelectreportComponent } from './selectreport/selectreport.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UploadVideoComponent,
    SigninComponent,
    SignupComponent,
    RetrieveEmailComponent,
    ResetPasswordComponent,
    ConfirmDeletionDialogComponent,
    SelectFiletypeDialogComponent,
    AdminDashboardComponent,
    EmailExistsDialogComponent,
    UserIdComponent,
    EmailsentComponent,
    SelectreportComponent
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
        path: 'selectreport',
        component: SelectreportComponent
      },
      {
        path: 'emailsent',
        component: EmailsentComponent
      },
      {
        path: '',
        component: UploadVideoComponent
      }
    ])
  ],
  providers: [
    DatabaseService,
    UserIdComponent,
    ActivityDetectorService
  ],

  entryComponents: [
    SignupComponent,
    EmailExistsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
