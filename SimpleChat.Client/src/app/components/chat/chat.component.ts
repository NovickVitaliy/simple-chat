import {Component, Input, OnInit} from '@angular/core';
import {sendMessage} from "@microsoft/signalr/dist/esm/Utils";
import {HubConnection} from "@microsoft/signalr";
import {environment} from "../../../environments/environment.development";
import {SendMessageRequest} from "../../models/sendMessageRequest";
import {User} from "../../models/user";
import {Message} from "../../models/message";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {MessageType} from "../../models/message-type";
import {NgForm} from "@angular/forms";

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
  chatUsers: number = 0;

  sendMessageToChat(form: NgForm) {
    console.log(form.value)
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
        }).finally(() => {
          this.messageText = '';
      });
    }
  }
  ngOnInit(): void {

    this.setSignalrEndpoints();

    this.hubConnection?.start();
  }

  protected readonly MessageType = MessageType;

  private setSignalrEndpoints() {
    this.hubConnection?.on(environment.receiveMessageEndpoints, (message: Message) => {
      this.messages = [message, ...this.messages];
    })

    this.hubConnection?.on(environment.updateUserCount, (userCount: number) => {
      this.chatUsers = userCount;
    });
  }
}
