import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from '../../services/socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent implements OnDestroy {
  private initializeSubscription: Subscription;

  public username: string = '';
  public password: string = '';
  public channel: string = '';

  constructor(private socketService: SocketService) {
    this.initializeSubscription = this.socketService.initializeEvent.subscribe((event) => {
      this.username = event.twitchUsername;
      this.password = event.twitchPassword;
      this.channel = event.twitchChannel;
    });
  }

  ngOnDestroy(): void {
    this.initializeSubscription.unsubscribe();
  }

  connect(): void {
    this.socketService.twitchConnect(this.username, this.password, this.channel);
  }
}
