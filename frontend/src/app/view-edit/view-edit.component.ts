import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { RestApiService } from '../services/rest-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { DiscardComponent } from '../dialogs/discard/discard.component';
import { DataTableItems } from '../models/dataTableItems.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit {

  public id: number;
  public data: DataTableItems;
  public editMode: boolean;
  public form: FormGroup;
  public saveForm: boolean = false;
  public formStatus: string;
  public newFormData: {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: RestApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    // Get record id from url
    this.route.params.subscribe(res => {
      this.id = res.id;
    });

    // Get record details from database
    this.apiService.getRecordDetails(this.id).subscribe({
      next: (response: DataTableItems) => {
        this.data = response[0];
        this.buildForm(this.data);
      },
      error: (errorResponse: DataTableItems) => {
        console.log('error - get record details', errorResponse)
      }
    })
  }

  // VIEW/EDIT FORM IMPLEMENTATION
  
  buildForm(data) {
    let formValues = {
      'title': [data.title, [Validators.required]],
      'description': [data.description]
    }

    this.form = this.formBuilder.group(formValues);

    this.form.get('title').disable();
    this.form.get('description').disable();

    // Detect form data changes
    this.form.valueChanges.subscribe(newData => {
      if (newData.title != this.data.title || newData.description != this.data.description) {
        this.saveForm = true;
        this.newFormData = { title: newData.title, description: newData.description };
      }
      else {
        this.saveForm = false;
      }

      // Check validation errors (empty title)
      this.formStatus = this.form.status;
      if(this.formStatus != 'VALID') {
        this.saveForm = false;
      }
    });
  }

  // SAVE FORM DATA

  saveFormData(savedFrom) {
      // Update existing record in database and return to view mode
      this.apiService.updateFormData(this.id, this.newFormData['title'], this.newFormData['description']).subscribe({
        next: (response: any) => {
          console.log('Update form response  --- ', response);

          // Form saved on 'Save button' in edit mode
          if(savedFrom == 'save-from-button') {
            this.redirectTo('/details/' + this.id);
          }

          // Form saved on 'Save button' from discard confirm dialog
          if(savedFrom == 'save-from-dialog') {
            this.router.navigate(['']);
          }

          this.snackBarMsg('Data saved!');
        },
        error: (errorResponse: any) => {
          console.log('Update form error!', errorResponse);
        }
      })
  }

  // UPDATE STATUS (checkbox)

  updateStatus(id, event) {
    this.apiService.updateStatus(id, event.checked).subscribe({
      next: (response: any) => {
        console.log('Update status response  --- ', response);
        this.snackBarMsg('Status changed!')
      },
      error: (errorResponse: any) => {
        console.log('Update status error!', errorResponse);
      }
    })
  }

  // DELETE RECORD

  deleteRecord(id) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '500px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(response => {

      if (response) {
        // Delete record from database
        this.apiService.deleteRecord(id).subscribe({
          next: (response: any) => {
            console.log('Delete record response  --- ', response);
            if (response.count == 1) {
              this.snackBarMsg('Record deleted!');
              this.router.navigate(['']);
            }
          },
          error: (errorResponse: any) => {
            console.log('Delete record error!', errorResponse);
          }
        })
      }
    });
  }

  // ENABLE/DISABLE FORM EDIT MODE WITH SLIDER

  isEditMode(event) {
    this.editMode = event.checked;
    if (this.editMode == false) {
      this.form.get('title').disable();
      this.form.get('description').disable();
    }
    else {
      this.form.get('title').enable();
      this.form.get('description').enable();
    }
  }

  // BACK ACTION

  backAction() {
    // Form changes detected. Show confirmation dialog
    if(this.saveForm) {
      this.discardConfirmationDialog();
    }
    // No change detect. Go back to home page.
    else {
      this.router.navigate(['']);
    }
  }

  // DISCARD - CONFIRMATION DIALOG

  discardConfirmationDialog() {
    const dialogRef = this.dialog.open(DiscardComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(response => {
      // Save changes
      if(response) {
        this.saveFormData('save-from-dialog')
      }
      // Discard changes
      else {
        this.router.navigate(['']);
      }
    });
  }

  // REDIRECT TO THE SAME ROUTE

  redirectTo(url) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([url]));
  }

  // FLASH MESSAGES - SNACBAR
  // ToDo: Separate this as global service
  
  snackBarMsg(msg) {
    this.snackBar.open(msg, null, {
      duration: 3000,
    });
  }

}
