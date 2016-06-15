function MenuChoice(selection)
{
    document.getElementById("picture").style.visibility = "hidden";
    document.getElementById("contacts").style.visibility = "hidden";
    
    switch (selection)
    {
        case "camera":
            document.getElementById("picture").style.visibility = "visible";
            break;
        case "contacts":
            document.getElementById("contacts").style.visibility = "visible";
            break;
        case "None":
            //No menu item selected, so no section should be displayed
            break;
        default:
            alert("Please select a different menu option");
            
    }
}

//Function that invokes device camera app and captures output from the camera app
function CapturePhoto()
{
    navigator.camera.getPicture(onSuccess, onFail, { quality: 20, destinationtype: destinationtype.FILE_URI, saveToPhotoAlbum: true });
    //The onSuccess parameter is the function that is called when the camera app operates successfully
    //The onFail parameter is the function that is called when no picture is returned
    //The other parameters indicate how the picture is to be handled
}

//This function handles the picture returned from the CapturePhoto function and displays it on the web page
function onSuccess(imageURI)
{
    var picdisplay = document.getElementById("snapshot");
    pickdisplay.style.display = 'block';
    pickdisplay.src = imageURI; //Assigns the picture to the image source property of the image on the web page
}

//This function displays an error message if a picture is not returned
function onFail(message)
{
    alert("Failed because: " + message);
}

//This function displays the contact list on the device and collects the data for the contact selected
function PickContact()
{
    //The pickcontact method has two parameters.  The first parameter is the function that handles a successful contact
    //selection, and the data is returned.  The second parameter is optional, and is called if no contact is returned.
    //The contact information is returned as a JSON object, with arrays for certain items like phone numbers.
    navigator.contacts.pickContact(function(contact) //Function that operates when a contact is successfully returned
        {
            var contactinfo = "";
            contactinfo += contact.name.givenName + " " + contact.name.familyName + "<br>";
            var count = 0;
            if (contact.phoneNumbers !== null) //Checks for the presence of phone numbers
            {
                for (count=0; count < contact.phoneNumbers.length; count++) //Retrieves all the phone numbers
                {
                    contactinfo += contact.phoneNumbers[count].type + ": " + contact.phoneNumbers[count].value + "<br>";
                }
            }
            if (contact.emails !== null) //Checks for the presence of email addresses
            {
                for(count=0; count < contact.emails.length; count++) //Retrieves all email addresses
                {
                    contactinfo += contact.emails[count].type + ": " + contact.emails[count].value + "<br>";
                }
            }
            document.getElementById("contactname").innerHTML = contactinfo;
        }, function(err) //Function that operates when nothing is returned
        {
            alert("Error: " + err);
        }
        );
}