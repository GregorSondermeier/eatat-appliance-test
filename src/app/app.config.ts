export function AppConfig($urlRouterProvider: ng.ui.IUrlRouterProvider) {'ngInject';

	$urlRouterProvider.otherwise('/tasks');
}