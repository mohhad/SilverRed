var SelectedMainCat = 'male';

var BlackImages = [],
    ColoredImages = [];


$('#MaleCategory').click(function () {
    resetSubCats();
    if (SelectedMainCat != 'male') {
        $('#MaleSubCatItemsContainer').fadeOut(1500);
        $('.whiteLineHorizontalFemale').fadeOut(1500, function () {
            $('#FemaleCategory').css('background', 'url(../../img/SilverRed/Product-Page_Female-Icon.png)');
            $('.whiteLineHorizontalMale').delay(500).fadeIn(1500);
            $('#MaleSubCatItemsContainer').delay(500).fadeIn(1500, function () {
                $('#MaleCategory').css('background', 'url(../../img/SilverRed/Product-Page_Male-Icon-Highlight.png)');
            });
        });
    }
    $('#ProductImages').html('');
    $('#ProductOverviewMain').css('display', 'none');
    SelectedMainCat = 'male'
});

$('#FemaleCategory').click(function () {
    resetSubCats();
    if (SelectedMainCat != 'female') {
        $('#MaleSubCatItemsContainer').fadeOut(1500);
        $('.whiteLineHorizontalMale').fadeOut(1500, function () {
            $('#MaleCategory').css('background', 'url(../../img/SilverRed/Product-Page_Male-Icon.png)');
            $('.whiteLineHorizontalFemale').delay(500).fadeIn(1500);
            $('#MaleSubCatItemsContainer').delay(500).fadeIn(1500, function () {
                $('#FemaleCategory').css('background', 'url(../../img/SilverRed/Product-Page_Female-Icon-Highlight.png)');
            });
        });
    }
    $('#ProductImages').html('');
    $('#ProductOverviewMain').css('display', 'none');
    SelectedMainCat = 'female'
   
});



$(document).ready(function () {
    $('#MaleCategory').css('background', 'url(../../img/SilverRed/Product-Page_Male-Icon-Highlight.png)');
    $('#Coveralls').click();
    $('#OilGas').click();
});





$('#Jackets').click(function () {
    resetSubCats();
    $('#Jackets .ProdIcon').css('background', 'url(../../img/SilverRed/Products-Jacket-Icon-Highlight.png) no-repeat scroll center center transparent');
    if (SelectedMainCat == 'male')
        GetProduct(1191);
    else
        GetProduct(1213);
});

$('#Coveralls').click(function () {
    resetSubCats();
    $('#Coveralls .ProdIcon').css('background', 'url("../../img/SilverRed/Product-Page_Coverall-Icon-Highlight.png") no-repeat scroll center center transparent');
    //var coverall = $('#CoverallLine');

    //function First(next) {
    //    coverall.removeClass("CoverallLineFirstStage");
    //    coverall.addClass("CoverallLineFull").delay(1000);
    //    next();
    //}

    //function Second(next) {
    //    $('#SharedLine').removeClass("SharedLineFirst");
    //    $('#SharedLine').addClass("SharedLineFinal");
    //}

    //coverall.removeClass('CoverallLineNone');
    //coverall.addClass("CoverallLineFirstStage").delay(1000).queue(First).delay(1000).queue(Second);
 
       
    if (SelectedMainCat == 'male')
        GetProduct(1192);
    else
        GetProduct(1214);
});


$('#Shirts').click(function () {
    resetSubCats();
    $('#Shirts .ProdIcon').css('background', 'url(../../img/SilverRed/Product-Page_Jackets-and-Pants-Icon-Highlight.png) no-repeat scroll center center transparent');
    if (SelectedMainCat == 'male')
        GetProduct(1193);
    else
        GetProduct(1215);
});

$('#Pants').click(function () {
    resetSubCats();
    $('#Pants .ProdIcon').css('background', 'url(../../img/SilverRed/Product-Page_Jackets-and-Pants-Icon-Highlight.png) no-repeat scroll center center transparent');
    if (SelectedMainCat == 'male')
        GetProduct(1195);
    else
        GetProduct(1217);
});

$('#Winter').click(function () {
    resetSubCats();
    $('#Winter .ProdIcon').css('background', 'url(../../img/SilverRed/Product-Page_Winter-Icon-Highlight.png) no-repeat scroll center center transparent');

    if (SelectedMainCat == 'male')
        GetProduct(1194);
    else
        GetProduct(1216);
    
});

$('#OilGas').click(function () {
    resetSubCats();
    $('#OilGas .ProdIcon').css('background', 'url(../../img/SilverRed/Oil-Gas-Icon-Highlight.png) no-repeat scroll center center transparent');

    if (SelectedMainCat == 'male')
        GetProduct(1302);
    //else
    //    GetProduct(3333);

});

$('#General').click(function () {
    resetSubCats();
    $('#General .ProdIcon').css('background', 'url(../../img/SilverRed/General-Icon-Highlight.png) no-repeat scroll center center transparent');

    if (SelectedMainCat == 'male')
        GetProduct(1303);
    //else
    //    GetProduct(3333);

});


function resetSubCats() {
    $('#Coveralls .ProdIcon').css('background', 'url("../../img/SilverRed/Product-Page_Coverall-Icon.png") no-repeat scroll center center transparent');
    $('#Jackets .ProdIcon').css('background', 'url(../../img/SilverRed/Products-Jacket-Icon-No-Highlight.png) no-repeat scroll center center transparent');
    $('#Shirts .ProdIcon').css('background', 'url(../../img/SilverRed/Product-Page_Shirts-Icon.png) no-repeat scroll center center transparent');
    $('#Pants .ProdIcon').css('background', 'url(../../img/SilverRed/Product-Page_Jackets-and-Pants-Icon.png) no-repeat scroll center center transparent');
    $('#Winter .ProdIcon').css('background', 'url(../../img/SilverRed/Product-Page_Winter-Icon.png) no-repeat scroll center center transparent');

    $('#OilGas .ProdIcon').css('background', 'url(../../img/SilverRed/Oil-Gas-Icon-No-Highlight.png) no-repeat scroll center center transparent');
    $('#General .ProdIcon').css('background', 'url(../../img/SilverRed/General-Icon-No-Highlight.png) no-repeat scroll center center transparent');
}


function GetProduct(SubCatID) {
    $('#ProductOverviewMain').css('display', 'none');
        $.ajax({
        type: "GET",
        url:  "/" + SubCatID,
        error: function (xhr, status, error) {
            alert("Sorry something went wrong!");
        },
        success: function (response) {
            var IntroductionHeader = '',
                IndtroductionBody = '',
                ProdInfoHeader = '',
                ProdInfoBody = '';
            $('#ProductImages').html('');

            response.forEach(function (element, index, array) {
                
                    var HTMLContent = '',
                    ProdID = element.ProductID,
                    BlackPreview = element.BlackPreview,
                    ColoredPreview1 = element.ColoredPreviews[0],
                    ColoredPreview2 = element.ColoredPreviews[1],
                    ColoredPreview3 = element.ColoredPreviews[2],
                    ProductNumb = element.ProductNumber,
                    FullImage1 = element.FullScreens[0],
                    FullImage2 = element.FullScreens[1],
                    FullImage3 = element.FullScreens[2];

                    HTMLContent += '<div class="ExpandableProduct" id="' + ProdID + '"><div class="Opac"></div><div class="LargeContainer">';
                    HTMLContent += '<div class="ProductImage fresco" href="..' + FullImage1 + '" id="' + ProdID + '1" style="background: url(..' + ColoredPreview1 + ') 0 0 no-repeat; background-position:center; background-size: cover; transition: 0.5s all linear;"><div class="SeeFullScreen"></div></div>';
                    
                    HTMLContent += '<div class="ProductImage fresco" href="..' + FullImage2 + '" id="' + ProdID + '2" style="background: url(..' + ColoredPreview2 + ') 0 0 no-repeat; background-position:center; background-size: cover;"><div class="SeeFullScreen"></div></div>';
                    HTMLContent += '<div class="ProductImage fresco" href="..' + FullImage3 + '" id="' + ProdID + '3" style="background: url(..' + ColoredPreview3 + ') 0 0 no-repeat; background-position:center; background-size: cover;"><div class="SeeFullScreen"></div></div>';
                //HTMLContent += '<div class="ProductImage" id="' + ProdID + '4" style="background: url(..' + ProductNumbImage + ') 0 0 no-repeat; background-position:center; background-size: cover;"></div>';
                    HTMLContent += '<div class="ProductImage" id="' + ProdID + '4" style="background: url(../img/Silverred/ItemNumber.jpg ) 0 0 no-repeat; background-position:center; background-size: cover;"><div class="theNumber">' + ProductNumb + '</div></div>';
                    HTMLContent += '</div></div>';

                    BlackImages[index] = BlackPreview;
                    ColoredImages[index] = ColoredPreview1;
                    $('#ProductImages').append(HTMLContent);
                    //SetBinders(ProdID, ColoredPreview1, BlackPreview);

                   
                    //lightbox('<img src="" />');

                    var Elements = $("#" + ProdID);
                    $(Elements).click(function () {
                        if (Elements.css('width') <= '280px') {
                            $('#ProductImages').children('div').each(function (index) {
                                $(this).css('width', '280px');
                                $(this).css('height', '157px');                                
                                $('#' + this.id + ' .Opac').fadeIn();
                                $('.SeeFullScreen').unbind('mouseover mouseout click');
                            });

                            GetProductOverview(ProdID);


                            Elements.animate({ 'width': '571px' }, 500).delay(100).animate({ 'height': '316px' }, 600);
                            $('#' + ProdID + ' .Opac').fadeOut();
                            
                            
                            $('#' + ProdID + '1').css('background-image', 'url(..' + ColoredPreview1 + ')');

                            $('#' + ProdID + '1 .SeeFullScreen').mouseover(function () {
                                $('#' + ProdID + '1 .SeeFullScreen').css('background', 'url(../img/SilverRed/ViewFullScreen.png) no-repeat scroll center center transparent');
                            });
                            $('#' + ProdID + '1 .SeeFullScreen').mouseout(function () {
                                $('#' + ProdID + '1 .SeeFullScreen').css('background', 'url() no-repeat');
                            });

                         

                            $('#' + ProdID + '2 .SeeFullScreen').mouseover(function () {
                                $('#' + ProdID + '2 .SeeFullScreen').css('background', 'url(../img/SilverRed/ViewFullScreen.png) no-repeat scroll center center  transparent');
                            });
                            $('#' + ProdID + '2 .SeeFullScreen').mouseout(function () {
                                $('#' + ProdID + '2 .SeeFullScreen').css('background', 'url() no-repeat');
                            });

                            $('#' + ProdID + '3 .SeeFullScreen').mouseover(function () {
                                $('#' + ProdID + '3 .SeeFullScreen').css('background', 'url(../img/SilverRed/ViewFullScreen.png) no-repeat scroll center center  transparent');
                            });
                            $('#' + ProdID + '3 .SeeFullScreen').mouseout(function () {
                                $('#' + ProdID + '3 .SeeFullScreen').css('background', 'url() no-repeat');
                            });

                            
                        }
                    });
                //}
            });
            

            

        }
    });
}




function GetProductOverview(ProdId) {
    
    $.ajax({
        type: "GET",
        url: "/" + ProdId,
        error: function (xhr, status, error) {
            alert("Sorry something went wrong!");
        },
        success: function (response) {
            response.forEach(function (element, index, array) {
                if (element.ProdInfo != null) {
                    prodName = element.ProdInfo[0],
                    prodDesc = element.ProdInfo[1];
                    productFeatures = element.ProdInfo[2],
                    //ProdInfoBody = element.ProdInfo[3];
                    //CategoryID = element.ProdInfo[4]

                    $('#ProductOverviewMain').css('display', 'block');
                    $("#IntroBody").html('');
                    $("#ProdFeatures").html('');
                    $("#ProductOverviewTitleContainer").html('');

                    $("#ProductOverviewTitleContainer").append(prodName);
                    $("#IntroBody").append(prodDesc);
                    $("#ProdFeatures").append(productFeatures);

                }
            })
        }
    });
}

function SetBinders(ProdID, ColoredPreview, BlackPreview)
{
    $('#' + ProdID).mouseenter(function () {
        if ($('#' + ProdID).css('width') <= '280px')
            $('#' + ProdID + '1').css('background-image', 'url(..' + ColoredPreview + ')');
    });
    $('#' + ProdID).mouseout(function () {
        $('#' + ProdID + '1').css('background-image', 'url(..' + BlackPreview + ')');
    });
}

