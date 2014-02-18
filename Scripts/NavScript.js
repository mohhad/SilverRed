
$(document).ready(function () {
    PerformResize();

    $('#StandardProdLine').mouseenter(function () {
        $('#StandardProdLine .HexagonLine').css('background', 'url(../img/ProductNavigation/Red-Line.png)');
        $('#StandardHexFade').css('opacity', '1');        
    });

    $('#StandardProdLine').mouseleave(function () {
        $('#StandardProdLine .HexagonLine').css('background', 'url(../img/ProductNavigation/White-Line.png)');
        $('#StandardHexFade').css('opacity', '0');
    });

    $('#CustomizerProd').mouseenter(function () {
        $('#CustomizerProd .HexagonLine').css('background', 'url(../img/ProductNavigation/Red-Line.png)');
        $('#CustomizerHexFade').css('opacity', '1');
    });

    $('#CustomizerProd').mouseleave(function () {
        $('#CustomizerProd .HexagonLine').css('background', 'url(../img/ProductNavigation/White-Line.png)');
        $('#CustomizerHexFade').css('opacity', '0');
    });



    $('#Clothing').mouseenter(function () {
        $('#Clothing .HexagonLine').css('background', 'url(../img/ProductNavigation/Red-Line.png)');
        $('#ClothingHexFade').css('opacity', '1');
    });

    $('#Clothing').mouseleave(function () {
        $('#Clothing .HexagonLine').css('background', 'url(../img/ProductNavigation/White-Line.png)');
        $('#ClothingHexFade').css('opacity', '0');
    });

    $('#Shoes').mouseenter(function () {
        $('#Shoes .HexagonLine').css('background', 'url(../img/ProductNavigation/Red-Line.png)');
        $('#ShoesHexFade').css('opacity', '1');
    });

    $('#Shoes').mouseleave(function () {
        $('#Shoes .HexagonLine').css('background', 'url(../img/ProductNavigation/White-Line.png)');
        $('#ShoesHexFade').css('opacity', '0');
    });

    $('.HoverEffect').mouseenter(function () {
        $(this).css('opacity', 1);
        var theIcon = $(this).attr('value');
        $('#' + theIcon).css('opacity', 1);
    });

    $('.HoverEffect').mouseleave(function () {
        $(this).css('opacity', 0);
        var theIcon = $(this).attr('value');
        $('#' + theIcon).css('opacity', 0);
    });

    $('.CustFooterItem').mouseenter(function () {
        $(this).find(".hoverer").css('opacity', 1);
        var theElement = $(this).attr('value');
        $('#' + theElement).css('opacity', 1);
    });

    $('.CustFooterItem').mouseleave(function () {
        $(this).find(".hoverer").css('opacity', 0);
        var theElement = $(this).attr('value');
        $('#' + theElement).css('opacity', 0);
    });
});


var rtime = new Date(1, 1, 2000, 12, 00, 00);
var timeout = false;
var delta = 200;
$(window).resize(function () {
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
        PerformResize(); // Reset Viewport								
    }
}

function PerformResize(){
    var BrowserHeight = $(window).height();
    $('#StandardProdLine').height(BrowserHeight - 85);
    $('#CustomizerProd').height(BrowserHeight - 85);
    $('#Clothing').height(BrowserHeight - 85);
    $('#Shoes').height(BrowserHeight - 85);
    $('#StandardHover').height(BrowserHeight - 85);
    $('#CustomizerHover').height(BrowserHeight - 85);
    $('#ClothingHover').height(BrowserHeight - 85);
    $('#ShoesHover').height(BrowserHeight - 85);
 
    $('.HexagonLine').css('top', $('.ProdNavHover').height() / 2);
    $('.hexfirst').css('top', ($('#StandardProdLine').height() / 2) - ($('.hexfirst').height() / 2));
    $('.hexfirst').css('left', ($('#StandardProdLine').width() / 2) - ($('.hexfirst').width() / 2));

    $('.hexSecond').css('top', ($('#Clothing').height() / 2) - ($('.hexSecond').height() / 2));
    $('.hexSecond').css('left', ($('#Clothing').width() / 2) - ($('.hexSecond').width() / 2));

    $('#CustNavContainer').height(BrowserHeight - 178);
    $('#LinkContainer').height(BrowserHeight - 333);
    $('#ShirtsPantsClick').height(BrowserHeight - 333);
    $('#ShirtsPantsHover').height(BrowserHeight - 333);
    $('#JacketsPantsClick').height(BrowserHeight - 333);
    $('#JacketsPantsHover').height(BrowserHeight - 333);
    $('#CoverallClick').height(BrowserHeight - 333);
    $('#CoverallHover').height(BrowserHeight - 333);
    $('#WinterJacketClick').height(BrowserHeight - 333);
    $('#WinterJacketHover').height(BrowserHeight - 333);

}

function GoToSecondpage() {
    $('#ProdNavContainer').fadeOut(1500, function () {
       
        $('#ProdShoesContainer').fadeIn(1500, function () {
            
        });
        PerformResize();
    });
}

