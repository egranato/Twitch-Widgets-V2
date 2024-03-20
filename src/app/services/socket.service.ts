import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { IAlertEvent, IInitializeEvent, IMessageEvent, IRedemptionEvent } from '../models/event.models';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  private messageEventSubject: Subject<IMessageEvent> = new Subject<IMessageEvent>();
  public messageEvent: Observable<IMessageEvent> = this.messageEventSubject.asObservable();

  private alertEventSubject: Subject<IAlertEvent> = new Subject<IAlertEvent>();
  public alertEvent: Observable<IAlertEvent> = this.alertEventSubject.asObservable();

  private redemptionEventSubject: Subject<IRedemptionEvent> = new Subject<IRedemptionEvent>();
  public redemptionEvent: Observable<IRedemptionEvent> = this.redemptionEventSubject.asObservable();

  private initializeEventSubject: Subject<IInitializeEvent> = new Subject<IInitializeEvent>();
  public initializeEvent: Observable<IInitializeEvent> = this.initializeEventSubject.asObservable();

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

    this.socket.on('initialize', (event: IInitializeEvent) => {
      this.initializeEventSubject.next(event);
    });
  }

  twitchConnect(username: string, password: string, channel: string) {
    this.socket.emit("twitchConnect", {username, password, channel});
  }
}
