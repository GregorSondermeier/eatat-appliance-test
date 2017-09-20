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

	public deleteResponsible(event: {dayIdx: number, taskIdx: number}): void {
		console.debug('TasksIndexComponent.deleteResponsible(event)', event);

		let d: number = event.dayIdx,
			t: number = event.taskIdx;

		for (d; d < this.tasks.length; d++) {
			if (this.tasks[d].tasks.length) {
				for (t; t < this.tasks[d].tasks.length; t++) {
					if (t >= event.taskIdx) {
						this.tasks[d].tasks[t].responsible = this.getNextTaskResponsible(d, t);
					}
				}
			}
			t = 0;
		}

		console.debug('DONE');
	}

	private getNextTaskResponsible(d: number, t: number): string {
		console.debug(d, t);
		if (this.tasks[d]) {
			if (this.tasks[d].tasks[t+1]) {
				return this.tasks[d].tasks[t+1].responsible;
			} else {
				return this.getNextTaskResponsible(d+1, -1);
			}
		} else {
			return null;
		}
	}

}