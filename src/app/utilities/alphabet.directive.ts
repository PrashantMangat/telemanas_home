import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
selector: 'input[alphaOnly]'
})
export class AlphaDirective {
private el: NgControl;
constructor(private ngControl: NgControl) {
this.el = ngControl;
}

@HostListener('input', ['$event.target.value'])
onInput(value: string) {
// Use NgControl patchValue to prevent the issue on validation
this.el.control.patchValue(value.replace(/[^a-zA-Z ]/g, ''));
}

}