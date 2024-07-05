import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: 'button.component.html',
    styleUrl: 'button.component.scss'
})

export class ButtonSharedComponent implements OnInit {

    /* 
        REF : https://6195b518b76f57003aa69b4c-xwhqqwoisy.chromatic.com/?path=/story/buttons-button--default
    */
    @Input() size: string = 'medium'; //small, medium, large
    @Input() shape: string = 'pill'; //pill, brick
    @Input() weight: string = 'solid'; //inline,solid,outlined
    @Input() color: string = 'primary'; //primary, success, warning, danger
    @Input() type: string = 'button'; //button, submit
    @Input() loading: boolean = false;
    @Input() disabled: boolean = false;
    @Output() action = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() { }

    actionButton(){
        if(!this.disabled) this.action.emit();
    }
}