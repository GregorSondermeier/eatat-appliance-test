import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from "ng-metadata/core";

@Component({
	selector: 'gsc-tasks-list',
	template: require('./tasks.list.component.html')
})
export class TasksListComponent implements OnInit {

	@Input('gsTasks')
	public tasks: Array<gs.task.ITask>;

	@Input('gsContacts')
	public contacts: Array<gs.contact.IContact>;

	@Output('gsDeleteResponsibleFn')
	public deleteResponsibleFn: EventEmitter<{dayIdx: number, taskIdx: number}> = new EventEmitter<{dayIdx: number, taskIdx: number}>();

	public ngOnInit(): void {
		console.debug('TasksListComponent ngOnInit()');
	}

	public getContact(id: string): string {
		let contactString: string = '';
		if (this.contacts) {
			let contact: gs.contact.IContact = this.contacts.find((c) => c._id == id);
			if (contact) {
				contactString = `${contact.firstName} ${contact.lastName}`;
			}
		}
		return contactString;
	}
}