import { Component, OnInit } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Store } from '@ngrx/store';
import { appLoaded } from 'src/app/global/state/country';

@Component({
	selector: 'app-authentication',
	templateUrl: './authentication.component.html',
	styleUrls: ['./authentication.component.scss'],
	providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
})
export class AuthenticationComponent implements OnInit {
	currentURL: any;

	location: Location;
	constructor(location: Location, private store: Store) {
		this.location = location;
	}

	ngOnInit(): void {
		this.store.dispatch(appLoaded());
		const pathMappings : any = {
			'home': 'home',
			'signin': 'signin',
			'signup': 'signup',
			'forgot-password': 'forgot-password'
		};
	
		const currentPath = this.location.path();
		this.currentURL = pathMappings[currentPath] || 'reset-password';
	}
}
