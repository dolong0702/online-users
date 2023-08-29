// online-users.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OnlineUserService {
  private onlineUsersCountSource = new BehaviorSubject<number>(0);
  public onlineUsersCount$ = this.onlineUsersCountSource.asObservable();

  public updateOnlineUsersCount(count: number) {
    this.onlineUsersCountSource.next(count);
  }
}
