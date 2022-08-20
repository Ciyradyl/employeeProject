import {Request} from "./requests";
import {UI} from "./ui";

// Elementleri Seçmek

const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");

const request = new Request("http://localhost:3000/employees")
const ui = new UI();

let updateState = null; // Güncelle butonuna basıldığında parent ve altındaki bilgileri buna yükleyeceğiz.

eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded",getAllEmployees);     // API içerisindeki Employee'leri yükle
    form.addEventListener("submit",addEmployee);                   // API ve arayüze ekleme yapma
    employeesList.addEventListener("click", UpdateOrDelete);        
    updateEmployeeButton.addEventListener("click", updateEmployee);

}

function getAllEmployees(){
    request.get()
    .then(employees => {
        ui.addAllEmployeeToUI(employees);
    })
    .catch(err => console.log(err));
}
function addEmployee(e){

    const employeeName = nameInput.value.trim();
    const employeeDepartment = departmentInput.value.trim();
    const employeeSalary = salaryInput.value.trim();

    if (employeeName === "" || employeeDepartment === "" || employeeSalary === ""){
        alert("Lütfen tüm alanları doldurun!");
    }else{

        request.post({name:employeeName,department:employeeDepartment,salary:Number(employeeSalary)})
        .then(employee => {
            ui.addEmployeeToUI(employee);
        })
        .catch(err => console.log(err));
    }



    ui.clearInputs();
    e.preventDefault(); // Var olan özelliğini engellemek için.
}
function UpdateOrDelete(e){
    // console.log(e.target); ile tıkladığımız butonun html karşılığını görebiliyoruz. Bu sayede id ve classları anlayabiliyoruz.

    if (e.target.id === "delete-employee") {
        // Silme
        deleteEmployee(e.target);
    }else if (e.target.id === "update-employee") {
        updateEmployeeController(e.target.parentElement.parentElement)
    }
}
function deleteEmployee(targetEmployee){
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent; // a'dan dışarı td, id'nin bulunduğu yere iki tane td için previous.

    request.delete(id)
    .then(message => {
        ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement)
    })
    .catch(err => console.log(err));
}
function updateEmployeeController(targetEmployee) {
    ui.toggleUpdateButton(targetEmployee);

    // updateState'i kullanarak güncelleme işlemini yapıyoruz. Aracı eleman gibi düşün.

    if (updateState === null) {
        updateState = {
            updateId : targetEmployee.children[3].textContent,       // targetEmployee tr tagını belirtiyor. Bundan dolayı onun children'ı ve 3. index'i bize id yi veriyor.
            updateParent : targetEmployee
        }
    }else{
        updateState = null;
    }
}
function updateEmployee(){
    if (updateState) {

        // Güncelleme işlemi

        const data = {
            name:nameInput.value.trim(),department:departmentInput.value.trim(),salary:Number(salaryInput.value.trim())
        }

        request.put(updateState.updateId,data)
        .then(updatedEmployee => {
            ui.updateEmployeeOnUI(updatedEmployee,updateState.updateParent);
        })
        .catch(err => console.log(err));
    }
}
// request.get()
// .then(employees => console.log(employees))  
// .catch(err => console.log(err));                // Kendi fake apimize get request attık.

// request.post({name:"Nermin Genç",department:"Muhasebe",salary:"6000"})
// .then(employee => console.log(employee))
// .catch(err => console.log(err));                // Kendi fake apimize post request attık.

// request.put(1,{name:"Hakan Genç",department:"Muhasebe",salary:"8000"})
// .then(employee => console.log(employee))
// .catch(err => console.log(err));                // Kendi fake apimize put request attık.

// request.delete(2)
// .then(message => console.log(message))
// .catch(err => console.log(err));