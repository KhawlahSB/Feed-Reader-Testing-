/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
		


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		
        it('All RSS Feeds url are defined and have a value', function(){

            var allFeedsLength = allFeeds.length;

            for(var i = 0; i < allFeedsLength; i++){
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		 it('All RSS Feeds names are defined and have a value', function(){

            var allFeedsLength = allFeeds.length;

            for(var i = 0; i < allFeedsLength; i++){
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });
	
    });


    /* TODO: Write a new test suite named "The menu" */
  describe('The Menu', function(){

        var eventSimulation,
            bodyNode = $('body');


            beforeAll(function(){

                /**  checks if an element has class*/
                jasmine.addMatchers({
                    hasMenuClass: function(util){
                        return {

                           /** Checks if body has or not menu-hidden class
                             * @param{Node} actual - Node in which add/remove class.
                             * @param{String} expected - The Class Name.
                             */
                            compare: function(actual, expected){
                                passed = actual.hasClass(expected) === true;
                                return{
                                    pass: passed,
                                    message: 'Expected Node:' + actual[0].localName + (passed ? ' not to have' : " to have") + ' Class:' + expected
                                };
                            }

                        };
                    }
                });

            eventSimulation = {
                /** Trigger click event
                  * @param{String} className - Element's class on which is going to be
                                               added listener and trigger event
                */
                triggerClick: function(className){
                    $( className ).on( "click", function(){});
                    $( className).trigger( "click" );
                }
            };
        });


        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
	    /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
	   it('Menu is hidden by default', function(){
            expect(bodyNode).hasMenuClass("menu-hidden");
        });

        it('Menu is shown when menu icon is clicked', function(){
            eventSimulation.triggerClick(".menu-icon-link");
            expect(bodyNode).not.hasMenuClass("menu-hidden");
        });
        it('Menu is hidden when menu icon is clicked', function(){
            eventSimulation.triggerClick(".menu-icon-link");
            expect(bodyNode).hasMenuClass("menu-hidden");
        });
    });

       

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
 describe('Initial Entries', function(){

        beforeEach(function(done){

            /** loadFeed call
              * done is inside the callback function since loadFeed is async and
              * we need to ensure that it has finished
            */
            loadFeed(0, done);
        });

        /** Spec ensures that div.feed has entries
          * Checks if div.feed has children which shows that entries has been added.
          * expect checks if children is greater than 1 that at at least one entry has been added
        */
        it('div.feed has entries', function(){

             var entryLinkArrayLength = $('.feed .entry').length;
             expect(entryLinkArrayLength).toBeGreaterThan(0);

        });
     });

    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
 describe('New Feed Selection', function(){


        var entryPost,
            entryPost2;

        beforeEach(function(done){

            /** loadFeed call.
              * Callback function call's callAgain function to ensure it is called after function has finished loading.
            */
            loadFeed(1, function(){

                entryPost =$(".entry");
                callAgain(2);
            });

            /**
              * Call loadFeed function and compares between first post and second
              * @param {number} feedNo - feed number
            */
            function callAgain(feedNo){

                loadFeed(feedNo, function(){
                    entryPost2 =$(".entry");
                    done();
                });
            }
        });

        /** Spec ensures that the content has change when there is a new feed selection
        */
        it('Content changes after a new feed selection', function(done){
              //console.log(e)

            for(var i = 0; i < 10; i++){
              var entry1 = entryPost[i].innerHTML;
              var entry2 = entryPost2[i].innerHTML;
              expect(entry1).not.toBe(entry2);

            }
            done();
        });

    });
}());
