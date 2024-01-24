import { Injectable } from '@angular/core';
import { DialogService } from '../component/dialog/dialog.service';
import { AlertComponent } from '../dialog/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private dialogService : DialogService
  ) { }

  error(message: string, statusCode?: number, isSubscribe = true){
    let customTitle: string;

    if(statusCode && statusCode == 401) {
      customTitle = 'Info'
    }
    else if(statusCode && statusCode == 500) {
      customTitle = 'Warning'
    } 
    else {
      customTitle = 'Error'
    }

    const observableService : any = this.dialogService.openModal(AlertComponent, { cssClass: 'modal-sm', context: { title: customTitle, body: message} })
    return isSubscribe ? observableService.subscribe(()=>{}) : observableService;
  }

  success(message: string, type?: string, title?: string){
    return this.dialogService.openModal(AlertComponent, { cssClass: 'modal-sm', context: { title: title || 'Successful!', body: message, type: type} })
  }
}
