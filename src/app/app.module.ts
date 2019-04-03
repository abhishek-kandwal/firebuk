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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PostdataService } from './post-data.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { MessagingService } from './messaging.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fakeBackendProvider, ErrorInterceptor, JwtInterceptor } from './_helpers';
import { AuthGuard } from './_guards';
import { FetchJsonDataService } from './fetch-json-data.service';
import { AlertComponent } from './_components';
import { AuthenticationService, AlertService, UserService } from './_services';
import { CurrentUserService } from './current-user.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AuthService } from './auth/auth.service';
import { AngularFireStorage } from 'angularfire2/storage';

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
