import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";

import { Socket } from '../app/shared/socket';
import { ToastrService } from "ngx-toastr";
import socketIo from 'socket.io-client';

@Injectable()
export class WebSocketService {

    socket: Socket;
    observer: Observer<string>;
    constructor(private toastr: ToastrService) { }
    
    getListen() : Observable<string> {
        console.log("bbbbbbbbbbbbbbbbb");
        this.socket = socketIo('http://localhost:3000');
        
        this.socket.on('alertToClient', (res) => {
          this.toastr.success('Downloaded CSV File', res, {
            timeOut: 10000,
          });
          this.observer.next(res);
        });
        return this.createObservable();
       
      }

      createObservable() : Observable<string> {
        return new Observable<string>(observer => {
          this.observer = observer;
        });
    }
    listen(eventname: string) : Observable<any> {
      this.toastr.success('updated!',eventname ); 
        return new Observable((subscriber) => {
           // console.log(subscriber);
            this.socket.on(eventname, (data) => {
                console.log(data);
                subscriber.next(data);
               
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