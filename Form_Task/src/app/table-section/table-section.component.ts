//***********************************************Jeeva 03-07-2023  Create tableSection ts file*********************************/
import {  CdkDragStart,  moveItemInArray,  CdkDropList,  CdkDragDrop}from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as alasql from 'alasql';
import { formData } from '../type';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state,style,animate,transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-table-section',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '300px',
        opacity: 1,
        // backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '0px',
        opacity: 0,
        // backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
    ]),
  ],
  templateUrl: './table-section.component.html',
  styleUrls: ['./table-section.component.css'],
})
export class TableSectionComponent {
  // diaplay_table:boolean=false;
  searchTerm: string = '';
  uploadedDataLenght: number = 0;
  uploadedSearchTerm: string = '';

  uploadedData: formData[] = [];

  @Input() public parentData: formData[] = [];
  @Input() public count: number = 0;
  @Input() public isUpdated: boolean = false;
  @Output() public eventEmitter = new EventEmitter();

  isEditClicked: boolean = true;
  dataSource: any = [];
  isHidden: boolean = false;

  // displayedColumns: string[] = [
  //   'ID',
  //   'Name',
  //   'College Name',
  //   'Degree',
  //   'DOB',
  //   'Age',
  //   'Gender',
  //   'Company Name',
  //   'DOJ',
  //   'Experience',
  //   'Action',
  // ];
  datas: formData[] = [
    {
      // ID : '0',
      Name: 'Jeeva',
      Experience: '2',
      DOB: 'jun1',
      Age: '2',
      Gender: 'M',
      CollegeName: 'Jospe',
      Degree: 'B.E',
      CompanyName: 'NW',
      DOJ: 'may 8',
    },
  ];
  isOpen = false;
  insertData() {
    this.isHidden = true;
    this.isOpen = !this.isOpen;

    // this.dataSource = this.parentData;
    // this.dataSource = this.datas;
    this.dataSource = new MatTableDataSource(this.parentData);
    console.log(this.parentData);
    console.log(this.dataSource);
  }
  constructor() {
    if (this.count > 0) {
    }
  }
  remove() {
    this.isHidden = false;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  columns: any[] = [
    // { field: 'ID' },
    { field: 'Name' },
    { field: 'College Name' },
    { field: 'Degree' },
    { field: 'DOB' },
    { field: 'Age' },
    { field: 'Gender' },
    { field: 'Company Name' },
    { field: 'DegDOJree' },
    { field: 'Experience' },
    // { field: 'Action' }
  ];
  displayedColumns: string[] = [
    'ID',
    'Name',
    'College Name',
    'Degree',
    'DOB',
    'Age',
    'Gender',
    'Company Name',
    'DOJ',
    'Experience',
    'Action',
  ];
  drop1(event1: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedColumns,
      event1.previousIndex,
      event1.currentIndex
    );
  }
  // dragStarted(event: CdkDragStart, index: number) {
  //   this.previousIndex = index;
  // }
  // dropListDropped(event: any, index: number) {
  //   if (event) {
  //     moveItemInArray(this.columns, this.previousIndex, index);
  //     this.setDisplayedColumns();
  //   }
  // }

  // setDisplayedColumns() {
  //   this.columns.forEach((colunm, index) => {
  //     colunm.index = index;
  //     this.displayedColumns[index] = colunm.field;
  //   });
  //   console.log(this.displayedColumns);
  // }

  editButton(index: number) {
    // this.isUpdated= false;
    this.isEditClicked = false;
    console.log(index);
    console.log(index);

    this.eventEmitter.emit(index);
  }
  updatedEditButton(index: number) {
    console.log(index);
  }
  updatedDeleteButton(index: number) {
    this.uploadedData.splice(index, 1);
  }
  deleteButton(i: number) {
    console.log(i);

    this.parentData.splice(i, 1);
  }

  exportExcel(): void {
    alasql(
      'SELECT Name,[College Name],Degree,DOB,Age,Gender,[Company Name],DOJ,Experience \
      INTO XLSX("FormData.xlsx",{headers:true}) FROM HTML("#table_Data",{headers:true})'
    );
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.parentData, event.previousIndex, event.currentIndex);
  }

  uploaded(event: any) {
    console.log(event);
    alasql.promise('SELECT * FROM XLSX(?)', [event]).then((data: []) => {
      console.log(data);
      this.uploadedDataLenght++;
      this.uploadedData = data;
    });
  }
}
