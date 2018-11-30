import { Component, OnInit, forwardRef, Input, ViewChild, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgForm } from '@angular/forms';
import { RecipeStep } from '../models/recipe.model';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipie-step',
  templateUrl: './recipie-step.component.html',
  styleUrls: ['./recipie-step.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RecipieStepComponent),
    }
  ]
})

export class RecipieStepComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() stepDeleted: Subject<RecipeStep>;
  @ViewChild('f') stepForm: NgForm;
  faTimes = faTimes;
  recipestep: RecipeStep;
  onChange: (_: any) => {};
  onTouch: () => {};
  formChangeSubscription: Subscription;

  constructor() { }

  writeValue(value: RecipeStep): void {
    this.recipestep = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  ngOnInit() {
    this.formChangeSubscription = this.stepForm.valueChanges.subscribe(
      (val) => {
        if (val['title']) { this.recipestep.StepTitle = val['title']; }
        if (val['instructions']) { this.recipestep.StepInstructions = val['instructions']; }
        if (val['hours']) { this.recipestep.TimeSpanHours = val['hours']; }
        if (val['minutes']) { this.recipestep.TimeSpanMinutes = val['minutes']; }
      }
    );
  }

  ngOnDestroy(): void {
   this.formChangeSubscription.unsubscribe();
  }

  onRemove() {
    this.stepDeleted.next(this.recipestep);
  }

}
