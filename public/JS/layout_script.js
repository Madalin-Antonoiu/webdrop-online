//____Layout UI JAVASCRIPT____
var $ = function(id) { return document.getElementById(id); }; // Now $('id') possible in Vanilla JS
var $$ = function(id) { return clientdoc.getElementById(id); }; // Now $$('id') for iFrame's elements

var clientdoc = $("clientframe").contentWindow.document,
    iframeDimensions = $('iframe_live_wh'),
    frame = $('clientframe'),
    nav1 = $('nav-left'),
    nav2 = $('nav-right'),
    resizebuttons = $('resize_bar'),
    adminButtons = $('admin-buttons'),
    oneSs = document.styleSheets[0],
    hidden = false;

//Mini-Drawer-Burger -If you add all classes below by default, you should have mini-drawer by default
function columnOne() {
    //Extend-minify
    $('column1').classList.toggle('column1_mini');
    nav1.classList.toggle('column1_mini');

    //For when hide left panel button is used and want to show again from burger
    $('column1').classList.remove('displayNone');
    nav1.classList.remove('displayNone');

    //Hide Logo text
    $('logotext').classList.toggle('displayNone'); //Logo text hidden

    //Hides all text
    document.querySelectorAll("#sidebar_menu li .dd-button span").forEach(function(el) {
        el.classList.toggle('displayNoneB');
    });

    //Center all icons
    document.querySelectorAll(".centerIcon").forEach(function(el) {
        el.classList.toggle('textCenter');
    });

    //From big menu to mini-hover menu - need the two stylesheet below
    let el = $("style1");
    if (el.href.match("./CSS/empty.css")) {
        el.href = "./CSS/minime.css";
    } else {
        el.href = "./CSS/empty.css";
    }
}

function get_iframe_wh() {
    let wd = $('clientframe').clientWidth; //the entire iFrame on CodePen
    let wh = $('clientframe').clientHeight;
    iframeDimensions.innerHTML = wd + " x " + wh;
}


//Preview Eye
$('preview-eye').addEventListener('click', preview, false);


function preview() {
    //read the status of the switch before, save it - Conditional Toggle
    //Remove extra padding at bottom

    //Soo...the first time i press this, Normal goes to Preview
    //During preview, i want everything shut down
    //Going back , i want to return to the save.
    const hoverSave = clientdoc.body.getAttribute('hover-event');
    const clickSave = clientdoc.body.getAttribute('click-event');

    //Case 1 - Going into Preview Mode from regular
    if (clientdoc.body.getAttribute('preview') === 'false') {

        clientdoc.body.style.paddingBottom = "0px"; //remove extra padding at bottom

        //_target is passing the value around from other function ;) 
        if (_target !== undefined) {
            _target.classList.remove('active__u'); // remove red border if _target not undefined
        }


        clientdoc.body.setAttribute('preview', 'true'); //moved to Preview
        if (clientdoc.body.getAttribute('hover-event') === "true" || clientdoc.body.getAttribute('click-event') === "true") {
            clientdoc.body.removeEventListener('mouseover', mouseEnter); // or removeEventListener
            clientdoc.body.removeEventListener('click', oneClickForAll);
        }
    } else { //Case 2 - Coming back from Preview Mode

        clientdoc.body.style.paddingBottom = "80px"; //Adding back the padding bottom on body for drop ease
        clientdoc.body.setAttribute('preview', 'false');




        if (_target !== undefined) {
            _target.classList.add('active__u');
        }

        //Caz a - Hover era oprit
        if (hoverSave === 'true' && clickSave === "true") {
            clientdoc.body.addEventListener('mouseover', mouseEnter);
            clientdoc.body.addEventListener('click', oneClickForAll);
        } else if (hoverSave === 'true' && clickSave === "false") {
            clientdoc.body.addEventListener('mouseover', mouseEnter);
            //They are already stopped by default
        } else if (hoverSave === 'false' && clickSave === "true") {
            clientdoc.body.addEventListener('click', oneClickForAll);
        } else {
            clientdoc.body.removeEventListener('mouseover', mouseEnter);
            clientdoc.body.removeEventListener('click', oneClickForAll);
        }


    }




    //If we are in not in preview yet, and both counters are stopped, do nothing but switch to preview



    //console.log("Hover is " +hoverSave + "; Click is " + clickSave)



    nav = $('nav');
    col2 = $('column2');

    $('column1').classList.toggle('displayNoneSuper');
    col2.classList.toggle('fullheight');
    $('column3').classList.toggle('displayNoneSuper');
    nav.classList.toggle('displayNoneSuper');

    clientdoc.body.classList.toggle('preview_class101');

    resizebuttons.classList.toggle("displayNoneSuper");
    $('resize_bar2').classList.toggle("displayNoneSuper");

    frame.classList.remove('s320', "s480", "s768", "s1366", "s1920");

    col2.classList.toggle("unshrinkCol2");

    //i also need to remove the eventlistener, or the outlining on hover
    get_iframe_wh();
    iframeDimensions.classList.toggle('displayNoneSuper');


    //get the outside click
    clientdoc.addEventListener('click', iframeClick, false)

    function iframeClick() {
        x = event.target;
    }

    $("preview-eye").classList.toggle('after_view');

    /*
        if(x.classList.contains('active__u')){ 
          
        } else {
          x.classList.add('active__u');
        }
    */
}

//Simulate click on preview() on pressing CTRL + Q in document or iFrame
function KeyPress(e) {
    var evtobj = window.event ? event : e
    if (evtobj.keyCode == 81 && evtobj.ctrlKey) {
        $("preview-eye").click();
    }

}
document.onkeydown = KeyPress;
clientdoc.onkeydown = KeyPress;


//Global tooltip function
var tooltip = document.querySelectorAll('.tooltip');

[].forEach.call(tooltip, function(el) {
    // Create tooltip element
    var tooltipText = document.createElement('div');

    // Set tooltip text
    tooltipText.textContent = el.getAttribute('data-tooltip-text');
    tooltipText.classList.add('tooltip-text');

    // Add tooltip to footer on mouse over
    el.addEventListener('mouseover', function() {
        $('footer').appendChild(tooltipText);
    }, false);

    // Remove tooltip on mouseout
    el.addEventListener('mouseout', function() {
        $('footer').removeChild(tooltipText);
    }, false);

    // Attach the tooltip to the mouse cursor
    el.addEventListener('mousemove', function(e) {
        tooltipText.style.top = (e.pageY - 50) + 'px';
        tooltipText.style.left = (e.pageX - 50) + 'px';
    }, false);

});
//class="tooltip" data-tooltip-text="Try" all you need to create a tooltip


function hide_previewbar() {
    resizebuttons.classList.toggle("displayNoneSuper");
    $('resize_bar2').classList.toggle("go_left");
    $('rotate__me').classList.toggle("down__me");
}

/*Unique class on several elements - I can rewrite this function to use in any case :)*/

resizebuttons.addEventListener("click", function(event) {
    let list = resizebuttons.querySelectorAll('i');

    for (let i = 0; i < list.length; i++) {
        if (event.target == list[i]) {

            event.target.classList.toggle("active__u");


        } else { //`Press anywhere inside parent div except the __item and it gets removed // click on other __item and removes previous`

            list[i].classList.remove("active__u");

        }
    }
});



//Screen Resizes
function s320() {
    frame.classList.toggle('s320');
    frame.classList.remove("s480", "s768", "s1366", "s1920");
    get_iframe_wh();
}

function s480() {
    frame.classList.toggle('s480');
    frame.classList.remove("s320", "s768", "s1366", "s1920");
    get_iframe_wh();
}

function s768() {
    frame.classList.toggle('s768');
    frame.classList.remove("s320", "s480", "s1366", "s1920");
    get_iframe_wh();
}

function s1366() {
    frame.classList.toggle("s1366");
    frame.classList.remove("s320", "s480", "s768", "s1920");
    get_iframe_wh();
}

function s1920() {
    frame.classList.toggle("s1920");
    frame.classList.remove("s320", "s480", "s768", "s1366");
    get_iframe_wh();
}

//End of



//Scrollbar if no Webkit browser
(function() {
    let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    let isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    let scrollbarDiv = $('#log-container'); //can also be document.querySelector('.scrollbar')
    if (!isChrome && !isSafari) {
        scrollbarDiv.innerHTML = 'You need Webkit browser to run this code';
    }
})();

//For Column1 accordion
var acc = document.getElementsByClassName("accordion");
var panel = document.getElementsByClassName('panel');
var col2 = $('column2');

for (var i = 0; i < acc.length; i++) {
    acc[i].onclick = function() {
        var setClasses = !this.classList.contains('active');
        setClass(acc, 'active', 'remove');
        setClass(panel, 'show', 'remove');

        if (setClasses) {
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
            /*Add the class when accordion is open*/
            col2.classList.add("shrinkCol2"); //this one means push $('column3') away 
            $('column3').classList.add("displayNone");
            adminButtons.classList.add("noMarginRight");

        } else {
            /*Remove the class when accordion isn't open*/
            col2.classList.remove("shrinkCol2"); //this one means push $('column3') away 
            $('column3').classList.remove("displayNone");
            adminButtons.classList.remove("noMarginRight");
        }

    }
}

function setClass(els, className, fnName) {
    for (var i = 0; i < els.length; i++) {
        els[i].classList[fnName](className);
    }
}

function hide_leftmenu() {
    $('column1').classList.toggle('displayNone');
    nav1.classList.toggle('displayNone');
}

function hide_rightmenu() {
    $('column3').classList.toggle('displayNone');
    adminButtons.classList.toggle('noMarginRight');
}





//____END - LAYOUT UI JAVASCRIPT____