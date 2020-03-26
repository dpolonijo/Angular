import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataTableItems } from '../../models/dataTableItems.model'
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent {

  public form: FormGroup;

  constructor(
    private fromBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataTableItems) {
      this.buildForm();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildForm() {
    let formValues = {
      'title': [this.data.title, [Validators.required]],
      'description': [this.data.description],
    }

    this.form = this.fromBuilder.group(formValues);
  }

  validateForm() {

    this.markFormGroupTouched(this.form);

    if (this.form.valid) {
      this.dialogRef.close(this.form);
    }
    else {
      return false;
    }
  }

  // Show validation error on click 'ok' button, without touch of form inputs
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  
}
