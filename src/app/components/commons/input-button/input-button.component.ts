import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Scope } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-input-button',
  templateUrl: './input-button.component.html',
  styleUrls: ['./input-button.component.less']
})
export class InputButtonComponent implements OnInit {
  @Input() style?:string = 'primary';
  @Input() svg?:string = 'config';
  @Input() scope?:Scope = null;
  @Input() label?:string = '';
  @Input() for_id?:string = '';

  @Output() onChange = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  async onFileSelected(event: any) {
    console.log('onFileSelected');
    const file: any = event.target.files[0];
    console.log(file.name, this.scope.id, this.scope);
     if (file) {
     // this.logger.log('need processing the file: ' + file.name)
      this.onChange.emit(file)
    }
    /*if (this.csv.trim() !== '') {
      let tempArray = this.csv.split('\n');
      let csvHeader = tempArray.shift();
      if(!this.checkCsvFormat(csvHeader)){
        console.warn('Please check the csv format');
        return;
      }
      let redToBeProcessed = tempArray.filter(notEmpty);
      const rtLength = redToBeProcessed.length;
      for (let ll = 0; ll < rtLength; ll++) {
        const line = redToBeProcessed[ll];
        let l = line.split(';');

        this.rulesToBeProcess.push({
          id:l[0],
          scope_id:l[1],
          redirect_type_id:l[2],
          origin:l[3],
          target:l[4]
        })
      }
      this.rulesNotToBeProcess = new Set();
    } */
  }
}
