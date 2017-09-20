import {NgModule} from "ng-metadata/core";
import {TasksComponent} from "./tasks.component";
import {TasksConfig} from "./tasks.config";
import {TasksIndexComponent} from "./index/tasks.index.component";
import {TasksListComponent} from "./list/tasks.list.component";

@NgModule({
	providers: [
		TasksConfig
	],
	declarations: [
		TasksComponent,
		TasksIndexComponent,
		TasksListComponent
	]
})
export class TasksModule {}