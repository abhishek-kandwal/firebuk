import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ZacebukHeaderComponent } from './zacebuk-header/zacebuk-header.component';
import { ZacebukWallComponent } from './zacebuk-wall/zacebuk-wall.component';
import { ZacebukSignupComponent } from './zacebuk-signup/zacebuk-signup.component';
import { ZacebukLoginComponent } from './zacebuk-login/zacebuk-login.component';
import { ZacebukFooterComponent } from './zacebuk-footer/zacebuk-footer.component';
import { Routes, RouterModule } from '@angular/router';
import { ZacebukUsrProfileComponent } from './zacebuk-usr-profile/zacebuk-usr-profile.component';
import { ReactiveFormsModule } from '@angular/forms';


const appRoutes: Routes = [
  { path: '', component: ZacebukWallComponent },
  { path: 'app-zacebuk-login', component: ZacebukLoginComponent },
  { path: 'app-zacebuk-signup', component: ZacebukSignupComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ZacebukHeaderComponent,
    ZacebukWallComponent,
    ZacebukSignupComponent,
    ZacebukLoginComponent,
    ZacebukFooterComponent,
    HttpClientModule,
    ZacebukUsrProfileComponent,
  ],
  
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
