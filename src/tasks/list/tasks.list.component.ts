import {Component, Input, OnInit} from "ng-metadata/core";

@Component({
	selector: 'gsc-tasks-list',
	template: require('./tasks.list.component.html')
})
export class TasksListComponent implements OnInit {

	@Input('gsTasks')
	public tasks: Array<gs.task.ITask>;

	public ngOnInit(): void {
		console.debug('TasksIndexComponent ngOnInit()');
	}
}