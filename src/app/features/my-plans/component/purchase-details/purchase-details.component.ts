import { Component, ViewContainerRef } from '@angular/core';
import { ConfigService, DialogComponent } from 'src/app/global/service';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.scss']
})
export class PurchaseDetailsComponent {

  dialogRef: any;
  planDetails: any;
  parentElement: any;
  configData: any;

  constructor( private viewContainer: ViewContainerRef, private configService : ConfigService) {
    const _injector = this.viewContainer.injector;
    this.dialogRef = _injector.get<DialogComponent>(DialogComponent);

    configService.getLocalConfig().subscribe((configData : any) => {
      this.configData = configData;
    });
  }
  close(){
    this.dialogRef.closeEvent.emit();
  }

  handleEvent(event : any){
    this.dialogRef.closeEvent.emit(event);
  }
}
