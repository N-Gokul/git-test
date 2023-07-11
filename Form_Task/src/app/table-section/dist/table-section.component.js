"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TableSectionComponent = void 0;
//***********************************************Jeeva 03-07-2023  Create tableSection ts file*********************************/
var drag_drop_1 = require("@angular/cdk/drag-drop");
var core_1 = require("@angular/core");
var alasql = require("alasql");
var TableSectionComponent = /** @class */ (function () {
    function TableSectionComponent() {
        this.searchTerm = '';
        this.uploadedDataLenght = 0;
        this.uploadedSearchTerm = '';
        this.uploadedData = [];
        this.parentData = [];
        this.isUpdated = false;
        this.eventEmitter = new core_1.EventEmitter();
        this.isEditClicked = true;
        this.displayedColumns = [
            'ID',
            'Name',
            'CollegeName',
            'Degree',
            'DOB',
            'Age',
            'Gender',
            'CompanyName',
            'DOJ',
            'Experience',
            'Action',
        ];
        console.log(this.parentData);
    }
    TableSectionComponent.prototype.editButton = function (index) {
        // this.isUpdated= false;
        this.isEditClicked = false;
        console.log(index);
        this.eventEmitter.emit(index);
    };
    TableSectionComponent.prototype.updatedEditButton = function (index) {
        console.log(index);
    };
    TableSectionComponent.prototype.updatedDeleteButton = function (index) {
        this.uploadedData.splice(index, 1);
    };
    TableSectionComponent.prototype.deleteButton = function (i) {
        console.log(i);
        this.parentData.splice(i, 1);
    };
    TableSectionComponent.prototype.exportExcel = function () {
        alasql('SELECT Name,CollegeName,Degree,DOB,Age,Gender,CompanyName,DOJ,Experience INTO XLSX("FormData.xlsx",{headers:true}) FROM HTML("#table_Data",{headers:true})');
    };
    TableSectionComponent.prototype.onDrop = function (event) {
        drag_drop_1.moveItemInArray(this.parentData, event.previousIndex, event.currentIndex);
    };
    TableSectionComponent.prototype.uploaded = function (event) {
        var _this = this;
        console.log(event);
        alasql.promise('SELECT * FROM XLSX(?)', [event]).then(function (data) {
            console.log(data);
            _this.uploadedDataLenght++;
            _this.uploadedData = data;
        });
    };
    __decorate([
        core_1.Input()
    ], TableSectionComponent.prototype, "parentData");
    __decorate([
        core_1.Input()
    ], TableSectionComponent.prototype, "isUpdated");
    __decorate([
        core_1.Output()
    ], TableSectionComponent.prototype, "eventEmitter");
    TableSectionComponent = __decorate([
        core_1.Component({
            selector: 'app-table-section',
            templateUrl: './table-section.component.html',
            styleUrls: ['./table-section.component.css']
        })
    ], TableSectionComponent);
    return TableSectionComponent;
}());
exports.TableSectionComponent = TableSectionComponent;
