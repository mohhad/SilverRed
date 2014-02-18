$(document).ready(function() {
   

    var blogImage = $('#BlogItemImage');

    if (blogImage.length > 0) {
        $('#LatestBlog > .ImageLink').click(function () {
            if (blogImage.width() == 0)
                blogImage.animate({ 'width': '190px', 'left': '-190px' });
            else
                blogImage.animate({ 'width': '0', 'left': '0' });
        });
    }
    else
    {
        $('.ImageLink').hide();
    }

    TweenMax.set($('#LatestBlog'), { scale: 0 });
    TweenMax.set($('#blogLine'), { height: 0, bottom: 0 });


    setTimeout(function () {
        TweenMax.to($('#blogLine'), 0.5, {
            height: '110px', onComplete: function () {
                TweenMax.to($('#LatestBlog'), 0.5, { scale: 1, ease: Back.easeOut });
            }
        });

    }, 2000);

	if( $('html').hasClass('lt-ie7') ) {
		$('#startScreen').hide();
		$('#chromeframe').height($(window).height());
	}
 

	$('#WhyUs').click(function () {
	    currentScreen = 1;
	    GetContent();
	});

	$('#SafetyStandards').click(function () {
	    currentScreen = 2;
	    GetContent();
	    //performScroll();
	});

	$('#OfficialSupplier').click(function () {
	    currentScreen = 3;
	    GetContent();
	    //performScroll();
	});

	$('#ContactUs').click(function () {
	    currentScreen = 4;
	    GetContent();
	    //performScroll();
	});

	//$('#ContactUsGoToTop').click(function () {
	//    alert('hello');
	//    currentScreen = 0;
	//    setupScrollHandler();
	//    performScroll();
	//});

	//$('#ContactUsGoogleMapHover').click(function () {
	//    currentScreen = 5;
	//    GetContent();
	//    //performScroll();
	//});
	
	/****************************************************************************************
	  Process Window Resizing - Delay reaction until resize complete
	 ***************************************************************************************/

	var rtime = new Date(1, 1, 2000, 12,00,00);
	var timeout = false;
	var delta = 200;
	$(window).resize(function() {
			rtime = new Date();
			if (timeout === false) {
					timeout = true;
					setTimeout(resizeend, delta);
			}
	});
	
	function resizeend() {
			if (new Date() - rtime < delta) {
					setTimeout(resizeend, delta);
			} else {
					timeout = false;
					sizeToWindow();
					performScroll(); // Reset Viewport								
			}               
	}


	$('#scrollToTop').click(function () {
	    scrollReady = false;
	    $("html,body").animate({ scrollTop: "0px" }, 2500,
		function () {
		    scrollReady = true;
		    currentScreen = 0;
		});
	    return false;
	});

	
	// Ready to go
	$(window).load(function () {
		
		// Handle IE 6
		if( !$('html').hasClass('lt-ie7') )
		{
		
			// Size Everything to Viewport
			sizeToWindow();
		
		
			// Ready for Scroll Handlers
			scrollReady = true;
			setupScrollHandler();
			setupKeyScrollHandler();
		}
	});

	var IsContactUs = getParameterByName("ContactUs");
	
	if (IsContactUs != "" && IsContactUs == 1 && IsContactUs != null)
	{
	    currentScreen = 4;
	    GetContent();
	}

	var IsWhyUs = getParameterByName("WhyUs");

	if (IsWhyUs != "" && IsWhyUs == 1 && IsWhyUs != null) {
	    currentScreen = 1;
	    GetContent();
	}

	var IsSafety = getParameterByName("SafetyStandards");

	if (IsSafety != "" && IsSafety == 1 && IsSafety != null) {
	    currentScreen = 2;
	    GetContent();
	}

	var IsSupplier = getParameterByName("OfficialSupplier");

	if (IsSupplier != "" && IsSupplier == 1 && IsSupplier != null) {
	    currentScreen = 3;
	    GetContent();
	}
});


var WhyUscurrentDiv = '#WhyUsMainDiv',
    OfficialSuppliercurrentDiv = '#OfficialSupplierMainDiv',
    SafetyStandardscurrentDiv = '#SafetyStandardsMainScreen';

var currentScreen = 0;
var scrollReady = false;
var scrollLocked = false;
var scrollDirection = 'down';
var MIN_HEIGHT = 600;
var screenHeight = $(window).height() > MIN_HEIGHT ? $(window).height() : MIN_HEIGHT;
var documentWrapWidth = 1100;
var shoeBuildLeftOffset = 190;
var shoeOffsetTop = 0;
var shoeOffsetLeft = 0;
var documentGutterWidth = (($(document).width() - documentWrapWidth) / 2);
var screenAnimationTime = 1000;
var screens = new Array('startScreen',
						 'WhyUsScreen',
                         'SafetyStandardsScreen',
                         'OfficialSupplierScreen',
                         'ContactUsScreen',
                         'GoogleMapScreen');
var WhyUsLoaded = false,
    SafetyStandardsLoaded = false,
    OfficialSupplierLoaded = false,
    ContactUsLoaded = false,
    GoogleMapLoaded = false;


function sizeToWindow() {
	
	screenHeight = (Math.ceil($(window).height()) > MIN_HEIGHT ? $(window).height() : MIN_HEIGHT) + 1;
	documentGutterWidth = ((Math.ceil($(document).width()) - documentWrapWidth) / 2);
	screenWidth = Math.ceil($(window).width());

	$('#startScreen').height(screenHeight);
	$('#WhyUsScreen').height(screenHeight);
	$('#WhyUsWideContent').height(screenHeight - $('#WhyUsScreen .WhyUsSeperator').height());
	$('#WhyUsWideContent').width(screenWidth * 5);
	$('#SafetyStandardsScreen').height(screenHeight);
	$('#OfficialSupplierScreen').height(screenHeight - $('#SafetyStandardsScreen .WhyUsSeperator').height());
	$('#ContactUsScreen').height(screenHeight);
	$('#GoogleMapScreen').height(screenHeight);
	$('#GoogleMapsContainer').height(screenHeight * 0.8);

	WhyUsgoToPosition('#WhyUsMainDiv');
	OfficialSuppliergoToPosition('#OfficialSupplierMainDiv');
	SafetyStandardsGoToPosition('#SafetyStandardsMainScreen');

	if (screenHeight > 730) {
	    var theScroller = $('#InsideMainScroll');
	    if(theScroller != '' && theScroller != undefined)
	    {
	        var element = $(theScroller).jScrollPane({ autoReinitialise: true });
	        var api = element.data('jsp');
            if(api != '' && api != undefined)
	            api.destroy();
	    }
	    theScroller = $('#InsideHowDoesScroll');
	    if(theScroller != '' && theScroller != undefined)
	    {
	        var element = $(theScroller).jScrollPane({ autoReinitialise: true });
	        var api = element.data('jsp');
	        if(api != '' && api != undefined)
	            api.destroy();
	    }	
	}
	else {
	    var theScroller = $('#InsideMainScroll');
	    if (theScroller != '' && theScroller != undefined) {
	        $(theScroller).jScrollPane({ autoReinitialise: true });
	    }

	    theScroller = $('#InsideHowDoesScroll');
	    if (theScroller != '' && theScroller != undefined) {
	        $(theScroller).jScrollPane({ autoReinitialise: true });
	    }
	}

}


function DestroyScroller() {
    var apis = [];
    if (apis.length) {
        $.each(
            apis,
            function (i) {
                this.destroy();
            }
        )
        apis = [];
    }
    return false;
}

function setupScrollHandler() {
    $("body").bind("mousewheel", function (delta, aS, aQ, deltaY) {
		delta.preventDefault();
		if (deltaY > 0) {
			scrollPrev();
		} else {
			if (deltaY < 0) {
				scrollNext();
			}
		}
		return false;
	});
}

function scrollNext() {
    if (currentScreen < screens.length - 1 && scrollReady == true) {
        scrollReady = false;
	    currentScreen++;
	    GetContent();
		//performScroll();
	}
}
function scrollPrev() {
    if (currentScreen > 0 && scrollReady == true) {
        scrollReady = false;
        currentScreen--;
        GetContent();
		//performScroll();
	}
}

var AjaxAttempts = 0;

function GetContent() {
    if (currentScreen == 1) {
        if (WhyUsLoaded)
        {
            performScroll();
        }
        else
        {
            $.ajax({
                type: "POST",
                url: "WhyUs",
                success: function (msg) {
                    $('#WhyUsScreen').append(msg);
                    WhyUsLoaded = true;
                    $(window).resize();
                    performScroll();
                    setTimeout(function () {
                        SetABoutUsMaxValues();
                        console.log('Hello');
                    }, 1000);
                },
                error: function (xhr, err) {
                    AjaxAttempts++;
                    if (AjaxAttempts >= 3) {
                        AjaxAttempts = 0;
                        location.reload();
                    }
                    else {
                        GetContent();
                    }
                }
            });
        }        
    }
    else if (currentScreen == 2) {
        if (SafetyStandardsLoaded) {
            performScroll();
        }
        else {
            $.ajax({
                type: "POST",
                url: "SafetyStandards",
                success: function (msg) {
                    $('#SafetyStandardsScreen').append(msg);
                    SafetyStandardsLoaded = true;
                    $(window).resize();
                    performScroll();                    
                },
                error: function (xhr, err) {
                    AjaxAttempts++;
                    if (AjaxAttempts >= 3) {
                        AjaxAttempts = 0;
                        location.reload();
                    }
                    else {
                        GetContent();
                    }
                }
            });
        }
    }
    else if (currentScreen == 3) {
        if (OfficialSupplierLoaded) {
            performScroll();
        }
        else {
            $.ajax({
                type: "POST",
                url: "OfficialSupplier",
                success: function (msg) {
                    $('#OfficialSupplierScreen').append(msg);
                    OfficialSupplierLoaded = true;
                    $(window).resize();
                    performScroll();
                },
                error: function (xhr, err) {
                    AjaxAttempts++;
                    if (AjaxAttempts >= 3)
                    {
                        AjaxAttempts = 0;
                        location.reload();
                    }
                    else
                    {
                        GetContent();
                    }
                }
            });
        }
    }
    else if (currentScreen == 4) {
        if (ContactUsLoaded) {
            performScroll();
        }
        else {
            $.ajax({
                type: "POST",
                url: "contactUs",
                success: function (msg) {
                    $('#ContactUsScreen').append(msg);
                    ContactUsLoaded = true;
                    $(window).resize();
                    performScroll();
                },
                error: function (xhr, err) {
                    AjaxAttempts++;
                    if (AjaxAttempts >= 3) {
                        AjaxAttempts = 0;
                        location.reload();
                    }
                    else {
                        GetContent();
                    }
                }
            });
        }
    }
    else {
        if (GoogleMapLoaded) {
            performScroll();
        }
        else {
            $.ajax({
                type: "POST",
                url: "GoogleMap",
                success: function (msg) {
                    $('#GoogleMapScreen').append(msg);
                    GoogleMapLoaded = true;
                    $(window).resize();
                    performScroll();
                },
                error: function (xhr, err) {
                    AjaxAttempts++;
                    if (AjaxAttempts >= 3) {
                        AjaxAttempts = 0;
                        location.reload();
                    }
                    else {
                        GetContent();
                    }
                }
            });
        }
    }
}

var AboutUsScrollReady = true;
var AboutUsCurrentPosition = 0,
    maxScroll;

function SetABoutUsMaxValues() {
    if ($('#LittleAboutUsImageContainer') == null)
        setTimeout(function () { SetABoutUsMaxValues(); }, 500);
    else
        maxScroll = $('#LittleAboutUsImageContainer').width() < 755 ? 915 : 305;
}

function ABoutUsScrollUp() {
    if (AboutUsScrollReady) {
       
        if (AboutUsCurrentPosition == 0)
            return;
        AboutUsScrollReady = false;
        AboutUsCurrentPosition -= 305;
        

        $('.EmployeeImage').animate({ opacity: 0 }, 100);
        $('#AboutUsImageScroller').delay(200).animate(
            { scrollTop: AboutUsCurrentPosition },
            800,
            'easeInOutExpo',
            function () {
                AboutUsScrollReady = true;
            }
        );
        $('.EmployeeImage').delay(400).animate({ opacity: 1 }, 100);

    }
}

function ABoutUsScrollDown() {
    if (AboutUsScrollReady) {
        if (AboutUsCurrentPosition >= maxScroll)
            return;
        AboutUsScrollReady = false;
        AboutUsCurrentPosition += 305;
        $('.EmployeeImage').animate({ opacity: 0 }, 100);
        $('#AboutUsImageScroller').delay(200).animate(
            { scrollTop: AboutUsCurrentPosition },
            800,
            'easeInOutExpo',
            function () {
                AboutUsScrollReady = true;
            }
        );
        $('.EmployeeImage').delay(400).animate({ opacity: 1 }, 100);
    }
}

var TestsScrollReady = true;
var TestsCurrentPosition = 0,
    TestsmaxScroll;

function SetTestsMaxValues() {
    if ($('#TestImageContainer') == null)
        setTimeout(function () { SetTestsMaxValues(); }, 500);
    else
        TestsmaxScroll = $('#TestImageContainer').width() < 755 ? 915 : 305;
}

function TestsScrollUp() {
    if (TestsScrollReady) {

        if (TestsCurrentPosition == 0)
            return;
        TestsScrollReady = false;
        TestsCurrentPosition -= 305;
        $('#TestsImageScroller').animate(
            { scrollTop: TestsCurrentPosition },
            500,
            'easeInOutExpo',
            function () {
                TestsScrollReady = true;
            }
        );
    }
}

function TestsScrollDown() {
    if (TestsScrollReady) {
        if (TestsCurrentPosition >= TestsmaxScroll)
            return;
        TestsScrollReady = false;
        TestsCurrentPosition += 305;
        $('#TestsImageScroller').animate(
            { scrollTop: TestsCurrentPosition },
            500,
            'easeInOutExpo',
            function () {
                TestsScrollReady = true;
            }
        );
    }
}

function performScroll() {
    
   
    scrollReady = false;
    $('#FullLoader').fadeIn(500);
    $('#fixedFooter').fadeOut(500);
    $('#ContactUsGoToTop').fadeOut(500).delay(1000);
	var newYPos = Math.ceil($('#'+screens[currentScreen]).offset().top);
	$("html, body").animate(
		{scrollTop: newYPos },
		screenAnimationTime,
		'easeInOutExpo',
		function () {
		    $('#FixedHeader').removeClass('noGradient')
		    if (currentScreen == 4 || currentScreen == 5) {
		        $('#fixeFooter').fadeOut(500);
		        $('#ContactUsGoToTop').fadeIn(500);
		    }
		    else {
		        $('#fixedFooter').fadeIn(500);
		    }

		    if (currentScreen == 5)
		    {
		        $('#FixedHeader').addClass('noGradient');
		        $("body").unbind("mousewheel");
		    }
		    else
		    {
		        setupScrollHandler();
		    }

		    scrollReady = true;
		    
		}
	);
	$('#FullLoader').fadeOut(500);
	
	if (currentScreen == 0){
	    $('#supersized').fadeIn();
	}
	else {
        $('#supersized').fadeOut();
	}
	
	
}
function preventScroll() {
	var newYPos = Math.ceil($('#'+screens[currentScreen]).offset().top);
	$(window).scrollTop(newYPos);
}
function setupKeyScrollHandler() {
	$(document).bind("keyup", function (event) {
		if (event.keyCode == 40 || event.keyCode == 38) {
			event.preventDefault();
			if (event.keyCode == 40) {
				if (scrollReady == true) {
					scrollNext();
				}
			} else {
				if (event.keyCode == 38) {
					if (scrollReady == true) {
						scrollPrev();
					}
				}
			}
		}
	});
	$(document).bind("keydown", function (event) {
		if (event.keyCode == 40 || event.keyCode == 38 ) {
			event.preventDefault()
		}
	})
}
function unbindKeys() {
	$(document).unbind("keyup");
	$(document).unbind("keydown");
}


/********************************************************
    Needed Script Newly written
*********************************************************/



//Why Us Page Slider
function WhyUsgoToPosition(positionDiv) {
    if (WhyUscurrentDiv == positionDiv) {
        performScroll();
        return;
    }

    var newXPos = Math.ceil($(positionDiv).offset().left);

    if (WhyUscurrentDiv == '#WhyUsQualityDiv') {
        if (positionDiv == '#WhyUsMainDiv') {
            newXPos = 0;
        }
        else if (positionDiv == '#WhyUsDesignDiv' || positionDiv == '#WhyUsComfortDiv' || positionDiv == '#LittleAboutUsDiv') {
            newXPos += $(WhyUscurrentDiv).width();
        }
    }
    else if (WhyUscurrentDiv == '#WhyUsDesignDiv') {
        if (positionDiv == '#WhyUsMainDiv') {
            newXPos = 0;
        }
        else if (positionDiv == '#WhyUsQualityDiv') {
            newXPos = Math.abs(newXPos);
        }
        else if (positionDiv == '#WhyUsComfortDiv') {
            newXPos += $(WhyUscurrentDiv).width() * 2;
        }
    }
    else if (WhyUscurrentDiv == '#WhyUsComfortDiv') {
        if (positionDiv == '#WhyUsMainDiv') {
            newXPos = 0;
        }
        else if (positionDiv == '#WhyUsQualityDiv') {
            newXPos = $(WhyUscurrentDiv).width();
        }
        else if (positionDiv == '#WhyUsDesignDiv') {
            newXPos = $(WhyUscurrentDiv).width() * 2;
        }
    }

    else if (WhyUscurrentDiv == '#LittleAboutUsDiv') {
        if (positionDiv == '#WhyUsMainDiv') {
            newXPos = 0;
        }
        else if (positionDiv == '#WhyUsQualityDiv') {
            newXPos = $('#WhyUsMainDiv').width();
        }
        else if (positionDiv == '#WhyUsDesignDiv') {
            newXPos = $('#WhyUsMainDiv').width() * 2;
        }
        else if (positionDiv == '#WhyUsComfortDiv') {
            newXPos = $('#WhyUsMainDiv').width() * 2;
        }
    }

    $('#WhyUsScreenContainer').animate({ scrollLeft: newXPos }, 900, 'easeInOutExpo');
    WhyUscurrentDiv = positionDiv;
    setNavigationButtons(WhyUscurrentDiv);
    performScroll();
}

function setNavigationButtons(CurrentPosition) {
    if (CurrentPosition == null)
        return;

    if (CurrentPosition == '#WhyUsMainDiv') {
        $('#WhyUsMain').css('display', 'none');
        $('#WhyUsQuality').css('display', 'block');
        $('#WhyUsDesign').css('display', 'block');
        $('#WhyUsComfort').css('display', 'block');
    }
    else if (CurrentPosition == '#WhyUsQualityDiv') {
        $('#WhyUsMain').css('display', 'block');
        $('#WhyUsQuality').css('display', 'none');
        $('#WhyUsDesign').css('display', 'block');
        $('#WhyUsComfort').css('display', 'block');
    }
    else if (CurrentPosition == '#WhyUsDesignDiv') {
        $('#WhyUsMain').css('display', 'block');
        $('#WhyUsQuality').css('display', 'block');
        $('#WhyUsDesign').css('display', 'none');
        $('#WhyUsComfort').css('display', 'block');
    }
    else if (CurrentPosition == '#LittleAboutUsDiv') {
        $('#WhyUsMain').css('display', 'block');
        $('#WhyUsQuality').css('display', 'block');
        $('#WhyUsDesign').css('display', 'block');
        $('#WhyUsComfort').css('display', 'block');
    }
    else {
        $('#WhyUsMain').css('display', 'block');
        $('#WhyUsQuality').css('display', 'block');
        $('#WhyUsDesign').css('display', 'block');
        $('#WhyUsComfort').css('display', 'none');
    }
}

//Official Supplier Page Slider
//

function OfficialSuppliergoToPosition(positionDiv) {

    if (OfficialSuppliercurrentDiv == positionDiv) {
        performScroll();
        return;
    }

    var newXPos = Math.ceil($(positionDiv).offset().left),
        parentLeft = Math.ceil($('#OfficialSupplierContainer').offset().left);

    if (OfficialSuppliercurrentDiv == '#OfficialSupplierHowDoesItWorkDiv') {
        if (positionDiv == '#OfficialSupplierMainDiv') {
            newXPos = 0;
        }
        else if (positionDiv == '#OfficialSupplierQualityControlDiv'
            || positionDiv == '#OfficialSupplierTestsDiv' ||
            positionDiv == '#OfficialSupplierWaxmanGroupDiv') {
            newXPos += $('#OfficialSupplierMainDiv').width();
        }
    }


    else if (OfficialSuppliercurrentDiv == '#OfficialSupplierQualityControlDiv') {
        if (positionDiv == '#OfficialSupplierMainDiv') {
            newXPos = 0;
        }
        else if (positionDiv == '#OfficialSupplierHowDoesItWorkDiv') {
            newXPos = Math.abs(newXPos) + parentLeft;
        }
        else if (positionDiv == '#OfficialSupplierTestsDiv' ||
                positionDiv == '#OfficialSupplierWaxmanGroupDiv') {
            newXPos += ($('#OfficialSupplierMainDiv').width() * 2) + 1;
        }
    }


    else if (OfficialSuppliercurrentDiv == '#OfficialSupplierTestsDiv') {
        if (positionDiv == '#OfficialSupplierMainDiv') {
            newXPos = 0;
        }
        else if (positionDiv == '#OfficialSupplierHowDoesItWorkDiv') {
            newXPos = $('#OfficialSupplierMainDiv').width();
        }
        else if (positionDiv == '#OfficialSupplierQualityControlDiv') {
            newXPos = ($('#OfficialSupplierMainDiv').width() * 2) + 5;
        }
        else if (positionDiv == '#OfficialSupplierWaxmanGroupDiv') {
            newXPos += ($('#OfficialSupplierMainDiv').width() * 3);
        }
    }

    else if (OfficialSuppliercurrentDiv == '#OfficialSupplierWaxmanGroupDiv') {
        if (positionDiv == '#OfficialSupplierMainDiv') {
            newXPos = 0;
        }
        else if (positionDiv == '#OfficialSupplierHowDoesItWorkDiv') {
            newXPos = $('#OfficialSupplierMainDiv').width();
        }
        else if (positionDiv == '#OfficialSupplierQualityControlDiv') {
            newXPos = ($('#OfficialSupplierMainDiv').width() * 2);
        }
        else if (positionDiv == '#OfficialSupplierTestsDiv') {
            newXPos += ($('#OfficialSupplierMainDiv').width() * 3);
        }
    }
    //else {
    //    newXPos -= parentLeft;
    //}


    $('#OfficialSupplierContainer').animate({ scrollLeft: newXPos }, 900, 'easeInOutExpo');
    OfficialSuppliercurrentDiv = positionDiv;
    OfficialSupplierSetNavigationButtons(OfficialSuppliercurrentDiv);
    performScroll();
}

function OfficialSupplierSetNavigationButtons(CurrentPosition) {
    if (CurrentPosition == null)
        return;

    if (CurrentPosition == '#OfficialSupplierMainDiv') {
        $('#OfficialSupplierMain').css('display', 'none');
        $('#OfficialSupplierHowDoesItWork').css('display', 'block');
        $('#OfficialSupplierQualityControl').css('display', 'block');
        $('#OfficialSupplierTests').css('display', 'block');
        $('#OfficialSupplierWaxmanGroup').css('display', 'block');
    }
    else if (CurrentPosition == '#OfficialSupplierHowDoesItWorkDiv') {
        $('#OfficialSupplierMain').css('display', 'block');
        $('#OfficialSupplierHowDoesItWork').css('display', 'none');
        $('#OfficialSupplierQualityControl').css('display', 'block');
        $('#OfficialSupplierTests').css('display', 'block');
        $('#OfficialSupplierWaxmanGroup').css('display', 'block');
    }
    else if (CurrentPosition == '#OfficialSupplierQualityControlDiv') {
        $('#OfficialSupplierMain').css('display', 'block');
        $('#OfficialSupplierHowDoesItWork').css('display', 'block');
        $('#OfficialSupplierQualityControl').css('display', 'none');
        $('#OfficialSupplierTests').css('display', 'block');
        $('#OfficialSupplierWaxmanGroup').css('display', 'block');
    }
    else if (CurrentPosition == '#OfficialSupplierTestsDiv') {
        $('#OfficialSupplierMain').css('display', 'block');
        $('#OfficialSupplierHowDoesItWork').css('display', 'block');
        $('#OfficialSupplierQualityControl').css('display', 'block');
        $('#OfficialSupplierTests').css('display', 'none');
        $('#OfficialSupplierWaxmanGroup').css('display', 'block');
    }
        else  {
        $('#OfficialSupplierMain').css('display', 'block');
        $('#OfficialSupplierHowDoesItWork').css('display', 'block');
        $('#OfficialSupplierQualityControl').css('display', 'block');
        $('#OfficialSupplierTests').css('display', 'block');
        $('#OfficialSupplierWaxmanGroup').css('display', 'none');
    }
}





function SafetyStandardsGoToPosition(positionDiv) {

    if (SafetyStandardscurrentDiv == positionDiv) {
        performScroll();
        return;
    }

    var newXPos = Math.ceil($(positionDiv).offset().left);
    if (SafetyStandardscurrentDiv == '#SafetyStandardsWorkWearScreen') {
        if (positionDiv == '#SafetyStandardsMainScreen') {
            newXPos = 0;
        }
        else {
            newXPos += $(SafetyStandardscurrentDiv).width();
        }
    }
    else if (SafetyStandardscurrentDiv == '#SafetyStandardsFootWearScreen') {
        if (positionDiv == '#SafetyStandardsMainScreen') {
            newXPos = 0;
        }
        else {
            newXPos = Math.abs(newXPos);
        }
    }
    
    $('#SafetyStandardsContainer').animate({ scrollLeft: newXPos }, 900, 'easeInOutExpo');
    SafetyStandardscurrentDiv = positionDiv;
    SafetyStandardsSetNavigationButtons(SafetyStandardscurrentDiv);
    performScroll();
}

function SafetyStandardsSetNavigationButtons(CurrentPosition) {
    if (CurrentPosition == null)
        return;

    if (CurrentPosition == '#SafetyStandardsMainScreen') {
        $('#SafetyStandardsMain').css('display', 'none');
        $('#SafetyStandardsWorkWear').css('display', 'block');
        $('#SafetyStandardsFootWear').css('display', 'block');
    }
    else if (CurrentPosition == '#SafetyStandardsWorkWearScreen') {
        $('#SafetyStandardsMain').css('display', 'block');
        $('#SafetyStandardsWorkWear').css('display', 'none');
        $('#SafetyStandardsFootWear').css('display', 'block');
    }
    else {
        $('#SafetyStandardsMain').css('display', 'block');
        $('#SafetyStandardsWorkWear').css('display', 'block');
        $('#SafetyStandardsFootWear').css('display', 'none ');
    }
}






function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

