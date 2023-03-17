import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
selector: 'input[numbersOnly]'
})
export class NumberDirective {
private el: NgControl;
constructor(private ngControl: NgControl) {
this.el = ngControl;
}

@HostListener('input', ['$event.target.value'])
onInput(value: string) {
// Use NgControl patchValue to prevent the issue on validation
this.el.control.patchValue(value.replace(/[^0-9]/g, ''));
}

}