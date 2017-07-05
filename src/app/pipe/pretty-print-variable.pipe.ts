import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'prettyPrintVariable'
})
export class PrettyPrintVariablePipe implements PipeTransform {

    public transform(value: any, args?: any): any {
        return value.split('_').join(' ');
    }

}
