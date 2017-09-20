import {Component, Inject, OnInit} from "ng-metadata/core";

@Component({
	selector: 'gsc-tasks-index',
	template: require('./tasks.index.component.html')
})
export class TasksIndexComponent implements OnInit {

	public tasks: Array<gs.task.ITask>;
	public contacts: Array<gs.contact.IContact>;

	constructor(
		@Inject('$http') private $http: ng.IHttpService
	) {}

	public ngOnInit(): void {
		console.debug('TasksIndexComponent ngOnInit()');
		this.$load();
	}

	public $load() {

		// load tasks
		this.$http({
			method: 'GET',
			url: './json/tasks.json'
		}).then((response: ng.IHttpResponse<Array<gs.task.ITask>>) => {
			this.tasks = response.data;
		});

		// load contacts
		this.$http({
			method: 'GET',
			url: './json/contacts.json'
		}).then((response: ng.IHttpResponse<Array<gs.contact.IContact>>) => {
			this.contacts = response.data;
		});
	}

}