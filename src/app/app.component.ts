import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from './web-socket.service';
import { Socket } from '../app/shared/socket';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'automobile-front';
  stockQuote: string;
  sub: Subscription;
  feedback: string;
  //private socket: any;
  public data: any;

  constructor(private dataService: WebSocketService,private toastr: ToastrService) {
  //  this.socket = io('http://127.0.0.1:4000');
    
   }

  ngOnInit() {
    // console.log('TESTtttttttttttttttttttttttt');
    // this.sub = this.dataService.getQuotes()
    //     .subscribe(quote => {
    //       this.stockQuote = quote;  
    //     });
    //     console.log(this.stockQuote);
    //     this.updateFeedback(this.stockQuote);
  }

  updateFeedback(data: any){
    console.log("upaseteee");
    this.feedback = this.data+"is typing a message";
    this.toastr.success('updating',this.feedback ); 
      
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
