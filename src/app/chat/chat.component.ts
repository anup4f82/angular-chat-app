import { Component, OnInit } from '@angular/core';
import { Chat } from './chat';
import { ChatService } from './chat.service';
import { FormsModule } from '@angular/forms';


interface Response {
  error: any,
  mentions:string[],
  links:string[],
  emotions:string[]
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {

	ngOnInit() {}
	
  constructor(private chatService: ChatService) { }

  model:Chat = new Chat('');
  output:any = {};
  submitted:boolean = false;
  showError:boolean = false;

  onSubmit() {
  	this.chatService.parseMessage(this.model.message).then((res:Response)=>{
      if (res.error) {
        this.showError = true;
      } else {
        this.output = JSON.stringify(res);
        this.submitted = true;
        this.model = new Chat('');
      }
  		
  	});

  }

  onEnter() {
    if (this.submitted) {

    }
  }

}
