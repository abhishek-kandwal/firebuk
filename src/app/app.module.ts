import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireStorage } from 'angularfire2/storage';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';
import { CurrentUserService } from './current-user.service';
import { FetchJsonDataService } from './fetch-json-data.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { MessagingService } from './messaging.service';
import { PostdataService } from './post-data.service';
import { ZacebukFooterComponent } from './zacebuk-footer/zacebuk-footer.component';
import { ZacebukHeaderComponent } from './zacebuk-header/zacebuk-header.component';
import { ZacebukLoginComponent } from './zacebuk-login/zacebuk-login.component';
import { ZacebukSignupComponent } from './zacebuk-signup/zacebuk-signup.component';
import { ZacebukUsrProfileComponent } from './zacebuk-usr-profile/zacebuk-usr-profile.component';
import { ZacebukWallComponent } from './zacebuk-wall/zacebuk-wall.component';
import { AlertComponent } from './_components';
import { ErrorInterceptor, fakeBackendProvider, JwtInterceptor } from './_helpers';
import { AlertService, AuthenticationService, UserService } from './_services';


const appRoutes: Routes = [
  { path: '', component: ZacebukWallComponent},
  { path: 'app-zacebuk-login', component: ZacebukLoginComponent },
  { path: 'app-zacebuk-signup', component: ZacebukSignupComponent },
  { path: 'app-zacebuk-profile', component: ZacebukUsrProfileComponent},
];

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
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule, BrowserAnimationsModule,
    ShowHidePasswordModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    PostdataService,
    HttpErrorHandler,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    fakeBackendProvider,
    FetchJsonDataService,
    AuthenticationService,
    AlertService,
    UserService,
    CurrentUserService,
    MessagingService,
    AuthService,
    AngularFireStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
