import {Component, OnInit} from "ng-metadata/core";

@Component({
	selector: 'gsc-app',
	template: require('./app.component.html')
})
export class AppComponent implements OnInit {

	public ngOnInit(): void {
		console.debug('AppComponent ngOnInit()');
	}

}