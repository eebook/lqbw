import { TranslateService } from '@ngx-translate/core';
import { OnInit, Component, Output, Input, EventEmitter } from '@angular/core';




import {ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

const COMMA = 188;

export interface Person {
  name: string;
}

export interface DemoColor {
  name: string;
  color: string;
}


@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  @Input() query = '';
  @Input() searching = false;
  @Input() error = '';
  @Output() search = new EventEmitter<string>();

  tabIndex = 0;
  visible = true;
  color = '';
  selectable = true;
  removable = true;
  addOnBlur = true;
  message = '';

  // Enter, comma, semi-colon
  separatorKeysCodes = [ENTER, COMMA, 186];

  selectedPeople = null;

  people: Person[] = [
    { name: 'Kara' },
  ];

  availableColors: DemoColor[] = [
    { name: 'none', color: '' },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' }
  ];
  selectedColors: any[] = ['Primary', 'Warn'];
  selectedColor = 'Accent';

  constructor(
    private _translate: TranslateService,
  ) {

  }

  ngOnInit() {

  }

  displayMessage(message: string): void {
    this.message = message;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our person
    if ((value || '').trim()) {
      this.people.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    console.log('this.people????', this.people);
    this.search.emit('eebook');
  }

  remove(person: Person): void {
    const index = this.people.indexOf(person);

    if (index >= 0) {
      this.people.splice(index, 1);
    }
  }

  removeColor(color: DemoColor) {
    let index = this.availableColors.indexOf(color);

    if (index >= 0) {
      this.availableColors.splice(index, 1);
    }

    index = this.selectedColors.indexOf(color.name);

    if (index >= 0) {
      this.selectedColors.splice(index, 1);
    }
  }

  toggleVisible(): void {
    this.visible = false;
  }

}
