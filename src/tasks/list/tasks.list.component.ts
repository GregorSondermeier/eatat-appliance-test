import {Component, Input, OnChanges, OnInit} from "ng-metadata/core";

@Component({
	selector: 'gsc-tasks-list',
	template: require('./tasks.list.component.html')
})
export class TasksListComponent implements OnInit {

	@Input('gsTasks')
	public tasks: Array<gs.task.ITask>;

	@Input('gsContacts')
	public contacts: Array<gs.contact.IContact>;

	public ngOnInit(): void {
		console.debug('TasksIndexComponent ngOnInit()');
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