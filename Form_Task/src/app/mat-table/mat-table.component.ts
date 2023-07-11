import { Component } from '@angular/core';
import { formData } from '../type';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css']
})
export class MatTableComponent {
  datas:formData[] = [{
    Name: 'Jeeva',
    Experience: '2',
    DOB: 'jun1',
    Age: '2',
    Gender: 'M',
    CollegeName: 'Jospe',
    Degree: 'B.E',
    CompanyName: 'NW',
    DOJ: 'may 8'
  
  }]
  displayedColumns: string[] = [
    // 'ID',
    'Name',
    'College Name',
    'Degree',
    'DOB',
    'Age',
    'Gender',
    'Company Name',
    'DOJ',
    'Experience'
    // 'Action',
  ];
  dataSource = this.datas;
}
