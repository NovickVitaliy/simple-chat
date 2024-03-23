import {Component, Input, OnInit} from '@angular/core';
import {sendMessage} from "@microsoft/signalr/dist/esm/Utils";
import {HubConnection} from "@microsoft/signalr";
import {environment} from "../../../environments/environment.development";
import {SendMessageRequest} from "../../models/sendMessageRequest";
import {User} from "../../models/user";
import {Message} from "../../models/message";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  messageText: string = '';
  @Input({required: true}) user: User | null = null;
  @Input({required: true}) hubConnection: HubConnection | null = null;
  messages: Message[] = [];

  sendMessageToChat() {
    console.log(this.messageText)
    console.log(this.user);
    if (this.messageText && this.user) {
      let messageRequest: SendMessageRequest = {
        message: this.messageText,
        username: this.user?.username
      };
      this.hubConnection?.invoke(environment.sendMessageEndpoint, messageRequest)
        .then(_ => {
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
  ngOnInit(): void {
    this.hubConnection?.on(environment.receiveMessageEndpoints, (message: Message) => {
      this.messages = [message, ...this.messages];
    })

    this.hubConnection?.start();
  }
}
