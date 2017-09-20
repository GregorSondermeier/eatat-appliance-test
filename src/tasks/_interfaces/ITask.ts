namespace gs {
	export namespace task {
		export interface ITask {
			date: string,
			tasks: Array<{title: string, time: string, responsible: string}>
		}
	}
}