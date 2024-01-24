import { Directive, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';

import { Subject, Subscription, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Directive({
    selector: '[appCounter]'
})
export class CounterDirective implements OnChanges, OnDestroy {
    private _counterSource$ = new Subject<{count :number, interval : number}>();
    private _subscription = Subscription.EMPTY;

    @Input() counter: number | undefined;
    interval = 1000;
    @Output() value = new EventEmitter<number>();

    constructor() {
        this._subscription = this._counterSource$.pipe(
            switchMap(({ interval, count }) =>
                timer(0, interval).pipe(
                    take(count),
                    tap(() => this.value.emit(--count))
                )
            )
        ).subscribe();
    }

    ngOnChanges(): void {
        if(this.counter == 0) this.value.emit(0);
        this.startTimer();
    }

    public startTimer() {
        this._counterSource$.next({ count: this.counter || 0, interval: this.interval });
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}