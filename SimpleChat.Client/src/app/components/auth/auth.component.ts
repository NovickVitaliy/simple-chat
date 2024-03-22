import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {HubConnection} from "@microsoft/signalr";
import {User} from "../../models/user";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.username);
  }
  username: string = '';
  @Output() newUser: EventEmitter<User> = new EventEmitter<User>();
  enterChat() {
    console.log(this.username)
    if(this.username) {
      this.newUser.emit({
        username: this.username
      });
    }
  }
}
