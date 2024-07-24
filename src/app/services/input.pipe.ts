import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'regex'
})
export class RegexPipe implements PipeTransform {
    /* AMR: How to use
    in html file : 
        <input (keypress)="onChangeInput($event, 'numeric')">
    in ts file:
        onChangeInput(input: any, type: string) {
            const result: boolean = this.regexPipe.transform(input, type);
            if(!result) input.preventDefault();
            return result;
        }
    */

    transform(value: any, type: string): boolean {
        var inp = String.fromCharCode(value.keyCode);
        let temp_regex = type == 'alphanumeric' ? /[a-zA-Z0-9]/ : type == 'numeric' ? /[0-9]/ : /[a-zA-Z.() ,\-]/;
        if (temp_regex.test(inp)) return true;
        else {
            return false;
        }
    }

}
