var selectedRow = null
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on(x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

//on submitting the form
function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
            resetForm();}
        else{
            updateRecord(formData);
            resetForm();}
        resetForm();
        modal.style.display = "none";
    }
}

//reading data from form
function readFormData() {
    
    var formData = {};
    formData["rollno"] = document.getElementById("rollno").value;
    formData["sname"] = document.getElementById("sname").value;
    formData["gender"] = document.getElementById("gender").value;
    formData["standard"] = document.getElementById("standard").value;
    formData["dob"] = (document.getElementById("day").value)+" "+ (document.getElementById("month").value)+" "+ (document.getElementById("year").value);
    formData["day"] = document.getElementById("day").value;
    formData["month"] = document.getElementById("month").value;
    formData["year"] = document.getElementById("year").value;       
    return formData;
}

//inserting data into the table
function insertNewRecord(data) 
{
    var table = document.getElementById("studentlist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.rollno;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.sname;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.gender;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.standard;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.dob;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button onClick="onEdit(this)" id="ubtn" style="border:none;background-color:green;color:white;">Edit</button>
                       <button onClick="onDelete(this)" style="border:none;background-color:red;color:white;">Delete</button>`;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.day;
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = data.month;
    cell9 = newRow.insertCell(8);
    cell9.innerHTML = data.year;


}

//reset the form
function resetForm() 
{
    document.getElementById("rollno").value = "";
    document.getElementById("sname").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("standard").value = "";
    document.getElementById("day").value = "";
    document.getElementById("month").value = "";
    document.getElementById("year").value = "";    
    selectedRow = null;
}

//getting the previous values while updating the record
function onEdit(td)
 {
    
    modal.style.display = "block";
    selectedRow = td.parentElement.parentElement;
    document.getElementById("rollno").value = selectedRow.cells[0].innerHTML;
    document.getElementById("sname").value = selectedRow.cells[1].innerHTML;
    document.getElementById("gender").value = selectedRow.cells[2].innerHTML;
    document.getElementById("standard").value = selectedRow.cells[3].innerHTML;
    document.getElementById("day").value = selectedRow.cells[6].innerHTML;
    document.getElementById("month").value = selectedRow.cells[7].innerHTML;
    document.getElementById("year").value = selectedRow.cells[8].innerHTML;


}

//updating the record
function updateRecord(formData) 
{
    
    selectedRow.cells[0].innerHTML = formData.rollno;
    selectedRow.cells[1].innerHTML = formData.sname;
    selectedRow.cells[2].innerHTML = formData.gender;
    selectedRow.cells[3].innerHTML = formData.standard;
    selectedRow.cells[4].innerHTML = formData.dob;
    selectedRow.cells[6].innerHTML = formData.day;
    selectedRow.cells[7].innerHTML = formData.month;
    selectedRow.cells[8].innerHTML = formData.year;
    

}


//performing deletion of the record
function onDelete(td) 
{
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("studentlist").deleteRow(row.rowIndex);
        resetForm();
    }
}


//validating the entries by user
function validate() 
{
     
    isValid = true;


    //validating roll number
    var str = document.getElementById("rollno").value;  
    var n = str.toString().length;
    if ((document.getElementById("rollno").value == "")|| (n!=6) || (isNaN(document.getElementById("rollno").value))   ){
        isValid = false;
        alert("Enter valid value in Roll Number!!\n-> Roll Number must be of 6 digits!! \n-> It must not contain any 'alphabet' or 'symbol'!!");
        return;
    } 


    //validating name
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var name = document.getElementById('sname').value;
    if ((document.getElementById("sname").value == "") || (!regName.test(name))){
        
        isValid = false;
        alert("Enter valid name!!\n-> Name must contain only first name and last name!!\n-> Name must contain only alphabets!!");       
        return;
    } 



    //validating gender
    if ((document.getElementById("gender").value == "")) {
        isValid = false;
        alert("Select the Gender!!");
        return;
    }



    //validating standard
    if (document.getElementById("standard").value == "") {
        isValid = false;
        alert("Select the Standard!!");
        return;
    } 



    // validating date of birth
    var d= document.getElementById("day").value;
    var m= document.getElementById("month").value;
    var y= document.getElementById("year").value;
    if( (y==""||m==""||d=="")||((y%4==0) && (m=="Feb")&&( d==31 || d==30 ) ) ||((y%4!=0) && (m=="Feb")&&( d==31 || d==30 || d==29) ) || ((m=="Apr"||m=="Jun"||m=="Sept"||m=="Nov")&&(d==31)   )    )
    {
        isValid = false;
        alert("Please Recheck your Selected Date!!");
        return;      
    }
     
    
    modal.style.display = "none";
    return isValid;
    
}

