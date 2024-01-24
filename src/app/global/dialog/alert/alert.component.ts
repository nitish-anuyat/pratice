import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DialogComponent, DialogService } from '../../service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit{

  title = 'Something went wrong!';
  body = 'Oops, it seems like we have run into an error. Please rectify the problems and try again'
  dialogRef: DialogComponent;
  titleArr: string[] = ['Successful!', 'Error', 'Info', 'Warning']
  type!: string
  buttonGroup = [
    { cssClass: 'btn-secondary', title: 'Back', value: false},
    { cssClass: 'ms-auto btn-danger', title: 'Try Again', value: false},
    { cssClass: 'ms-auto', title: 'Close', value: false},
    { cssClass: 'ms-auto', title: 'Continue', value: false},
    { cssClass: 'ms-auto', title: 'Upload Another', value: false}
  ]

  constructor(private viewContainer: ViewContainerRef, private dialogService: DialogService) {

    const _injector = this.viewContainer.injector;
    this.dialogRef = _injector.get<DialogComponent>(DialogComponent);
  }

  ngOnInit(): void {
    this.title = this.dialogRef.context.title;
    this.body = this.dialogRef.context.body;
    this.type = this.dialogRef.context.type

    switch (true) {
      case this.title == 'Error':
        this.buttonGroup = this.buttonGroup.filter(x => x.title == 'Back' || x.title == 'Try Again')
        break;
      case (this.title == 'Successful!' && this.type == 'Inventory') || this.type == 'Success':
        this.buttonGroup = this.buttonGroup.filter(x => x.title == 'Continue' || x.title == 'Upload Another')
        break;
      case this.title == 'Warning':
        this.buttonGroup = this.buttonGroup.filter(x => x.title == 'Close')
        break;
    }
  }

  close(): void {
    this.dialogRef.closeEvent.emit();
  }
}
