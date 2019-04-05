import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(
    private httpClient: HttpClient,
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    );
  }

  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token;
        this.angularFireDB.object('fcmTokens/').update(data);
      });
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log('new message received. ', payload);
        this.currentMessage.next(payload);
      });
  }
  // Sending the payload with fcm url
  // this requires server token
  sendPushMessage(title, message) {
    const data = {
        notification: {
            title: title,
            body: message,
            click_action: 'http://localhost:4200/',
            icon: 'http://url-to-an-icon/icon.png',
            sound : 'default'
        },
        to: 'fCkpM32eSxw:APA91bFv4P1jvPAn-RcszDzQ1g2IzG39CLF8EqzSnMEhHZASOgJDh-VOV49ux_gXoRLzgy6I5PpFLBxnucM4cFIgWQXg4c6jvptzZw-YKlOd3rDmDN5bTaXpPG4Je_CsJh_ElT7YoARU'
    };

    const postData = JSON.stringify(data);
    const url = 'https://fcm.googleapis.com/fcm/send' ;
    this.httpClient.post(url,  postData, {
      headers: new HttpHeaders()
      // put the server key here
          .set('Authorization', 'key=AAAAq1366b4:APA91bEz2O8ySZrBwlH6LoOy4jnIDnLp1M9MVV71SBqKjzo2DQWPog-OZJz9ttbWIXmMRYXB0qXDdcHI_wBE_p-Dtrhenzzc6RF3zQqODET5jyCWwi9_rYyRFWxGytM_wlaiaatHwqvl')
          .set('Content-Type', 'application/json'),
     })
     .subscribe((response: Response) => {
        // console.log(response);
      },
      (error: Response) => {
        console.log(error);
        console.log('error' + error);
      });
  }
}
