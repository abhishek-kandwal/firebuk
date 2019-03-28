import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fakeBackendProvider, ErrorInterceptor, JwtInterceptor } from './_helpers';
import { AuthGuard } from './_guards';
import { FetchJsonDataService } from './fetch-json-data.service';
import { AlertComponent } from './_components';
import { AuthenticationService, AlertService, UserService } from './_services';

const appRoutes: Routes = [
  { path: '', component: ZacebukWallComponent },
  { path: 'app-zacebuk-login', component: ZacebukLoginComponent },
  { path: 'app-zacebuk-signup', component: ZacebukSignupComponent }
];

export const firebaseConfig = {
  apiKey: 'AIzaSyC97Es6nksal1bccXYMKdpfL6ujz0PXIJY',
  authDomain: 'example-81cdf.firebaseapp.com',
  databaseURL: 'https://example-81cdf.firebaseio.com',
  projectId: 'example-81cdf',
  storageBucket: 'example-81cdf.appspot.com',
  messagingSenderId: '736016132542'
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
    AlertComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule, BrowserAnimationsModule,
    ShowHidePasswordModule
  ],
  providers: [PostdataService, HttpErrorHandler, MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider,
    FetchJsonDataService,
    AuthenticationService,
    AlertService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
