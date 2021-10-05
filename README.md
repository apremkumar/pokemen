# pokemen

**Installation**

* Clone the repository
* Navigate to the app root folder
* Execute command `npm install`

**Run the App**

* Once installation is completed, execute command `npm start`
* NPM server will run the app in default port 3000

**Testing**

* Unit tests are in place though the coverage is low.
* Exeecute command `npm test` from app root folder to run tests.

**About**

This app is a fun little excersice to build a pokemon card view using react js skill. Open API provided by pokeapi.co is used for this app. REST API is used so the performace is not as good as the GraphQL variant.

**Screens**

Two screens are there in this app.

* Card list view
* Detail view

**Features**

Card View

1. There is a item count selector which can be used to change the number of cards one can view at a given instance.
2. A search field is present which filters the records only on the current page. API support is not available to implement search across the whole data set. Search works with character name as well as abilities.
3. A sort dropdown is present to sort the character cards by name, height and weight. Default sort is by name in ascending order.
4. All the above three functionalities are designed in a way to survive browser refresh. Session storage is employed to achieve this.
5. Cards view is responsive. The number of columns will increase or decrease based on the viewport size. Though the header is not responsive.

Detail View

1. Detail view does not have any interactable components. It is designed to be a information display.
2. A back navigation button is given for the user to go back to the cards view.

**Missed/Skipped**

1. The page number is not persistent on refresh due to lack of time.
2. Responsiveness couldn't be achieved for the same reason.
3. Test cases are new to me so I did my best to cover the cards view.