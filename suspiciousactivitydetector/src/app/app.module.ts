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
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
