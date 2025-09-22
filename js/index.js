let name = document.getElementById('name');
let lastName = document.getElementById('lName');
let date = document.getElementById('date');
let myTable = document.getElementById('tbd');
let submitBtn = document.getElementById('submit');
let searchBtn = document.getElementById('search');

let id = 0;
let employees = JSON.parse(localStorage.getItem('myList')?? "[]");
const makeTable = (myList = employees)=>  {
    myTable.innerHTML = myList.map((emp, i) => {
        return  `
          <tr data-index="${i}">
            <td>${i + 1}</td>
            <td>${(emp.name)}</td>
            <td>${(emp.lastName)}</td>
            <td>${(emp.date)}</td>
            <td class="actions">
              <button class="edit"  onclick="editRow(${emp.id})">Edit</button>
              <button class="edit delete" onclick="destroy(${emp.id})">Delete</button>
            </td>
          </tr>
        `;
    }).join('');

}
makeTable();

const store = ()=>{
    if(submitBtn.textContent === 'Save'){
        id = new Date().getTime();
        employees.push({name : name.value, lastName : lastName.value, date : date.value, id});
    }
    else{
        let index = employees.findIndex((e) => e.id === id);
        employees[index]= {name : name.value, lastName : lastName.value, date : date.value};
    }
    localStorage.setItem("myList", JSON.stringify(employees))
    resetForm();
    makeTable();
}
const resetForm = ()=>{
    name.value = '';
    lastName.value = '';
    date.value = '';
    submitBtn.textContent = 'Save';
}
const editRow = (row_id) => {
    let element = employees.find((e) => e.id === row_id);
    name.value = element.name;
    lastName.value = element.lastName;
    date.value = element.date;

    submitBtn.textContent = 'Update';
    name.focus();
}

const destroy = (row_id)=> {
    if (confirm('Are you sure you want to delete this row?')) {
        let index = employees.findIndex((e) => e.id === id);
        employees.splice(index, 1);
        localStorage.setItem("myList", JSON.stringify(employees));
        makeTable();
    }
}

searchBtn.addEventListener('input', () => {
    const inputValue = searchBtn.value.toLowerCase();

    const filtered = employees.filter(emp =>
        emp.name.toLowerCase().includes(inputValue) ||
        emp.lastName.toLowerCase().includes(inputValue)
    );
    makeTable(filtered);
});

