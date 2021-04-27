import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import {io} from 'socket.io-client/build/index';

import * as socketIo from 'socket.io-client';
import { Socket } from '../app/shared/socket';

@Injectable()
export class WebSocketService {

    socket: Socket;
    observer: Observer<string>;

    // constructor() {
    //     this.socket = io('http://localhost:3000');
    //     console.log(this.socket);
    //     this.socket.on('alertToClient', (res) => {
    //         console.log(res);
    //       })
    // }
    
    getQuotes() : Observable<string> {
        console.log("bbbbbbbbbbbbbbbbb");
        this.socket = io('http://localhost:4000');
        this.socket.on('alertToClient', (res) => {
          console.log(res);
          this.observer.next(res);
        });
    
        return this.listen("alertToClient");
      }

      createObservable() : Observable<string> {
        return new Observable<string>(observer => {
          this.observer = observer;
        });
    }
    listen(eventname: string) : Observable<any> {
        console.log(eventname);
        return new Observable((subscriber) => {
           // console.log(subscriber);
            this.socket.on(eventname, (data) => {
                console.log(data);
                subscriber.next(data);
                console.log(data);
            })
        })
    }
    private handleError(error) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            let errMessage = error.error.message;
            return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Socket.io server error');
      }
    
    
 
}