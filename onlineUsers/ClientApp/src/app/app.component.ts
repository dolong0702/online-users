import { Component, OnInit } from '@angular/core';
import { SignalrService } from 'src/app/services/signalr.service';
//thêm
import { OnlineUserService } from 'src/app/services/online-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';
  public onlineUsersCount: number = 0;
  constructor(
    private signalRService: SignalrService,
    private onlineUsersService: OnlineUserService
  ) { }
  ngOnInit(): void {
    // Khi component được khởi tạo, service SignalR sẽ tự động thực hiện kết nối SignalR.
    // Bạn có thể sử dụng các phương thức và xử lý SignalR trong service SignalRService.
    const connection = this.signalRService.getHubConnection();

    connection.on("UpdateOnlineUsers", (count) => {
      this.onlineUsersCount = count;
      this.onlineUsersService.updateOnlineUsersCount(count); // Cập nhật giá trị vào service
      console.log("Number of online users:", count);
    });
  }
}
