import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-upcoming-plan',
  templateUrl: './upcoming-plan.component.html',
  styleUrls: ['./upcoming-plan.component.scss']
})
export class UpcomingPlanComponent {

  @Input() planDetails : any;
  @Input() isForModal  = false;
  @Output() triggerEvent : EventEmitter<any> = new EventEmitter();
  
}
