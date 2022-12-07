// the business logic of my application

// this is my webpack entry point file, I need to import all what I would be using for the APPlication first
import $ from "jquery";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/styles.css";


// importing the icon image and dino image
import jsImage from "./assets/images/js-badge.svg";
import dinoImage from "./assets/images/dno1.png";

// importing DinoService class already written in me business logic file
import { DinoService } from "./dino-service.js";

// a function for clearing all fields(the DOM) anytime user wants to search for dinosaurs
function clearFields() {
    $("#numParagraphs").val("");
    $("#numWords").val("");
    $(".error").text("");
    $(".dOne").text("");
    $(".dTwo").text("");
    $(".dThree").text("");
    $(".dFour").text("");
}

$(document).ready(() => {

    // for the imported Javascript logo for application
    let iconImg = $(".appImg");
    iconImg.attr("href", jsImage);

    // for the imported dinosaur image
    let dinoImg = $(".dinoImg");
    dinoImg.attr("src", dinoImage);

    // working with my api call when users submit the form

    $("#dinoForm").submit((event) => {
        // preventing submit button from refreshing the page
        event.preventDefault();

        // showing the result div when form is submitted
        $(".result").show();

        // getting the number of dinosaur paragraph user wants
        let noOfDinosaursParagraph = $("#numParagraphs").val();

        let noOfDinosaursNames = $("#numWords").val();
       
        // calling a function for clearing fields everytime me users search for Dinosaurs
        clearFields();

        // using IIFE(Immediately Invoked Function Expression) to make JavaScript run async code as if it were a synchronous one
        (async function(){ 
            // without using the await keyword here, the value of myResponse would be undefined because JavaScript is non-blocking; it would do other things while trying call the method on the class. But with the await keyword, we are forcing JavaScript to wait for method to get called on a class, and store it in the variable myResponse. So t just gets defined when we call it below
            const myResponse = await DinoService.findSomeDinos(noOfDinosaursNames, noOfDinosaursParagraph);
            getMyDinosaurs(myResponse);
        })();


        // writing a function that gets executed when I have a successful response

        function getMyDinosaurs(myDinosaurResponse) {
            // putting code that alters the DOM in its own function


            // in this branch I said if there is if myDinosaurResponse is housing an array, get the first set of arrays(they'll have an index value/ position of 0) and then get me some dinosaurs; otherwise return an error message
            if (myDinosaurResponse[0]) {
                $(".dOne").text(`${myDinosaurResponse[0][0]}`);
                $(".dTwo").text(`${myDinosaurResponse[0][1]}`);
                $(".dThree").text(`${myDinosaurResponse[0][2]}`);
                $(".dFour").text(`${myDinosaurResponse[0][3]}`);
            }
            else{
                // returning an error message to the user, and Since I have handled that with my try...catch block(to return the message property in any errors) in my business logic file, I just return only myDinosaurResponse
                $(".error").text(`Sorry There was an error processing your request: ${myDinosaurResponse}. Please try again`);
            }
        }

    });


});
