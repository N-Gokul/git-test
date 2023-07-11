// ************************************19-June-2023 Jeeva Created main.js***********************************

// Global values
var username = document.getElementById("name");
var clg_name = document.getElementById("college_name");
var comp_name = document.getElementById("company_name");
var degree = document.getElementById("degree");
var birth = document.getElementById("DOB");
var joining = document.getElementById("DOJ");
var age_now = document.getElementById("age");
var exp_now = document.getElementById("experience");
var submit_btn = document.getElementById("submit")
var update_btn = document.getElementById("update");
// Icons values
var wrong = document.getElementById("wrong");
var valid = document.getElementById("valid");
var wrong_clg = document.getElementById("wrong_clg");
var valid_clg = document.getElementById("valid_clg");
var wrong_comp = document.getElementById("wrong_comp");
var valid_comp = document.getElementById("valid_comp");
var index;
var gender;
var table = document.getElementById("myTable");
let curren_age;
let exp;


//  Getting current Year, Month, Date
const cuurds = new Date();
const currentYear = new Date().getFullYear();
const curr_date = new Date().getDate();
const curr_month = new Date().getMonth();
console.log(cuurds);

// Setting max value in input type date
let min_yr = currentYear - 18;
birth.setAttribute("max", `${min_yr}-0${curr_month+1}-${curr_date}`);
joining.setAttribute("max", `${currentYear}-0${curr_month+1}-${curr_date}`);


// Arrow function to get value of Gender
const getRadioValue = () => {

    var radios = document.getElementsByName('radio_gender');
    console.log(radios);
    for (var radio of radios) {

        if (radio.checked) {
            gender = radio.value;
        }
    }
}


const changeIcons = (val_check_needed, wrong, valid) => {
    val_check_needed.style.border = null
    wrong.style.visibility = "hidden";
    valid.style.visibility = "hidden"
    wrong.style.color = null
}

//Arrow function to refresh the form
const refresh = () => {
    username.value = null;
    clg_name.value = null;
    comp_name.value = null;
    degree.value = null;
    document.getElementsByName('radio_gender')[0].checked = false;
    document.getElementsByName('radio_gender')[1].checked = false;
    birth.value = false;
    joining.value = false;
    age_now.value = null;
    exp_now.value = null;
    changeIcons(username, wrong, valid);
    changeIcons(clg_name, wrong_clg, valid_clg);
    changeIcons(comp_name, wrong_comp, valid_comp);

}


//Check for special character.
const checkValues = (val_check_needed, wrong, valid) => {

    var regex = /^[A-Za-z .']+$/

    //Validate TextBox value against the Regex.
    var isValid = regex.test(val_check_needed.value);
    if (!isValid) {
        val_check_needed.style.border = "2px solid tomato"
        wrong.style.visibility = "visible";
        valid.style.visibility = "hidden"
        wrong.style.color = "tomato"
    } else {
        val_check_needed.style.border = "2px solid green"
        wrong.style.visibility = "hidden";
        valid.style.visibility = "visible"
        valid.style.color = "green"
    }

}

//
function checkWorking(){
    alert("Working")
}

// Function to check if name has any special characters init. 
function checkName() {

    checkValues(username, wrong, valid)
}


// Function to check if College name has any special characters init.
function checkClg() {

    checkValues(clg_name, wrong_clg, valid_clg)
}


// Function to check if Company name has any special characters init.
function checkCmp() {

    checkValues(comp_name, wrong_comp, valid_comp)

}


// Function to check Date of Birth and calculate age.
function checkDOB() {
    let birth_year = new Date(document.getElementById("DOB").value).getFullYear();
    curren_age = currentYear - birth_year;
    age_now.value = curren_age;
}


// Function to check Date of Joining and calculate experience.
function checkDOJ() {
    let joining_date = new Date(document.getElementById("DOJ").value).getFullYear();
    exp = currentYear - joining_date;
    exp_now.value = exp;
}


// Function to validate on clicking the submit button
function validate() {
    alert("Validate");
    var arr = [];
    getRadioValue();
    let conditions = username.value.length < 5 || clg_name.value.length < 5 || comp_name.value.length < 5 || degree.value == "selected" || birth.value == "" || joining.value == "";

    let tbody = document.getElementById("tbody");


    //Arrow function to create edit and delete button
    const createEditDeleteButton = (td) => {
        let btn_edit = document.createElement("button");
        let btn_delete = document.createElement("button");
        btn_delete.setAttribute("id", "btn_delete");
        btn_edit.setAttribute("id", "btn_edit");
        btn_delete.setAttribute("class", "btn btn-danger")
        btn_edit.setAttribute("class", "btn btn-success")
        btn_edit.innerHTML = "EDIT";
        btn_delete.innerHTML = "Delete";
        btn_edit.setAttribute("onclick", "getRowIndex(this);")
        btn_edit.addEventListener("click", editButton);

        btn_delete.setAttribute("onclick", "remove(this);");
        btn_delete.style.marginRight = "4%"
        td.appendChild(btn_delete)
        td.appendChild(btn_edit);
    }


    //Arrow function to create table dynamically
    const createTable = () => {
        var tr = document.createElement("tr");
        for (let i = 0; i < arr.length; i++) {
            var td = document.createElement("td");

            td.innerHTML = arr[i];
            tr.appendChild(td);
        }
        var td = document.createElement("td");
        createEditDeleteButton(td);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }


    // Arrow function to edit the date inside the table
    const editButton = () => {
        submit_btn.hidden = true;
        update_btn.hidden = false;
        btn_delete.style.visibility = "hidden";
        update_btn.setAttribute("onclick", "update();");
        console.log(index);

        username.value = table.rows[index].cells[0].innerHTML;
        clg_name.value = table.rows[index].cells[1].innerHTML;
        degree.value = table.rows[index].cells[2].innerHTML;
        birth.value = table.rows[index].cells[3].innerHTML;
        curren_age= table.rows[index].cells[4].innerHTML;
        table.rows[index].cells[5].innerHTML = 'M' ? document.getElementsByName('radio_gender')[0].checked = true : document.getElementsByName('radio_gender')[1].checked = true;
        comp_name.value = table.rows[index].cells[6].innerHTML;
        joining.value = table.rows[index].cells[7].innerHTML;
        exp= table.rows[index].cells[8].innerHTML;

    }


    //If valid date is given then condition is false , else it is true
    if (conditions) {
        alert("Enter the missing data and make sure the values are greater than 5 in length")
    } else {
        arr.push(username.value)
        arr.push(clg_name.value)
        arr.push(degree.value)
        arr.push(birth.value)
        arr.push(curren_age)
        arr.push(gender)
        arr.push(comp_name.value)
        arr.push(joining.value)
        arr.push(exp)
        createTable();
        refresh();
    }
}


// function to select rowIndex
function getRowIndex(button) {
    var row = button.parentNode.parentNode;
    index = row.rowIndex;
}


// function to update the changed data
function update() {
    btn_delete.style.visibility = "visible";
    getRadioValue();
    console.log(index);
    let conditions = username.value.length < 5 || clg_name.value.length < 5 || comp_name.value.length < 5 || degree.value == "selected" || birth.value == "" || joining.value == "";
    if (conditions) {
        alert("Enter the missing data and make sure the values are greater than 5 in length")
    } else {
        var arr_2 = [];
        arr_2.push(username.value)
        arr_2.push(clg_name.value)
        arr_2.push(degree.value)
        arr_2.push(birth.value)
        arr_2.push(curren_age)
        arr_2.push(gender)
        arr_2.push(comp_name.value)
        arr_2.push(joining.value)
        arr_2.push(exp)
        for (let i = 0; i < arr_2.length; i++) {
            table.rows[index].cells[i].innerHTML = arr_2[i];
        }

    }
    alert("Value Update!!!")
    refresh();
    submit_btn.hidden = false;
    update_btn.hidden = true;
}


//Arrow function for removing the particular row
function remove(button) {

    var row = button.parentNode.parentNode;
    console.log(row);
    if (confirm("Do you want to delete")) {
        table.deleteRow(row.rowIndex);
    }
}