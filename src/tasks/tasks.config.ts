export function TasksConfig($stateProvider: ng.ui.IStateProvider) {'ngInject';
	$stateProvider
		.state({
			name: 'tasks',
			url: '/tasks',
			component: 'gscTasks',
			redirectTo: 'tasks.index'
		})
		.state({
			name: 'tasks.index',
			url: '/index',
			component: 'gscTasksIndex'
		});
}