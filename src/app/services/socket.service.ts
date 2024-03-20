import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { IAlertEvent, IMessageEvent, IRedemptionEvent } from '../models/event.models';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  private messageEventSubject: Subject<IMessageEvent> = new Subject();
  public messageEvent: Observable<IMessageEvent> = this.messageEventSubject.asObservable();

  private alertEventSubject: Subject<IAlertEvent> = new Subject();
  public alertEvent: Observable<IAlertEvent> = this.alertEventSubject.asObservable();

  private redemptionEventSubject: Subject<IRedemptionEvent> = new Subject();
  public redemptionEvent: Observable<IRedemptionEvent> = this.redemptionEventSubject.asObservable();

  constructor() {
    this.socket = io('ws://localhost:3000');

    this.socket.on('message', (event: IMessageEvent) => {
      this.messageEventSubject.next(event);
    });

    this.socket.on('alert', (event: IAlertEvent) => {
      this.alertEventSubject.next(event);
    });

    this.socket.on('redemption', (event: IRedemptionEvent) => {
      this.redemptionEventSubject.next(event);
    });
  }
}
