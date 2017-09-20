import * as angularUiRouter from '@uirouter/angularjs';

import {bundle, NgModule} from "ng-metadata/core";
import {AppComponent} from "./app.component";
// import {AppConfig} from "./app.config";

@NgModule({
	imports: [

	],
	providers: [
		// AppConfig
	],
	declarations: [
		AppComponent
	]
})
class AppModule{}

export const AppNg1Module: string = bundle(AppModule, [angularUiRouter.default]).name;