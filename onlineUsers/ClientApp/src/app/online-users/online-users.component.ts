import { Component, OnInit } from '@angular/core';
import { OnlineUserService } from 'src/app/services/online-user.service';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.css']
})
export class OnlineUsersComponent implements OnInit {
  public onlineUsersCount: number = 0;

  constructor(private onlineUsersService: OnlineUserService) { }

  ngOnInit(): void {
    this.onlineUsersService.onlineUsersCount$.subscribe(count => {
      this.onlineUsersCount = count;
    });
  }
}
