import { AfterViewInit, Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource} from './data-table-datasource';
import { RestApiService } from '../services/rest-api.service';
import { DataTableItems } from '../models/dataTableItems.model'
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../dialogs/add/add.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DataTableItems>;
  dataSource: DataTableDataSource;
  public environment: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','title','description','completed','created'];
  changeDetectorRefs: any;

  
  constructor(
    private apiService: RestApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource = new DataTableDataSource(this.apiService);
  }

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
  
            // Refresh datatable ----
  
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
            this.paginator._changePageSize(this.paginator.pageSize); 
          },
          error: (errorResponse: any) => {
            console.log('Save data error!', errorResponse);
          }
        })
      }
      
    });
  }
  
  updateStatus(event, id) {
    console.log('CKBOX EVENT --- ', event);
    console.log('CKBOX ID  --- ', id);

    this.apiService.updateStatus(id, event.checked).subscribe({
      next: (response: any) => {
        console.log('Update status response  --- ', response);
      },
      error: (errorResponse: any) => {
        console.log('Update status error!', errorResponse);
      }
    })



  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
