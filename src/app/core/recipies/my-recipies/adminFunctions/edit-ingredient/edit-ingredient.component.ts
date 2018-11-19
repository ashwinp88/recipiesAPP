import { Component, OnInit, Input } from '@angular/core';
import { faSync, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/shared/data.service';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css']
})
export class EditIngredientComponent implements OnInit {
  faSync = faSync;
  faTimes = faTimes;
  @Input() ingredient: {ID: number, Description: string};

  resultType: string;
  result: string;
  showMessage = false;
  success; fail;


  constructor(private dataService: DataService) { }

  ngOnInit() {
    // console.log(this.ingredient);
  }

  onUpdate() {
    this.dataService.editIngredient(this.ingredient).subscribe(
      () => {
        this.resultType = 'success';
        this.result = 'successfully updated record.';
        this.showMessage = true;
        if (this.success != null) {
          clearTimeout(this.success);
        }
        this.success = setTimeout(this.resetMessage.bind(this), 1000 * 5);
      },
      () => {
        this.resultType = 'failure';
        this.result = 'somwthing went wrong.';
        this.showMessage = true;
        if (this.fail != null) {
          clearTimeout(this.fail);
        }
        this.fail = setTimeout(this.resetMessage.bind(this), 1000 * 5);
      }
    );
  }

  resetMessage() {
    this.result = '';
    this.resultType = '';
    this.showMessage = false;
  }

}
