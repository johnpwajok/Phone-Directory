/*jshint esversion: 6 */

let alphabet = /^[A-Za-z\s]+$/;
let numbers = /^[0-9]+$/;
let mailformat = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

document.getElementById("errorDiv").className += "hidden";
document.getElementById("noResult").className += "hidden";


document.getElementById("submitButton").onclick = function() {
  let contactName = document.getElementById("contactName").value;
  let mobileNumber = document.getElementById("mobileNumber").value;
  let emailAddress = document.getElementById("email").value;

  let validName = true;
  let validNumber = true;
  let validEmail = true;



  //name validation
  if (contactName.match(alphabet) && contactName.length > 0) {
    validName = true;
    console.log("name is valid");
  } else {
    validName = false;
  }
  //number validation
  if (mobileNumber.match(numbers) && mobileNumber.length == 10) {
    validNumber = true;
    console.log("number is valid");

  } else {
    validNumber = false;
  }

  //email validation
  if (mailformat.test(emailAddress) != true) {
    validEmail = false;
    alert("invalid email");
  } else {
    console.log("email is valid");
  }

  if (validName == true && validNumber == true && validEmail == true) {

    document.getElementById("errorDiv").className = "hidden";
    //get count for numbers of rows currently in the table
    //if (validName == true && validNumber == true && validEmail == true) {
    let table = document.getElementById("mainTable");
    let rowCount = table.rows.length;
    let row = table.insertRow(rowCount);

    //set every odd numbered rows background colour to be #f2f2f2
    rowColours();

    let cell1 = row.insertCell(0);
    cell1.innerHTML = contactName;

    let cell2 = row.insertCell(1);
    cell2.innerHTML = mobileNumber;

    let cell3 = row.insertCell(2);
    cell3.innerHTML = emailAddress;

    clearInputs();
  } else {
    console.log("invalid Input");
    document.getElementById("errorDiv").className = "";
  }

};

function clearInputs() {
  document.getElementById("contactName").value = '';
  document.getElementById("mobileNumber").value = '';
  document.getElementById("email").value = '';
}


//Search box function
//use onkeydown instead of onkeypress to acknowledge backspace
document.getElementById("searchBox").onkeydown = function() {
  if (document.getElementById("searchBox").value.length > -1) {
    //if the value of the input in the searchbox is numbers
    if (document.getElementById("searchBox").value.match(numbers) || document.getElementById("searchBox").value == '') {
      let i, x;
      let notShown = 0;
      table = document.getElementById("mainTable");
      tableRows = table.rows;
      searchedNumber = document.getElementById("searchBox").value;
      //convert input to string for easier comparison
      searchedString = searchedNumber.toString();
      console.log(searchedString);

      for (i = 1; i < (tableRows.length); i++) {
        //set x to the value of the nuber cell in the current row
        x = tableRows[i].cells[1].innerHTML;
        //convert to string for easier comparison
        let cellValue = x.toString();
        console.log(cellValue);
        /*if the string in the searchbox doesn't match the value of the cell from
          the first element to the value at the length of the search then set display value to 'none'
        */
        if (searchedString != cellValue.slice(0, searchedString.length)) {
          tableRows[i].style.display = 'none';
          notShown += 1;
        }
        //else if it's a match then, display the element
        else {
          if (tableRows[i].style.display === "none") {
            tableRows[i].style.display = "";
          } else {
            tableRows[i].style.display = "";
          }
          notShown -= 1;
        }
      }
      //hide or display 'noResult' based on whether the search yields any results
      if (notShown >= (tableRows.length - 1)) {
        document.getElementById("noResult").className = "";
      } else {
        document.getElementById("noResult").className = "hidden";

      }
    } else {
      alert("INVALID INPUT");
    }
  }
  //call function to change backgroundcolour for every second row
  rowColours();
};



//codebase from "https://www.w3schools.com/howto/howto_js_sort_table.asp"
//Sort table by contact name
document.getElementById("nameColumn").onclick = function() {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("mainTable");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  //call function to change odd row colour
  rowColours();
};



//Function to change colour of every second row in the table
function rowColours() {
  table = document.getElementById("mainTable");
  tableRows = table.getElementsByTagName("tr");

  //go through all rows and change the classname to "oddrow" if it's odd to make that row #f2f2f2
  for (i = 1; i < tableRows.length; i++) {
    if (i % 2 != 0) {
      tableRows[i].className = "oddRow";
    }
    //else no class to keep white background
    else {
      tableRows[i].className = "";
    }
  }
}
