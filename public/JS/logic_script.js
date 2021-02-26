//Shorten document.getElementById('') into just $('') in plain javaScript
var $ = function(id) { return document.getElementById(id) }, // Now $('id') possible in Vanilla JS
    $$ = function(id) { return clientdoc.getElementById(id) },
    clientdoc = $("clientframe").contentWindow.document,
    iframebody = $("clientframe").contentWindow.document.body,
    droppables = $("sidebar_menu"),
    diviframe = $("iframe_live_wh"),
    _target;

// Your code to run since DOM is loaded and ready
clientdoc.addEventListener("DOMContentLoaded", function() {

    //Adding default event listeners on load
    clientdoc.body.addEventListener('mouseover', mouseEnter);
    clientdoc.body.addEventListener('click', oneClickForAll);
    clientdoc.body.addEventListener('click', forFun); //Only for alerting when Click Event Handler is OFF
    clientdoc.body.addEventListener("mouseout", mouseLeave, false);
    clientdoc.body.addEventListener("dragover", dragOver, false);
    clientdoc.body.addEventListener("dragleave", dragLeave, false);
    clientdoc.body.addEventListener("drop", onDrop, false);
    clientdoc.body.addEventListener("dblclick", dblClick, false);
    droppables.addEventListener("dragstart", onDragStart, false);
    window.addEventListener("resize", getSize, false);

    console.log('Event Listeners are attached.')

    clientdoc.body.setAttribute('hover-event', 'true');
    clientdoc.body.setAttribute('click-event', 'true');

    $('hover-switch').checked = true;
    $('click-switch').checked = true;
    $('loGo').style.color = "rgb(34, 165, 93)";

    function dblClick() {
        // (event.srcElement.id == '__upload') for specific ID
        if (event.srcElement.nodeName == "IMG") {
            //Change src event.srcElement is the same with x
            event.srcElement.src = "https://picsum.photos/200/300";
            //console.log(event.srcElement);

            //Remove placeholder of img
            event.srcElement.classList.remove("__placeholder");

            //need to remvoe placeholder of topmost parent ( topmost div container __placeholder)
            event.srcElement.parentNode.parentNode.parentNode.classList.remove(
                "__placeholder"
            );

            //Removes class="" if empty, so on code download you don't have it :)
            if (event.srcElement.className == "")
                event.srcElement.removeAttribute("class");
        }
    }

    function getSize() {
        //Document's width and height
        let wd = $("clientframe").clientWidth; //the entire iFrame on CodePen
        let wh = $("clientframe").clientHeight;

        // put the result into a h1 tag
        $("iframe_live_wh").innerHTML = wd + " x " + wh;
    }

    function mouseLeave(e) {
        //Remove outline on hover
        e.target.classList.remove("outline");
        //Tooltip hide
        $("tooltip1").style.display = "";
        //console.clear();
    }

    function dragOver(e) {
        //These two are really needed to remove the cut circle on iframe :)
        event.preventDefault();
        event.stopPropagation();

        //Add outline on hover
        e.target.classList.add("outline");

        //Tooltip show
        if (e.target.classList.item(0) == "outline") {
            $("tooltip1").textContent =
                "<" + e.target.tagName.toLowerCase() + ">";
        } else if (e.target.classList.item(1) == "outline" || "outline-dashed") {
            $("tooltip1").textContent =
                "<" +
                e.target.tagName.toLowerCase() +
                ' class="' +
                e.target.classList.item(0) +
                '">';
        } else if (e.target.classList.item(2) == "outline" || "outline-dashed") {
            $("tooltip1").textContent =
                "<" +
                e.target.tagName.toLowerCase() +
                ' class="' +
                e.target.classList.item(0) +
                +e.target.classList.item(1) +
                '">';
        } else if (e.target.classList.item(3) == "outline" || "outline-dashed") {
            $("tooltip1").textContent =
                "<" +
                e.target.tagName.toLowerCase() +
                ' class="' +
                e.target.classList.item(0) +
                e.target.classList.item(1) +
                e.target.classList.item(2);
            ('">');
        } else {
            $("tooltip1").textContent =
                "<" + e.target.tagName.toLowerCase() + ">";
        }

        $("tooltip1").style.display = "block";
        //console.log('<' + e.target.tagName.toLowerCase() + '>');
    }

    function dragLeave(e) {
        //Much needed on hover before drop to remove all those lines
        e.target.classList.remove("outline");

        $("tooltip1").style.display = "none";
        //console.log('<' + e.target.tagName.toLowerCase() + '>');
    }

    function onDragStart(e) {
        console.log("Drag Started!");
        e.dataTransfer.setData(
            "text/html",
            e.target.getAttribute("data-insert-html")
        );
    }

    function onDrop(e) {
        e.preventDefault();

        console.log("Drop event");

        // Remove placeholder

        let x = e.dataTransfer.getData(
            "text/html",
            e.target.getAttribute("data-insert-html")
        );
        let frag = document.createRange().createContextualFragment(x);

        //Here before appending, need to calculate if mouseover is closer to top or bottom, so it prepend( put before) or after,
        //Now it only puts it after :)
        e.target.appendChild(frag);

        //Much needed to remove the outline on drop finished <3
        e.target.classList.remove("outline");
        e.target.parentNode.parentNode.classList.remove("__placeholder"); //Works for now if only 2 parents (not ideal)

        //Much needed- Removes the div with ID <fr-cell> and all of it`s sub-content from the ELEMENT i click on only :)
        let item = clientdoc.getElementById("fr-cell"); //Gets only the topmost fr-cell ID, in order of DOM (not ideal)
        e.target.removeChild(item);

    }


});


// Component Search - W3School Adapted https://www.w3schools.com/howto/howto_js_filter_lists.asp
function instantSearch() {
    //Passed
    let input, filter, ul, span, p, i, txtValue;

    //Passed
    input = $("myInput");
    filter = input.value.toUpperCase();
    ul = $("myUL");
    span = ul.getElementsByTagName("span");

    //Passed
    for (i = 0; i < span.length; i++) {
        p = span[i].getElementsByTagName("p")[0];
        txtValue = p.textContent || p.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            //span[i].style.display = "";
            span[i].parentNode.style.display = "";
            span[i].parentNode.parentNode.firstElementChild.style.display = "";
            span[i].parentNode.parentNode.style.display = "";
        } else {
            //span[i].style.display = "none";
            span[i].parentNode.style.display = "none";
            span[i].parentNode.parentNode.firstElementChild.style.display = "none";
            span[i].parentNode.parentNode.style.display = "none";
        }
    }
}


//Function for eventListeners
function mouseEnter(e) {

    //Add outline on hover
    e.target.classList.add('outline');

    //Tooltip show (redo)
    if (e.target.classList.item(0) == 'outline') {
        $('tooltip1').textContent = '<' + e.target.tagName.toLowerCase() + '>';
    } else if (e.target.classList.item(1) == 'outline' || 'outline-dashed') {
        $('tooltip1').textContent = '<' + e.target.tagName.toLowerCase() + ' class="' + e.target.classList.item(0) + '">';
    } else if (e.target.classList.item(2) == 'outline' || 'outline-dashed') {
        $('tooltip1').textContent = '<' + e.target.tagName.toLowerCase() + ' class="' + e.target.classList.item(0) + +e.target.classList.item(1) + '">';
    } else if (e.target.classList.item(3) == 'outline' || 'outline-dashed') {
        $('tooltip1').textContent = '<' + e.target.tagName.toLowerCase() + ' class="' + e.target.classList.item(0) + e.target.classList.item(1) + e.target.classList.item(2)
        '">';
    } else {
        $('tooltip1').textContent = '<' + e.target.tagName.toLowerCase() + '>';
    }

    $('tooltip1').style.display = "block";
    //console.log('<' + e.target.tagName.toLowerCase() + '>');

}

//Tooltip show delay
(function() {
    $('[data-toggle="tooltip"]').tooltip({ delay: { "show": 500, "hide": 100 } })
})

//Control Panel
function toggleEditIframe() {
    if (
        $("clientframe").contentWindow.document.body
        .contentEditable == "true"
    ) {
        $(
            "clientframe"
        ).contentWindow.document.body.contentEditable = false;
        console.log('Edit iFrame OFF.')

        //Snackbar notification
        $("snackbar").innerHTML = "IFrame Edit : OFF";
        let x = $("snackbar");
        x.className = "show";
        setTimeout(function() {
            x.className = x.className.replace("show", "");
        }, 2000);
    } else {
        $(
            "clientframe"
        ).contentWindow.document.body.contentEditable = true;
        console.log('Edit iFrame ON.')

        //Snackbar notification
        $("snackbar").innerHTML = "IFrame Edit : ON";
        let x = $("snackbar");
        x.className = "show";
        setTimeout(function() {
            x.className = x.className.replace("show", "");
        }, 2000);
    }
}

function toggleOutlineAll() {
    //Toggle iFrame outline dashed elements
    let x = clientdoc.body.querySelectorAll("*");
    let i;

    for (i = 0; i < x.length; i++) {
        x[i].classList.toggle("outline-dashed");
    }

    //Known bug _ adding new elements with outline on will not remove it when turning off.
    let firstfelem = clientdoc.body.children[0];
    //Snackbar notifications toggle
    if (firstfelem.classList.contains("outline-dashed")) {
        //Snackbar notification ON
        $("snackbar").innerHTML = "Outline : ON";
        let x = $("snackbar");
        x.className = "show";
        setTimeout(function() {
            x.className = x.className.replace("show", "");
        }, 2000);
    } else {
        //Snackbar notification OFF
        $("snackbar").innerHTML = "Outline : OFF";
        let x = $("snackbar");
        x.className = "show";
        setTimeout(function() {
            x.className = x.className.replace("show", "");
        }, 2000);
    }
}

function showClickedElIdClass(e) {
    // If click target's id is not empty
    if (e.target.id != "") {
        //alert('<' + e.target.tagName.toLowerCase() + ' id="' + e.target.id + '">');
        e.target.style.outline = "2px dashed red";
    } else {
        //alert('<' + e.target.tagName.toLowerCase() + '>');
        //e.target.style.outline = "none";
    }
}
//Event Listener Switches 
function toggleHoverListener() {

    if (clientdoc.body.getAttribute('hover-event') !== 'true') {
        clientdoc.body.addEventListener('mouseover', mouseEnter);
        clientdoc.body.setAttribute('hover-event', 'true');
        console.clear();
        console.log('Event Listener: Hover ON.');
        //Add css rules
    } else {
        clientdoc.body.removeEventListener('mouseover', mouseEnter);
        clientdoc.body.setAttribute('hover-event', 'false');
        console.clear();
        console.log('Event Listener: Hover OFF.');

    };
}

function toggleClickListener() {

    if (clientdoc.body.getAttribute('click-event') !== 'true') {
        clientdoc.body.addEventListener('click', oneClickForAll);
        clientdoc.body.setAttribute('click-event', 'true');
        console.clear();
        console.log('Event Listener: LeftClick ON.');
        //Add css rules
    } else {
        clientdoc.body.removeEventListener('click', oneClickForAll);
        clientdoc.body.setAttribute('click-event', 'false');
        console.clear();
        console.log('Event Listener: One-Click OFF.');

        //If you wanna get rid of current target, not advisable for UX
        // event.target.classList.remove('active__u');
        // $('onlyIfElem').classList.add('displayNone');
        // $('selectFirst').classList.remove('displayNone');


    };
}
// End of it 

// //console.log on screen
rewireLoggingToElement(
    () => document.getElementById("log"),
    () => document.getElementById("log-container"), true);

function rewireLoggingToElement(eleLocator, eleOverflowLocator, autoScroll) {
    fixLoggingFunc('log');
    fixLoggingFunc('debug');
    fixLoggingFunc('warn');
    fixLoggingFunc('error');
    fixLoggingFunc('info');

    function fixLoggingFunc(name) {

        console['old' + name] = console[name];
        console[name] = function(...arguments) {
            const output = produceOutput(name, arguments);
            const eleLog = eleLocator();

            if (autoScroll) {

                const eleContainerLog = eleOverflowLocator();
                const isScrolledToBottom = eleContainerLog.scrollHeight - eleContainerLog.clientHeight <= eleContainerLog.scrollTop + 1;
                eleLog.innerHTML += output + "<br>";
                if (isScrolledToBottom) {
                    eleContainerLog.scrollTop = eleContainerLog.scrollHeight - eleContainerLog.clientHeight;
                }
            } else {
                eleLog.innerHTML += output + "<br>";
            }

            console['old' + name].apply(undefined, arguments);

        };
    }

    function produceOutput(name, args) {
        return args.reduce((output, arg) => {
            return output +
                "<span class=\"log-" + (typeof arg) + " log-" + name + "\">" +
                "<span class=\"time-" + (typeof arg) + " log-" + name + "\">" + '[' + new Date().toLocaleTimeString() + '] ' + "</span>" + (typeof arg === 'object' && (JSON || {}).stringify ? JSON.stringify(arg) : arg) +
                "</span>&nbsp;";
        }, '');
    }

}

function forFun() {
    //If Click Toggle is OFF and someone clicks, display a warning ( it would require a second click Event Handler)
    if (clientdoc.body.getAttribute('click-event') === 'false') {
        console.log('Turn on the Click Event Handler first before clicking.')
    }
}

function oneClickForAll(event) {

    x = event.target;
    _target = x;
    let list = clientdoc.querySelectorAll("*"); // Grab all the li elements

    for (let i = 0; i < list.length; i++) {
        if (x === list[i]) { // If my click target is the same as list item it goes through,and this is to ensure only 1 eleme is red




            // 0. Show tab1c's content if elem clicked
            $('onlyIfElem').classList.remove('displayNone');
            $('selectFirst').classList.add('displayNone');

            // $$('badge_').style.display="block";

            // 0.1 Toggle classes from mini checkboxes and not on click on a class

            //Remove Hover
            x.classList.remove('outline');

            // 1. Tag, ID, Classes
            $('target_el').innerHTML = x.nodeName;

            if (x.id === "") {
                $('target_id').innerHTML = '<b>N/A</b>';
            } else {
                $('target_id').innerHTML = '<span class="tag__">' + x.id + '</span>';

            }

            // NOT DRY - (instead of 0,1,3 could note a n) Only show these divs if the classes exist!
            if (x.classList[0] && x.classList[0] !== "active__u") {
                //just display it, no reCreate
                $("0-class").style.display = "inline-block";
                $("target_cls0").innerHTML =
                    x.classList[0];


            } else {
                $("0-class").style.display = "none";
            }

            if (x.classList[1] && x.classList[1] !== "active__u") {
                $("1-class").style.display = "inline-block";
                $("target_cls1").innerHTML = x.classList[1];

            } else {
                $("1-class").style.display = "none";

            }

            if (x.classList[2] && x.classList[2] !== "active__u") {

                $("2-class").style.display = "inline-block";
                $("target_cls2").innerHTML =
                    x.classList[2];
            } else {
                $("2-class").style.display = "none";
            }

            // End of 1

            /// **** 2. Toggle a class on/off on click in Panel ******* /////

            let classNames = x.classList;
            let clonedClassNames = [...classNames]; //It`s a must to copy the array


            //Not DRY!
            $('target_cls0').onclick = function(e) {
                //Toggle apply class on the element

                x.classList.toggle(clonedClassNames[0]);

                /*Log all classes from client.css
      Array.prototype.forEach.call(clientdoc.styleSheets[0].cssRules,
        function(a){
          let x = a.selectorText;
          console.log(x);

        }); */

                //Remove empty class
                if (event.srcElement.className == "")
                    event.srcElement.removeAttribute("class");

                //Prevent default
                e.preventDefault();
            };
            $('target_cls1').onclick = function(e) {

                x.classList.toggle(clonedClassNames[1]);

                //$("tgl-class-1").toggleAttribute("checked");

                //Remove empty class
                if (event.srcElement.className == "")
                    event.srcElement.removeAttribute("class");

                //Prevent default
                e.preventDefault();
            };
            $('target_cls2').onclick = function(e) {

                x.classList.toggle(clonedClassNames[2]);

                // $("tgl-class-2").toggleAttribute("checked");

                //Remove empty class
                if (event.srcElement.className == "")
                    event.srcElement.removeAttribute("class");

                //Prevent default
                e.preventDefault();
            };

            // Click on x remove classes from elems + themselves innerHTML

            $('del_cls0').onclick = function(e) {
                //Toggle apply class on the element
                x.classList.remove(clonedClassNames[0]);
                $('0-class').style.display = "none"; //Could add a revert ;) 


                //Remove empty class
                if (event.srcElement.className == "")
                    event.srcElement.removeAttribute("class");

                //Prevent default
                e.preventDefault();
            };
            $('del_cls1').onclick = function(e) {
                x.classList.remove(clonedClassNames[1]);
                $('1-class').style.display = "none";
                //$("tgl-class-1").toggleAttribute("checked");

                //Remove empty class
                if (event.srcElement.className == "")
                    event.srcElement.removeAttribute("class");

                //Prevent default
                e.preventDefault();
            };
            $('del_cls2').onclick = function(e) {
                x.classList.remove(clonedClassNames[2]);
                $('2-class').style.display = "none";
                //$("tgl-class-2").toggleAttribute("checked");

                //Remove empty class
                if (event.srcElement.className == "")
                    event.srcElement.removeAttribute("class");

                //Prevent default
                e.preventDefault();
            };

            if (clonedClassNames[0] === undefined || clonedClassNames[0] === 'active__u') {
                $('saved-value').innerHTML = "Selected class: <b>N/A</b>"
            } else {
                $('saved-value').innerHTML = " Selected class: ." + clonedClassNames[0]; // aici imi scrie in HTML prima clasa prezenta
            }

            // $('saved-value').innerHTML = " Selected class: ." + clonedClassNames[0]; // aici imi scrie in HTML prima clasa prezenta



            /// ********** End of 2 ****************

            //********* 3. Change width on clicked element via inputs (INLINE-STYLES)*************
            let grabStyles = window.getComputedStyle(x); //console.log(grabStyles);

            //a. Display x's default values - Dimension

            $('myWidth').value = grabStyles.getPropertyValue('width');
            $('maxWidth').value = grabStyles.getPropertyValue('max-width');
            $('minWidth').value = grabStyles.getPropertyValue('min-width');

            $('myHeight').value = grabStyles.getPropertyValue('height');
            $('maxHeight').value = grabStyles.getPropertyValue('max-height');
            $('minHeight').value = grabStyles.getPropertyValue('min-height');

            //a. Width (with STYLE element in comments )
            $('myWidth').addEventListener('keyup', function() { x.style.width = $('myWidth').value; }); // (1) drop inside});
            $('maxWidth').addEventListener('keyup', function() { x.style.maxWidth = $('maxWidth').value; });
            $('minWidth').addEventListener('keyup', function() { x.style.minWidth = $('minWidth').value; });

            $('myHeight').addEventListener('keyup', function() { x.style.height = $('myHeight').value; });
            $('maxHeight').addEventListener('keyup', function() { x.style.maxHeight = $('maxHeight').value; });
            $('minHeight').addEventListener('keyup', function() { x.style.minHeight = $('minHeight').value; });

            //b. Margin
            if (grabStyles.getPropertyValue('margin-top') !== "0px") {
                let str = grabStyles.getPropertyValue('margin-top');
                str = str.slice(0, -2);
                $('margin-top').value = str;
            } else {
                $('margin-top').value = "";
            }

            if (grabStyles.getPropertyValue('margin-right') !== "0px") {
                let str = grabStyles.getPropertyValue('margin-right');
                str = str.slice(0, -2);
                $('margin-right').value = str;
            } else {
                $('margin-right').value = "";
            }

            if (grabStyles.getPropertyValue('margin-bottom') !== "0px") {
                let str = grabStyles.getPropertyValue('margin-bottom');
                str = str.slice(0, -2);
                $('margin-bottom').value = str;
            } else {
                $('margin-bottom').value = "";
            }

            if (grabStyles.getPropertyValue('margin-left') !== "0px") {
                let str = grabStyles.getPropertyValue('margin-left');
                str = str.slice(0, -2);
                $('margin-left').value = str;
            } else {
                $('margin-left').value = "";
            }

            $('margin-top').addEventListener('keyup', function() { x.style.marginTop = $('margin-top').value; }); // (1) drop inside});
            $('margin-right').addEventListener('keyup', function() { x.style.marginRight = $('margin-right').value; });
            $('margin-bottom').addEventListener('keyup', function() { x.style.marginBottom = $('margin-bottom').value; });
            $('margin-left').addEventListener('keyup', function() { x.style.marginLeft = $('margin-left').value; });


            //c. Padding
            if (grabStyles.getPropertyValue('padding-top') !== "0px") {
                let str = grabStyles.getPropertyValue('padding-top');
                str = str.slice(0, -2); //To not show 'px'at the end :)
                $('padding-top').value = str;
            } else {
                $('padding-top').value = "";
            }

            if (grabStyles.getPropertyValue('padding-right') !== "0px") {
                let str = grabStyles.getPropertyValue('padding-right');
                str = str.slice(0, -2); //To not show 'px'at the end :)
                $('padding-right').value = str;
            } else {
                $('padding-right').value = "";
            }

            if (grabStyles.getPropertyValue('padding-bottom') !== "0px") {
                let str = grabStyles.getPropertyValue('padding-bottom');
                str = str.slice(0, -2); //To not show 'px'at the end :)
                $('padding-bottom').value = str;
            } else {
                $('padding-bottom').value = "";
            }

            if (grabStyles.getPropertyValue('padding-left') !== "0px") {
                let str = grabStyles.getPropertyValue('padding-left');
                str = str.slice(0, -2);
                $('padding-left').value = str
            } else {
                $('padding-left').value = "";
            }

            $('padding-top').addEventListener('keypress', function() { x.style.paddingTop = $('padding-top').value; }); // (1) drop inside});
            $('padding-right').addEventListener('keyup', function() { x.style.paddingRight = $('padding-right').value; });
            $('padding-bottom').addEventListener('keyup', function() { x.style.paddingBottom = $('padding-bottom').value; });
            $('padding-left').addEventListener('keyup', function() { x.style.paddingLeft = $('padding-left').value; });

            //d. Border
            if (grabStyles.getPropertyValue('border-top-width') !== "0px") {
                let str = grabStyles.getPropertyValue('border-top-width');
                str = str.slice(0, -2);
                $('border-top').value = str;
            } else {
                $('border-top').value = "";
            }

            if (grabStyles.getPropertyValue('border-right-width') !== "0px") {
                let str = grabStyles.getPropertyValue('border-right-width');
                str = str.slice(0, -2);
                $('border-right').value = str;
            } else {
                $('border-right').value = "";
            }

            if (grabStyles.getPropertyValue('border-bottom-width') !== "0px") {
                let str = grabStyles.getPropertyValue('border-bottom-width');
                str = str.slice(0, -2);
                $('border-bottom').value = str;
            } else {
                $('border-bottom').value = "";
            }

            if (grabStyles.getPropertyValue('border-left-width') !== "0px") {
                let str = grabStyles.getPropertyValue('border-left-width');
                str = str.slice(0, -2);
                $('border-left').value = str;
            } else {
                $('border-left').value = "";
            }

            $('border-top').addEventListener('keyup', function() {
                x.style.borderTopWidth = $('border-top').value;
                x.style.borderTopColor = "black";
                x.style.borderTopStyle = "solid";
            }); // (1) drop inside});
            $('border-right').addEventListener('keyup', function() {
                x.style.borderRightWidth = $('border-right').value;
                x.style.borderRightColor = "black";
                x.style.borderRightStyle = "solid";
            });
            $('border-bottom').addEventListener('keyup', function() {
                x.style.borderBottomWidth = $('border-bottom').value;
                x.style.borderBottomColor = "black";
                x.style.borderBottomStyle = "solid";
            });
            $('border-left').addEventListener('keyup', function() {
                x.style.borderLeftWidth = $('border-left').value;
                x.style.borderLeftColor = "black";
                x.style.borderLeftStyle = "solid";
            });

            // -----END OF 3 ----- 

            //--------- 4 - HOVER COMPUTED BOX ----------- //

            //On mouseover respective margin, padding, border or el, white out the rest to mimick real Computed Box
            const elementSquares = document.querySelectorAll('.element');
            const paddingSquares = document.querySelectorAll('.padding');
            const borderSquares = document.querySelectorAll('.border');
            const marginSquares = document.querySelectorAll('.margin');

            elementSquares.forEach(function(elementSquare) {

                //Add the class
                elementSquare.addEventListener('mouseover', function() {
                    //write your event doer here

                    //get the values
                    let compStyles = window.getComputedStyle(x);

                    let paddingTop = compStyles.getPropertyValue('padding-top');
                    let paddingRight = compStyles.getPropertyValue('padding-right');
                    let paddingBottom = compStyles.getPropertyValue('padding-bottom');
                    let paddingLeft = compStyles.getPropertyValue('padding-left');

                    //Highlight on canvas
                    x.style.boxShadow = "inset 0 " + paddingTop + " 0 0 white, inset -" + paddingRight + " 0 0 0 white, inset 0 -" + paddingBottom + " 0 0 white, inset " + paddingLeft + " 0 0 0 white";

                    //Highlight on canvas
                    x.style.backgroundColor = "#8EB7BB";
                    //x.style.backgroundImage=""; needed to highlight over images

                    const paddingSquares = document.querySelectorAll('.padding'); //1.Padding
                    const borderSquares = document.querySelectorAll('.border'); //3.Border
                    const marginSquares = document.querySelectorAll('.margin'); //3.Margin

                    paddingSquares.forEach(function(paddingSquare) {
                        paddingSquare.classList.add('neutral');
                    });

                    marginSquares.forEach(function(marginSquare) {
                        marginSquare.classList.add('neutral');
                    });

                    borderSquares.forEach(function(borderSquare) {
                        borderSquare.classList.add('neutral');
                    });


                });

                //Remove the class
                elementSquare.addEventListener('mouseout', function() {
                    //write your event doer here

                    //Remove gighlight on canvas
                    x.style.backgroundColor = "";
                    x.style.BoShadow = "";

                    const paddingSquares = document.querySelectorAll('.padding'); //1.Padding
                    const borderSquares = document.querySelectorAll('.border'); //3.Border
                    const marginSquares = document.querySelectorAll('.margin'); //3.Margin

                    paddingSquares.forEach(function(paddingSquare) {
                        paddingSquare.classList.remove('neutral');
                    });

                    marginSquares.forEach(function(marginSquare) {
                        marginSquare.classList.remove('neutral');
                    });


                    borderSquares.forEach(function(borderSquare) {
                        borderSquare.classList.remove('neutral');
                    });


                });

            });

            paddingSquares.forEach(function(paddingSquare) {

                paddingSquare.addEventListener('mouseover', function() {
                    //write your event doer here

                    //get the values
                    let compStyles = window.getComputedStyle(x);

                    let paddingTop = compStyles.getPropertyValue('padding-top');
                    let paddingRight = compStyles.getPropertyValue('padding-right');
                    let paddingBottom = compStyles.getPropertyValue('padding-bottom');
                    let paddingLeft = compStyles.getPropertyValue('padding-left');

                    //Highlight on canvas
                    x.style.boxShadow = "inset 0 " + paddingTop + " 0 0 #C3D08B, inset -" + paddingRight + " 0 0 0 #C3D08B, inset 0 -" + paddingBottom + " 0 0 #C3D08B, inset " + paddingLeft + " 0 0 0 #C3D08B";

                    const elementSquares = document.querySelectorAll('.element'); //1.Element
                    const borderSquares = document.querySelectorAll('.border'); //2.Border
                    const marginSquares = document.querySelectorAll('.margin'); //3.Padding


                    elementSquares.forEach(function(elementSquare) {
                        elementSquare.classList.add('neutral');
                    });

                    borderSquares.forEach(function(borderSquare) {
                        borderSquare.classList.add('neutral');
                    });

                    marginSquares.forEach(function(marginSquare) {
                        marginSquare.classList.add('neutral');
                    });


                });

                paddingSquare.addEventListener('mouseout', function() {
                    //write your event doer here

                    const elementSquares = document.querySelectorAll('.element'); //1.Element
                    const borderSquares = document.querySelectorAll('.border'); //2.Border
                    const marginSquares = document.querySelectorAll('.margin'); //3.Padding

                    //Remove highlight
                    x.style.boxShadow = "";

                    elementSquares.forEach(function(elementSquare) {
                        elementSquare.classList.remove('neutral');
                    });

                    borderSquares.forEach(function(borderSquare) {
                        borderSquare.classList.remove('neutral');
                    });

                    marginSquares.forEach(function(marginSquare) {
                        marginSquare.classList.remove('neutral');
                    });


                });

            });

            borderSquares.forEach(function(borderSquare) {

                borderSquare.addEventListener('mouseover', function() {
                    //write your event doer here

                    //Get values
                    let compStyles = window.getComputedStyle(x);

                    let borderTop = compStyles.getPropertyValue('border-top-width');
                    let borderRight = compStyles.getPropertyValue('border-right-width');
                    let borderBottom = compStyles.getPropertyValue('border-bottom-width');
                    let borderLeft = compStyles.getPropertyValue('border-left-width');

                    //Highlight border
                    x.style.borderTop = " " + borderTop + " solid #FADF9A";
                    x.style.borderRight = " " + borderRight + " solid #FADF9A";
                    x.style.borderBottom = " " + borderBottom + " solid #FADF9A";
                    x.style.borderLeft = " " + borderLeft + " solid #FADF9A";

                    const elementSquares = document.querySelectorAll('.element'); //1.Element
                    const paddingSquares = document.querySelectorAll('.padding'); //2.Padding
                    const marginSquares = document.querySelectorAll('.margin'); //3.Margin


                    elementSquares.forEach(function(elementSquare) {
                        elementSquare.classList.add('neutral');
                    });

                    paddingSquares.forEach(function(paddingSquare) {
                        paddingSquare.classList.add('neutral');
                    });

                    marginSquares.forEach(function(marginSquare) {
                        marginSquare.classList.add('neutral');
                    });


                });

                borderSquare.addEventListener('mouseout', function() {
                    //write your event doer here

                    //Remove hitghlight
                    x.style.borderTop = "";
                    x.style.borderRight = "";
                    x.style.borderBottom = "";
                    x.style.borderLeft = "";

                    const elementSquares = document.querySelectorAll('.element'); //1.Element
                    const paddingSquares = document.querySelectorAll('.padding'); //2.Padding
                    const marginSquares = document.querySelectorAll('.margin'); //3.Margin


                    elementSquares.forEach(function(elementSquare) {
                        elementSquare.classList.remove('neutral');
                    });

                    paddingSquares.forEach(function(paddingSquare) {
                        paddingSquare.classList.remove('neutral');
                    });

                    marginSquares.forEach(function(marginSquare) {
                        marginSquare.classList.remove('neutral');
                    });


                });

            });

            marginSquares.forEach(function(marginSquare) {

                marginSquare.addEventListener('mouseover', function() {
                    //write your event doer here

                    //Get values
                    let compStyles = window.getComputedStyle(x);

                    let marginTop = compStyles.getPropertyValue('margin-top');
                    let marginRight = compStyles.getPropertyValue('margin-right');
                    let marginBottom = compStyles.getPropertyValue('margin-bottom');
                    let marginLeft = compStyles.getPropertyValue('margin-left');

                    //Highlight border
                    x.style.boxShadow = " -" + marginLeft + " -" + marginTop + "  0 0 #FACBA1, " + marginRight + " -" + marginTop + "  0 0 #FACBA1, -" + marginLeft + " " + marginBottom + "  0 0 #FACBA1, " + marginRight + " " + marginBottom + "  0 0 #FACBA1";


                    const elementSquares = document.querySelectorAll('.element'); //1.Element
                    const paddingSquares = document.querySelectorAll('.padding'); //2.Padding
                    const borderSquares = document.querySelectorAll('.border'); //3.Border


                    elementSquares.forEach(function(elementSquare) {
                        elementSquare.classList.add('neutral');
                    });

                    paddingSquares.forEach(function(paddingSquare) {
                        paddingSquare.classList.add('neutral');
                    });

                    borderSquares.forEach(function(borderSquare) {
                        borderSquare.classList.add('neutral');
                    });


                });

                marginSquare.addEventListener('mouseout', function() {
                    //write your event doer here

                    const elementSquares = document.querySelectorAll('.element'); //1.Element
                    const paddingSquares = document.querySelectorAll('.padding'); //2.Padding
                    const borderSquares = document.querySelectorAll('.border'); //3.Border

                    //Remove the highlight
                    x.style.boxShadow = "";

                    elementSquares.forEach(function(elementSquare) {
                        elementSquare.classList.remove('neutral');
                    });

                    paddingSquares.forEach(function(paddingSquare) {
                        paddingSquare.classList.remove('neutral');
                    });

                    borderSquares.forEach(function(borderSquare) {
                        borderSquare.classList.remove('neutral');
                    });


                });

            });

            //--------- END OF 4 ----------- //


            // ***** 5. BADGE ***** //   ------------------- TURNING OFF BADGE --------------- 
            // let badge = $$("badge_"); //Will turn on with CRUD and replace actual options

            let w = x.clientWidth;
            let h = x.clientHeight;
            let w$h =
                "&nbsp; &nbsp;" +
                x.clientWidth +
                "x" +
                x.clientHeight + 'px';

            // let clientWidth = $('clientframe').clientWidth;
            // let clientHeight = $('clientframe').clientHeight;



            // // _target.appendChild(badge);

            // var rect = _target.getBoundingClientRect();
            // console.log('Top' + rect.top, 'Right' + rect.right, 'Bottom' + rect.bottom, 'Left' + rect.left);


            // //WE NEED TO PUT IT ON THE RIGHT TO MAKE IT RESPONSIVE, not .left - make a README and explain stuff 
            // badge.style.right = clientWidth- (rect.left +_target.offsetWidth +11) + "px"; //that -2 is the outline


            // if (rect.top < 18) {
            //     badge.style.top = _target.offsetTop  + 2 + "px";
            // } else {
            //     // badge.style.top = clientHeight - (rect.bottom +_target.offsetHeight) + "px"; //that -2 is the outline

            //     // badge.style.top = rect.top - 20 + "px"; // This will get it right for the first 100vw, but then......
            //     badge.style.top = _target.offsetTop - 20 + "px";
            // }


            window.addEventListener("resize", getSize, false);

            function getSize() {
                //On resize run again and update
                let w = x.clientWidth;
                let h = x.clientHeight;
                let w$h =
                    "&nbsp; &nbsp;" +
                    x.clientWidth +
                    "x" +
                    x.clientHeight;


                // //Resize badge
                // let badge = $$("badge_"); //Will turn on with CRUD and replace actual options

                // let clientWidth = $('clientframe').clientWidth; //There is a problem with this, cannot get badge to show on next 100vh element

                // var rect = _target.getBoundingClientRect();
                // console.log('Top' + rect.top, 'Right' + rect.right, 'Bottom' + rect.bottom, 'Left' + rect.left);
                // // badge.style.left = rect.left + (_target.offsetWidth - 101) + "px"; //that -2 is the outline


                // badge.style.right = clientWidth- (rect.left +_target.offsetWidth +11) + "px"; //that -2 is the outline

                // if (rect.top < 18) {
                //     badge.style.top = _target.offsetTop  + 2 + "px";
                // } else {
                //     // badge.style.top = clientHeight - (rect.bottom +_target.offsetHeight) + "px"; //that -2 is the outline

                //     // badge.style.top = rect.top - 20 + "px"; // This will get it right for the first 100vw, but then......
                //     badge.style.top = _target.offsetTop - 20 + "px"; //Working on all elements except p, h1,2,3...idk why yet
                // }
                // //Resize badge 

                //On resize update Column3
                $("renderedWidth").innerHTML = w + "px"; //writes width
                $("renderedHeight").innerHTML = h + "px"; //writes width
            }

            //End of resize live update clicked element

            //10. Decide what to be written inside BADGE

            // $$('el-tag').innerHTML = x.nodeName.toLowerCase();
            // $$('el-w&h').innerHTML = w$h;
            // if (x.id != "") { $$('el-id').innerHTML = "#" + x.id; } else { $$('el-id').innerHTML = ""; }
            // if (x.classList[0] != undefined && x.classList[0] != "active__u") { $$('el-c0').innerHTML = "." + x.classList[0]; } else { $$('el-c0').innerHTML = ""; }
            // if (x.classList[1] != undefined && x.classList[1] != "active__u") { $$('el-c1').innerHTML = "." + x.classList[1]; } else { $$('el-c1').innerHTML = ""; }
            // if (x.classList[2] != undefined && x.classList[2] != "active__u") { $$('el-c2').innerHTML = "." + x.classList[2]; } else { $$('el-c2').innerHTML = ""; }



            //


            // DISPLAY W & H  COLUMN3 ON CLICK
            $("renderedWidth").innerHTML = w + "px"; //writes width
            $("renderedHeight").innerHTML = h + "px"; //writes width

            //Badge - Adds it as first child
            // x.parentNode.insertBefore(badge, x);

            if (x.classList !== "active__u") {
                //if target doesn't have active on it
                x.classList.add("active__u"); //add it
                //badge.classList.add("show");
            } else {
                //x.classList.remove("active"); //to be able to remove it on a second click
                x.className != "active__u"; //to not be able to
                //Also if target doesn't have active__u the badge should be hidden ( not woking yet)
            }
        } else {
            list[i].classList.remove("active__u");

        }
    }
}

function clearLogs() {
    document.getElementById('log').innerHTML = '';
}





// end of it