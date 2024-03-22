import {Component, OnInit} from '@angular/core';
import {User} from "./models/user";
import * as signalR from "@microsoft/signalr";
import {HubConnection} from "@microsoft/signalr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'SimpleChat.Client';
  isAuthenticated: boolean = false;
  currentUser: User | null = null;
  hubConnection: HubConnection | null = null;
  ngOnInit(): void {
    //this.loadUserFromLocalStorage();
    this.setupWebSocketConnection();
    if(this.currentUser){
      this.hubConnection?.start();
    }
  }

  private loadUserFromLocalStorage() {
    let user = localStorage.getItem('simpleChatUser');
    if(user){
      this.currentUser = JSON.parse(user);
      this.isAuthenticated = true;
    }
  }

  private setupWebSocketConnection() {
     this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5191/chat')
      .build();
  }

  handleNewUser(user: User){
    localStorage.setItem('simpleChatUser', JSON.stringify(user));
    this.currentUser = user;
    this.isAuthenticated = true;
  };
}
