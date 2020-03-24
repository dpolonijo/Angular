import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource} from './data-table-datasource';
import { RestApiService } from '../services/rest-api.service';
import { DataTableItems } from '../models/dataTableItems.model'
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../dialogs/add/add.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  styles: [
    `/deep/ .mat-sort-header-button {text-shadow: 1px 1px #fff}`
  ]
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DataTableItems>;
  dataSource: DataTableDataSource;
  public environment: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','title','description','completed','created','view','delete'];
  
  constructor(
    private apiService: RestApiService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.apiService); 
  }

  // INSERT NEW RECORD

  addNew() {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {

      // Save data from dialog to database
      
      if(result){
        this.apiService.insertData(result.value).subscribe({
          next: (response: any) => {
            response.created = new Date().toLocaleString();
            console.log('Save data response ... ', response);
  
            // Refresh datatable - append row to client side
              // ToDo: blink animation
  
            //this.dataSource.data.push(response);
            //this.ngOnInit();
            //this.apiService.getData();
            //this.dataSource = new DataTableDataSource(this.apiService);
            //this.dataSource.connect();
            //this.dataSource.data = response;
            //this.changeDetectorRefs.detectChanges();
            //this.dataSource.paginator = this.paginator;
  
            // Workaround but it works!
            this.dataSource.data.unshift(response);
            this.refreshGrid();
            
            this.snackBarMsg('Saved successfully!');
          },
          error: (errorResponse: any) => {
            console.log('Save data error!', errorResponse);
          }
        })
      }
      
    });
  }

  // UPDATE STATUS
  
  updateStatus(event, id) {
    console.log('CKBOX EVENT --- ', event);
    console.log('CKBOX ID  --- ', id);

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
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(response => {

      if(response) {
        // Delete record from database
        this.apiService.deleteRecord(id).subscribe({
          next: (response: any) => {
            console.log('Delete record response  --- ', response);
            if(response.count == 1) {
             
              // Remove row from table on the client side
              const rowIndex = this.dataSource.data.findIndex(x => x.id === id);
              this.dataSource.data.splice(rowIndex, 1);
              this.refreshGrid();
              this.snackBarMsg('Record deleted!')
            }
          },
          error: (errorResponse: any) => {
            console.log('Delete record error!', errorResponse);
          }
        })
      }
    });
  }

  refreshGrid() {
    this.paginator._changePageSize(this.paginator.pageSize); 
  }

  // ToDo: Separate this as global service
  snackBarMsg(msg) {
    this.snackBar.open(msg, null, {
      duration: 3000,
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
