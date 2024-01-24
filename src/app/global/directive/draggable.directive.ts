import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { BrowserService } from '../service';

@Directive({
  selector: '[gbDraggable]'
})
export class DraggableDirective {

  isDraggable = false;
  isBrowser = false;
  gridBreakpoints : any = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
  };

  @HostBinding('class.draggable') draggable = true;

  @HostBinding('attr.touch-action') touchAction = 'none';

  @Input() breakPoint: string | undefined = undefined;
  @Output() dragStart = new EventEmitter<PointerEvent>();
  @Output() dragMove = new EventEmitter<PointerEvent>();
  @Output() dragEnd = new EventEmitter<PointerEvent>();

  @HostBinding('class.dragging') dragging = false;

  @HostListener('touchstart', ['$event'])
  // @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    event.stopPropagation();
    this.dragging = this.isDraggable;
    if(this.dragging){
      this.dragStart.emit(event);  
    }
  }

  // @HostListener('document:pointermove', ['$event'])
  // onPointerMove(event: PointerEvent): void {
  //   if (!this.dragging) {
  //     return;
  //   }

  //   this.dragMove.emit(event);
  // }

  @HostListener('touchend', ['$event'])
  // @HostListener('document:pointerup', ['$event'])
  onPointerUp(event: PointerEvent): void {
    if (!this.dragging) {
      return;
    }
    event.stopPropagation();
    this.dragging = false;
    this.dragEnd.emit(event);
  }

  @HostListener('window:resize', ['$event'])
	onResize(event : any) {
    if(this.breakPoint && this.gridBreakpoints[this.breakPoint] > event.target.innerWidth){
      this.isDraggable = true;
    } else {
      this.isDraggable = false;
    }
	}

  @HostListener('change') onChange() {
    if(this.isBrowser){
      if(this.breakPoint && this.gridBreakpoints[this.breakPoint] > window.innerWidth){
        this.isDraggable = true;
      } else {
        this.isDraggable = false;
      }
    }
  }


  constructor(private browserService : BrowserService){
    browserService.getIsBrowser().subscribe(isBrowser => {
      this.isBrowser = isBrowser;
    });
  }
}
