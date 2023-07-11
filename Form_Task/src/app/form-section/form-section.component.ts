//*************************************** Jeeva 03-07-2023 Created form component ts file*******************************

import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formData } from '.././type';

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { debounceTime } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.css'],
})
export class FormSectionComponent {
  formValues: formData = {} as formData;
  master: formData[] = [];
  ageVal = '';
  date = '';
  expVal = '';
  percent: number = 0;

  isEditClicked: boolean = false;
  updatedAh: boolean = false;

  i: number = 0;
  deg: string[] = ['', 'B.E', 'B.Tech'];
  submitCount: number = 0;

  @Output() public arrayEmitter = new EventEmitter();
  // @Output() public countEmitter = new EventEmitter();

  curdt: string | number;
  curMn: string | number;
  currYr: number = new Date().getFullYear();
  currMn: number = new Date().getMonth() + 1;
  currdt: number = new Date().getDate();

  minDateJoin: string = '';
  maxDateJoin: string = '';

  minDateBirth: string = '';
  maxDateBirth: string = '';
v:any ='';
universityList:string[] = ['',];
  url: string = 'http://universities.hipolabs.com/search?country=india';
  // isSubmitted : boolean = this.master.length==0? false: true;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.curdt = this.currdt < 9 ? '0' + this.currdt : this.currdt;
    this.curMn = this.currMn < 9 ? '0' + this.currMn : this.currMn;
    console.log(this.curdt);

    this.minDateJoin = `${this.currYr - 18}-${this.curMn}-${this.curdt}`;
    this.maxDateJoin = `${this.currYr}-${this.curMn}-${this.curdt}`;

    this.maxDateBirth = `${this.currYr - 18}-${this.curMn}-${this.curdt}`;

    console.log(this.http.get(this.url).forEach((data)=>{
      this.v = data;
      for(let i=0;i<this.v.length;i++){
        console.log(this.v[i].name);
        this.universityList.push(this.v[i].name)
      }
     
    }));
  }

  //Used form builder to get data
  registrationForm = this.fb.group({
    Name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
        Validators.pattern('[a-zA-Z.]*'),
      ],
    ],
    DOB: ['', Validators.required],
    Age: ['', Validators.required],
    Gender: ['', Validators.required],
    CollegeName: [
      '',
      [
        Validators.required,
      ],
    ],
    Degree: ['', Validators.required],
    CompanyName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
        Validators.pattern('[a-zA-Z. ]*'),
      ],
    ],
    DOJ: ['', Validators.required],
    Experience: [' ', Validators.required],
  });

  //Function for progress bar
  countBar: number = 0;
  progressBar() {
    this.countBar++;
    console.log(this.countBar);

    this.registrationForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => this.onFormChanged(this.registrationForm));
  }

  onFormChanged(form: FormGroup): void {
    console.log(this.countBar);

    if (this.countBar === 1) {
      this.percent += 11.11;
    }
    this.countBar = 0;
  }
  //  .forEach((changedValue)=>{
  //   this.percent +=11.111;
  // })
  // console.log(this.percent);

  //Submit function
  onSubmit() {
    this.formValues = this.registrationForm.value as formData;
    this.master.push(this.formValues);
    console.log(this.formValues);
    console.log(this.master);
    this.submitCount++;
    this.refresh();
  }

  //Refresh function
  refresh() {
    this.registrationForm.reset();
    // this.registrationForm.setValue({
    //   Name: null,
    //   DOB: null,
    //   Age: null,
    //   Gender: null,
    //   CollegeName: null,
    //   Degree: null,
    //   CompanyName: null,
    //   DOJ: null,
    //   Experience: null,
    // });

    // this.registrationForm.markAsPristine();d
  }

  //Edit function
  edit(index: number) {
    this.i = index;
    this.isEditClicked = true;
    this.registrationForm.setValue({
      Name: this.master[index].Name,
      DOB: this.master[index].DOB,
      Age: this.master[index].Age,
      Gender: this.master[index].Gender,
      CollegeName: this.master[index].CollegeName,
      Degree: this.master[index].Degree,
      CompanyName: this.master[index].CompanyName,
      DOJ: this.master[index].DOJ,
      Experience: this.master[index].Experience,
    });
  }

  //Update function
  update() {
    this.isEditClicked = false;
    this.updatedAh = true;
    this.master[this.i] = this.registrationForm.value as formData;
    this.refresh();
  }

  //Calculate Age
  agecal(dateBirth: Date) {
    this.ageVal = (
      new Date().getFullYear() - new Date(dateBirth).getFullYear()
    ).toString();
    this.registrationForm.patchValue({
      Age: this.ageVal,
    });
  }

  //Calculate EXP
  expcal(dateExp: Date) {
    this.expVal = (
      new Date().getFullYear() - new Date(dateExp).getFullYear()
    ).toString();

    this.registrationForm.patchValue({
      Experience: this.expVal,
    });
  }
}
