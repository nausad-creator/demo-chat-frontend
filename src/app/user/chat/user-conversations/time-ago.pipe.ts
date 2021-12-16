import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
const current = new Date();
@Pipe({
	name: 'customTimeAgo'
})
export class CustomTimeAgoPipe implements PipeTransform {
	constructor(private datepipe: DatePipe) { }
	transform(inputDate: Date) {
		if (!inputDate || (!inputDate.getTime && !inputDate.toDateString)) {
			return 'Invalid date';
		}
		if (inputDate.getDate() === current.getDate() && inputDate.getMonth() === current.getMonth() && inputDate.getFullYear() === current.getFullYear()) {
			return 'Today';
		}
		if (inputDate.getDate() === (current.getDate() - 1) && inputDate.getMonth() === current.getMonth() && inputDate.getFullYear() === current.getFullYear()) {
			return 'Yesterday';
		}
		if (inputDate.getDate() === (current.getDate() - 2) && inputDate.getMonth() === current.getMonth() && inputDate.getFullYear() === current.getFullYear()) {
			return this.datepipe.transform(inputDate, 'EEEE');
		}
		if (inputDate.getDate() === (current.getDate() - 3) && inputDate.getMonth() === current.getMonth() && inputDate.getFullYear() === current.getFullYear()) {
			return this.datepipe.transform(inputDate, 'EEEE');
		}
		if (inputDate.getDate() === (current.getDate() - 4) && inputDate.getMonth() === current.getMonth() && inputDate.getFullYear() === current.getFullYear()) {
			return this.datepipe.transform(inputDate, 'EEEE');
		}
		if (inputDate.getDate() === (current.getDate() - 5) && inputDate.getMonth() === current.getMonth() && inputDate.getFullYear() === current.getFullYear()) {
			return this.datepipe.transform(inputDate, 'EEEE');
		}
		return this.datepipe.transform(inputDate, 'EEE, d MMM, y');
	}
}

