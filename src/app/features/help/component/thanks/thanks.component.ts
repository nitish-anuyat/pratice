import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent, DialogService } from 'src/app/global/service';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.scss']
})
export class ThanksComponent {
  dialogRef: any;
  ticket: any;
  contactTxt: any;

  constructor(
    private viewContainer: ViewContainerRef, 
    private dialogService: DialogService,
    private router: Router
    ) {
    const _injector = this.viewContainer.injector;
    this.dialogRef = _injector.get<DialogComponent>(DialogComponent);
  }

  close(){
    this.dialogRef.closeEvent.emit();
    this.router.navigate(['/']);
  }
}
