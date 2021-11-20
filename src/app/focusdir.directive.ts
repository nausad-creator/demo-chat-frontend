import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
	selector: '[appFocusdir]'
})
export class FocusdirDirective {
	constructor(private el: ElementRef) { }
	@HostListener('submit')
	onFormSubmit() {
		const invalidInputControl = this.el.nativeElement.querySelector('.ng-invalid');
		if (invalidInputControl) {
			invalidInputControl.focus();
		}
	}
}
