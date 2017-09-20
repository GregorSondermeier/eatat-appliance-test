import {Component, Inject, OnInit} from "ng-metadata/core";

@Component({
	selector: 'gsc-tasks-index',
	template: require('./tasks.index.component.html')
})
export class TasksIndexComponent implements OnInit {

	public tasks: Array<gs.task.ITask>;

	constructor(
		@Inject('$http') private $http: ng.IHttpService
	) {}

	public ngOnInit(): void {
		console.debug('TasksIndexComponent ngOnInit()');
		this.$search();
	}

	public $search() {
		this.$http({
			method: 'GET',
			url: './json/tasks.json'
		}).then((response: ng.IHttpResponse<Array<gs.task.ITask>>) => {
			this.tasks = response.data;
		})
	}

}