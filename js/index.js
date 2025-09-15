let name = document.getElementById('name');
let lastName = document.getElementById('lname');
let date = document.getElementById('date');
let myTable = document.getElementById('tbd');
let submitBtn = document.getElementById('submit');

let employees = [];
let mainIndex = -1;

const makeTable = ()=>  {
    myTable.innerHTML = employees.map((emp, i) => {
        return `
          <tr data-index="${i}">
            <td>${i + 1}</td>
            <td>${(emp.name)}</td>
            <td>${(emp.lastName)}</td>
            <td>${(emp.date)}</td>
            <td class="actions">
              <button class="edit"  onclick="editRow(${i})">Edit</button>
              <button class="edit delete" onclick="destroy(${i})">Delete</button>
            </td>
          </tr>
        `;
    }).join('');
}

const store = ()=>{
    if(mainIndex === -1){
        employees.push({name : name.value, lastName : lastName.value, date : date.value});
    }
    else{
        employees[mainIndex]= {name : name.value, lastName : lastName.value, date : date.value};
    }
    resetForm();
    makeTable();
    updated();
}
const resetForm = ()=>{
    name.value = '';
    lastName.value = '';
    date.value = '';
}
const editRow = (rowIndex) => {
    mainIndex = rowIndex;
    name.value = employees[rowIndex].name;
    lastName.value = employees[rowIndex].lastName;
    date.value = employees[rowIndex].date;

    submitBtn.textContent = 'Update';
    name.focus();
}
const updated = ()=>{
    mainIndex = -1;
    submitBtn.textContent = 'Save';
}
const destroy = (rowIndex)=>{
    if(!confirm('Are you sure you want to delete this row?')) return;
    employees.splice(rowIndex, 1);
    makeTable();
}
