function MenuChoice(selection)
{
    document.getElementById("storelist").style.visibility = "hidden";
    document.getElementById("orderhistory").style.visibility = "hidden";
    
    switch (selection)
    {
        case "storelist":
            document.getElementById("storelist").style.visibility = "visible"; //Makes the Store List HTML section visible
            ListStores(); //Calls the function that creates the store list
            break;
        case "orderhistory":
            document.getElementById("orderhistory").style.visibility = "visible";
            Orders("");
            break;
        case "None":
            //No menu item selected, so no section should be displayed
            break;
        default:
            alert("Please select a different menu option");
            
    }
}

function ListStores() //This sends a request to the GetAllStores service and creates a table with the data returned
{
    var xmlhttp = new XMLHttpRequest(); //Creates the XMLHttpRequest object
    var url = "http://student.business.uab.edu/WebAppService/service1.svc/getAllStores"; //URL for the service
             
    xmlhttp.onreadystatechange = function() { //Creates the event handler for service request 
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var output = JSON.parse(xmlhttp.responseText); //Captures the data returned form the service and puts in an object
        GenerateOutput(output); //Calls the function that creates the output table and passes the data object to it
        }
    }
    xmlhttp.open("GET", url, true); //Sets the options for requesting the service
    xmlhttp.send();  //Calls the service
            
    function GenerateOutput(result) //This function receives the data form the service and creates a table to display it
    {
        var display = "<table><tr><th>Store ID</th><th>Store Name</th><th>Store City</th></tr>"; //Table Headings
        var count = 0; //Count variable to loop
        var storename = ""; //Variable to store the Store Name
        var storeid = ""; //Variable to store the Store ID
        var storecity = ""; //Variable to store the Store City
        for(count = 0; count < result.GetAllStoresResult.length; count ++) //Loop for creating table rows
        {
            storename = result.GetAllStoresResult[count].StoreName; //Assigns the Store Name to a variable
            storeid = result.GetAllStoresResult[count].StoreID; //Assigns the Store ID to a variable
            storecity = result.GetAllStoresResult[count].StoreCity; //Assigns the Store City to a variable
            display += "<tr><td>" + storeid + "</td><td>" + storename + "</td><td>" + storecity + "</td></tr>"; //Creates a table row
        }
        display += "</table>"; //Closes the table HTML after table rows are added
        document.getElementById("liststores").innerHTML = display; //Displays the table in the HTML page
        }
}

function Orders(storeid) //Retrieves a list of books ordered by a particular store using the store ID for the search
    {
        var xmlhttp = new XMLHttpRequest();
            var url = "http://student.business.uab.edu/WebAppService/service1.svc/getOrderHistory/"; //Service URL
            url += storeid; //Store ID to complete Service URL
                        
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var output = JSON.parse(xmlhttp.responseText);
                    GenerateOutput(output);
                }
            }
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
            
            function GenerateOutput(result) //Function that displays results
            {
            var display = "<table><tr><th>Book Name</th><th>Total Ordered</th></tr>";
            var count = 0;
            for(count = 0; count < result.length; count ++)
            {
                display += "<tr><td>" + result[count].BookName + "</td><td>" + result[count].SaleNumber + "</td></tr>";
            }
            display += "</table>";
            document.getElementById("books").innerHTML = display;
            }
    }


