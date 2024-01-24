import { ApplicationRef, EnvironmentInjector, Injectable, createComponent } from '@angular/core';
import { DialogComponent } from './dialog.component';
import { Observable } from 'rxjs';
import { BrowserService } from '../../service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  isBrowser  = false;
  constructor(
    private envInjector: EnvironmentInjector,
    private applicationRef: ApplicationRef,
    private browserService : BrowserService) {
      browserService.getIsBrowser().subscribe(isBrowser => this.isBrowser = isBrowser);
    }

  openModal(templateRef: any, userConfig: any) : Observable<any>{
    if(!this.isBrowser){
      return new Observable();
    }
    // Create element
    const popup = document.createElement('popup-component');

    let className = 'main-container'
    if( document.getElementsByClassName("body-container") && document.getElementsByClassName("body-container")[0]) {
      className = 'body-container'
    }
    document.getElementsByClassName(className)[0].appendChild(popup);

    // Create the component and wire it up with the element

    const dialogComponentRef = createComponent(DialogComponent, {
      environmentInjector: this.envInjector,
      hostElement: popup
    })
    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(dialogComponentRef.hostView);

    // Listen to the close event
    dialogComponentRef.instance.closeEvent.subscribe(() => {
      document.body.removeChild(popup);
      this.applicationRef.detachView(dialogComponentRef.hostView);
    });

    // Set the message
    dialogComponentRef.instance.template = templateRef;
    dialogComponentRef.instance.context = userConfig.context;
    dialogComponentRef.instance.cssClass = userConfig.cssClass;

    // Add to the DOM
    document.body.appendChild(popup);
    return dialogComponentRef.instance.closeEvent;
  }
}
