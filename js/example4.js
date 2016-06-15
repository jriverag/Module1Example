function MenuChoice(selection)
{
    document.getElementById("section1").style.visibility = "hidden";
    document.getElementById("section2").style.visibility = "hidden";
    document.getElementById("location").style.visibility = "hidden";
    
    switch (selection)
    {
        case "Section 1":
            document.getElementById("section1").style.visibility = "visible";
            break;
        case "Section 2":
            document.getElementById("section2").style.visibility = "visible";
            break;
        case "Geolocation":
            document.getElementById("location").style.visibility = "visible";
            break;
        case "None":
            //No menu item selected, so no section should be displayed
            break;
        default:
            alert("Please select a different menu option");
            
    }
}

function Location() //Calls the Geolocation function built in to the web browser
{
    var geo = navigator.geolocation;  //References the Web Browser (navigator) geolocation service

    if (geo) //Tests to see if geolocation service is available
    {
        geo.getCurrentPosition(showPosition); //If the geolocation service is available it gets the position and calls a function to display it

    }
    else
    {
        alert("Geolocation is not supported"); //If the Geolocation service is not available it displays a message
    }
}

function showPosition(position) //Function receives the geolocation data and displays it
{
    var latitude = position.coords.latitude; //Retrieves latitude data
    var longitude = position.coords.longitude; //Retrieves longitude data
    document.getElementById("latitude").innerHTML = latitude;
    document.getElementById("longitude").innerHTML = longitude;
}