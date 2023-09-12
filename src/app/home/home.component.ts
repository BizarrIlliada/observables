import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, Observable, Observer } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // })

    const customIntervalObservable = Observable.create((observer: Observer<number>) => {
      let count = 0;

      const int = setInterval(() => {
        observer.next(count);

        // if (count === 3) {
        //   observer.complete();
        // }

        count++;

        if (count >= 5) {
          observer.error(new Error('Count is ' + count));
        }
        console.log('Why it is continue going after unsubscribe?');
      }, 1000)

      return () => {
        clearInterval(int);
      }
    })

    this.firstSubscription = customIntervalObservable
      .pipe(
        filter((data: number) => data % 2 === 0),
        map((data: number) => 'String: ' + (data + 1))
      )
      .subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    }, () => {
      console.log('Completed');
    })
  }

  ngOnDestroy(): void {
    this.firstSubscription.unsubscribe();
  }
}
