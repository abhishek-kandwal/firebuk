import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ZacebukHeaderComponent } from './zacebuk-header/zacebuk-header.component';
import { ZacebukWallComponent } from './zacebuk-wall/zacebuk-wall.component';
import { ZacebukSignupComponent } from './zacebuk-signup/zacebuk-signup.component';
import { ZacebukLoginComponent } from './zacebuk-login/zacebuk-login.component';
import { ZacebukFooterComponent } from './zacebuk-footer/zacebuk-footer.component';
import { Routes, RouterModule } from '@angular/router';
import { ZacebukUsrProfileComponent } from './zacebuk-usr-profile/zacebuk-usr-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostdataService } from './post-data.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: '', component: ZacebukWallComponent },
  { path: 'app-zacebuk-login', component: ZacebukLoginComponent },
  { path: 'app-zacebuk-signup', component: ZacebukSignupComponent }
]

export const firebaseConfig = {
  apiKey: 'AIzaSyCoBKG6stqxU9KwS5EsMqDrppApRYW6X20',
  authDomain: 'reactiveform-ffa7e.firebaseapp.com',
  databaseURL: 'https://reactiveform-ffa7e.firebaseio.com',
  projectId: 'reactiveform-ffa7e',
  storageBucket: 'reactiveform-ffa7e.appspot.com',
  messagingSenderId: '236575886616'
};

@NgModule({
  declarations: [
    AppComponent,
    ZacebukHeaderComponent,
    ZacebukWallComponent,
    ZacebukSignupComponent,
    ZacebukLoginComponent,
    ZacebukFooterComponent,
    ZacebukUsrProfileComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule, BrowserAnimationsModule
  ],
  providers: [PostdataService, HttpErrorHandler, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
