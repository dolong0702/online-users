import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;
  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/onlineUsersHub") // Đường dẫn đến Hub trên server
      .build();

    this.startConnection(); // Gọi hàm startConnection() để kết nối SignalR khi service được khởi tạo.
  }
  private startConnection() {
    this.hubConnection.start().then(() => {
      console.log('SignalR connection started.');
    }).catch(err => console.error('Error while starting SignalR connection: ', err));
  }
  public getHubConnection(): signalR.HubConnection {
    return this.hubConnection;
  }
}
