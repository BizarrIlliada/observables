import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  // *** USE @OUTPUT ONLY WITH EVENT EMITTER, NOT WITH SUBJECT!!! ***
  // *** SUBJECT IS ONLY FOR ACROSS COMPONENT COMMUNICATION ***

  userActivated = false;
  private activatedSub: Subscription;

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe(activated => {
      this.userActivated = activated;
    })
  }

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }
}
