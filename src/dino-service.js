// the business logic of my application

export class DinoService {
    static async findSomeDinos(noOfDinosaursNames, noOfDinosaursParagraph) {
        // the Async function that uses await in it


        // picking up the endpoint url, telling JavaScript to await the call and to proceed anytime the calls response is ready

        const dinoResponse = await fetch(`https:dinoipsum.com/api/?format=json&words=${noOfDinosaursNames}&paragraphs=${noOfDinosaursParagraph}`);

        // throwing my api call code in a try catch block because I want to determine whether I got a good response(the dinosaur data) or I got a bad response(an error)

            try{
                // telling JavaScript when I have a good response
                if(!dinoResponse.ok){
                    throw Error(dinoResponse.statusText);
                }
                return dinoResponse.json();
                // the branch above says after JavaScript has been forced to await my call, if there isn't an "ok" property in dinoResponse object, then my apiCall returned an error so it should throw in one; otherwise if it does contain the "ok" property call the .json() method on it and return it
            }
            // the catch block would be responsible for handling the error I threw in my branch above. And it just returns users the message property, when the API call returned an error
            catch(dinoError){
                dinoError.message;
            }


    }
}