define('FinishPage', [
        'jquery',
        'amplify',
        'helper'
], function ($, amplify, helper) {
    var FinishPage;

    FinishPage = {
        isDone:
            false,

        Sample:
            false,

        OrderedSizes:
            0,

        addedControls:
            1,

        previous:
            '',

        firstTimeAccess:
            true,

        logoDataURL:
            '',

        hasLogo:
            false,

        enter: function () {

            //$('#theSVG').css('visibility', 'hidden');

            $('#FinishIco .StepIcoHover').addClass('activeIco');

            $('#FinishText .isDoneIcon').addClass('isCurrentPage');

            $('#Finish').fadeIn(function () {
                $(".tabs li").attr("id", "");
                $(".SubContent .InnerContent").hide();
                $("#FinishFirst").parent().attr("id", "current");
                $('#' + $('#FinishFirst').attr('title')).fadeIn();
                helper.setTheTabs();
            });

            $('#Finish').fadeIn(function () {
                $('#UploadLogo').removeClass('dontDisplay');
            });

            $('#Logo').change(function () {
                $(this).css('border', 'none');
                FinishPage.ReadImage(this);
            });


            $('.Order').focus(function () {
                if ($(this).val() == -1)
                    FinishPage.OrderedSizes++;
                FinishPage.previous = $(this).val();

            }).change(function () {
                if (amplify.store('theProduct') == 'Coverall')
                    FinishPage.HandleSizes(false, FinishPage.previous);
                else
                    FinishPage.HandleSizes(true, FinishPage.previous);
                FinishPage.OrderedSizes = 1;
            });

            $('.finishCheckBox').click(function () {


                if ($(this).attr('id') == 'Sample') {
                    if (!FinishPage.Sample)
                        $(this).css('background', 'url(../img/Customizer/PageisDone.png) no-repeat');
                    else
                        $(this).css('background', 'url(../img/Customizer/PageNotDone.png) no-repeat');
                    FinishPage.Sample = !FinishPage.Sample;
                }
            });

            $('.DarkTextBox').click(function () {
                $(this).parent().css('background-color', 'transparent');
                $(this).css('color', '#BBBDBF')
                $(this).siblings('.asterid').css('background-color', 'transparent');

                $(this).val('');
            });

            $('.DarkTextBox').blur(function () {
                if ($(this).val() == null || $(this).val() == '') {
                    $(this).val($(this).attr('title'))
                }
                var currentDate = new Date();

                if (($(this).attr('title') == 'Mobile' || $(this).attr('title') == 'Landline') && /\D/.test($(this).val()) == true) {
                    $(this).val($(this).attr('title'));
                }
                else if ($(this).attr('title') == 'E-Mail ID') {
                    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

                    if (!filter.test($(this).val())) {
                        $(this).parent().css('background-color', '#919395');
                        $(this).css('color', '#FFFFFF')
                        $(this).siblings('.asterid').css('background-color', 'red');
                        $(this).val('Email Not Valid');
                    }
                }
                else if (($(this).attr('title') == 'DD' || $(this).attr('title') == 'MM' || $(this).attr('title') == 'YYYY' || $(this).attr('title') == 'Approximate Quantity') && /\D/.test($(this).val()) == true) {
                    $(this).val($(this).attr('title'));
                }
                else if ($(this).attr('title') == 'DD' && ($(this).val() > 31 || $(this).val() <= 0)) {
                    $(this).val($(this).attr('title'));
                }
                else if ($(this).attr('title') == 'MM' && ($(this).val() > 12 || $(this).val() <= 0)) {
                    $(this).val($(this).attr('title'));
                }
                else if ($(this).attr('title') == 'YYYY' && ($(this).val() > 9999 || $(this).val() < currentDate.getFullYear())) {
                    $(this).val($(this).attr('title'));
                }
            });

            $('#finishButton').click(function () {

                var inputGroup = $('.DarkTextBox'),
                    UploadedLogo = $('#Logo'),
                    isDone = true;

                inputGroup.each(function () {

                    if (($(this).attr('title') == 'Full Name' || $(this).attr('title') == 'Company Name' || $(this).attr('title') == 'Mobile' || $(this).attr('title') == 'E-Mail ID' || $(this).attr('title') == 'Delivery Address') && ($(this).val() == $(this).attr('title') || $(this).val() == '')) {
                        $(this).parent().css('background-color', '#919395');
                        $(this).css('color', '#FFFFFF')
                        $(this).siblings('.asterid').css('background-color', 'red');
                        isDone = false;
                    }
                });


                if (isDone) {
                    var AllSections = $('.isDoneIcon'),
                        AlertString = 'The following sections are not completed yet:\n';
                    AllSections.each(function () {

                        if (!$(this).hasClass('isDone') && $(this).attr('title') != undefined) {
                            AlertString += '- ' + $(this).attr('title') + '.\n';
                            isDone = false;
                        }
                    });

                    if (!isDone)
                        alert(AlertString);
                }







                //if (isDone) {
                //    if (LogoSelection != 'none') {
                //        var LogoImage = $('#preview');
                //        if (LogoImage.attr('src') == '' || LogoImage.attr('src') == undefined) {
                //            isDone = false;
                //            alert('Please upload a logo image or select none in the logo section.');
                //        }
                //    }
                //    else {
                //        LogoDataURL = 'none';
                //    }
                //}

                isDone = true;
                if (isDone) {
                    $('#FullLoader').fadeIn();

                    var svg = document.getElementById('theSVG').contentDocument;

                    var Elements = svg.querySelectorAll('#Shadows');
                    if (Element != '' && Element != null && Element != undefined)
                        FinishPage.removeUnwanted(Elements);

                    Elements = svg.querySelectorAll('#Hi_Vi > g');
                    FinishPage.removeUnwanted(Elements);

                    Elements = svg.querySelectorAll('#Reflectors_1_inch > g');
                    FinishPage.removeUnwanted(Elements);

                    Elements = svg.querySelectorAll('#Reflectors_2_inch > g');
                    FinishPage.removeUnwanted(Elements);

                    Elements = svg.querySelectorAll('#Reflectors_2_inch_Yellow > g');
                    FinishPage.removeUnwanted(Elements);

                    Elements = svg.querySelectorAll('#Pockets > g');
                    FinishPage.removeUnwanted(Elements);

                    Elements = svg.querySelectorAll('#Optionals > g');
                    FinishPage.removeUnwanted(Elements);

                    Elements = svg.querySelectorAll('#Logos > g');
                    FinishPage.removeUnwanted(Elements);



                    var s = new XMLSerializer();
                    var xml = s.serializeToString(svg);
                    var canvas = new fabric.Canvas('canvas');
                    canvas.setHeight(3000);
                    canvas.setWidth(3000);

                    fabric.loadSVGFromString(xml, function (objects, options) {

                        var loadedObject = fabric.util.groupSVGElements(objects, options);
                        loadedObject.set({
                            left: 1500,
                            top: 1500,
                            angle: 0,
                            padding: 0
                        });

                        canvas.add(loadedObject);
                        if (!fabric.Canvas.supports('toDataURL')) {
                            alert('This browser does not support this customizer technology. Please try to use another updated browser.');
                            location.href = '/';
                        }
                        else {

                            var dataURLString = canvas.toDataURL('png');
                            $('.canvas-container').remove();


                            var UserDetails = {
                                FullName: $("input[title='Full Name']").val(),
                                CompanyName: $("input[title='Company Name']").val(),
                                Mobile: $("input[title='Mobile']").val(),
                                LandLine: ($("input[title='Landline']").val() == null || $("input[title='Landline']").val() == 'Landline') ? '' : $("input[title='Landline']").val(),
                                Email: $("input[title='E-Mail ID']").val(),
                                DeliverAddress: $("input[title='Delivery Address']").val(),
                                City: ($("input[title='City']").val() == null || $("input[title='City']").val() == 'City') ? '' : $("input[title='City']").val(),
                                Country: ($("select[title='Country']").val() == 0) ? '' : $("select[title='Country'] option:selected").text(),
                                DeliveryDate: $('#DayText').val() == 'Date' ? '' : $('#DayText').val(),
                                Comments: $('#CommentsText').val() == 'Comments' ? '' : $('#CommentsText').val(),
                                Sample: FinishPage.Sample,
                                hasLogo: FinishPage.hasLogo
                            };

                            //var UserDetails = {
                            //    FullName: 'Mohammad Hadla',
                            //    CompanyName: 'Robotandspark',
                            //    Mobile: '0500500011',
                            //    LandLine: '044361278',
                            //    Email: 'Test@veryBgDomainNameReally.com',
                            //    DeliverAddress: 'That place',
                            //    City: 'Some City',
                            //    Country: 'Some country',
                            //    DeliveryDate: 'The Rough Date',
                            //    Comments: 'You gotta hand it toi this guy taking alot of his time to write a big ass comments that no body is going to read. :P Just kidding, someone will give a damn.',
                            //    Sample: true,
                            //    theProduct: amplify.store('theProduct')
                            //    };


                            var Fabric = amplify.store('Fabric');
                            var Color = amplify.store('Color');
                            var HiVi = amplify.store('HIVI');
                            var Reflectors = amplify.store('reflectors');
                            var Pockets = amplify.store('Pockets');
                            var Optionals = amplify.store('optionals');
                            var Logo = amplify.store('Logo');
                            var OrderDetails = {};



                            if (FinishPage.OrderedSizes > 0) {

                                if (amplify.store('theProduct') == 'Coverall') {
                                    var orderedSizes = new Array(FinishPage.OrderedSizes),
                                    orderedQuatities = new Array(FinishPage.OrderedSizes);


                                    for (var i = 0; i <= FinishPage.OrderedSizes - 1; i++) {
                                        if ($($('#Draggables1 select')[i]).val() == '-1' || $($('#Draggables1 input')[i]).val() == 0)
                                            continue;

                                        orderedSizes[i] = $($('#Draggables1 select')[i]).val();
                                        orderedQuatities[i] = $($('#Draggables1 input')[i]).val();
                                    }



                                    OrderDetails = {
                                        orderedSizes: orderedSizes,
                                        orderedQuatities: orderedQuatities
                                    };
                                }
                                else {
                                    var orderedPantSizes = new Array(FinishPage.OrderedSizes),
                                        orderedUpperSizes = new Array(FinishPage.OrderedSizes),
                                        orderedPantQuatities = new Array(FinishPage.OrderedSizes),
                                        orderedUpperQuatities = new Array(FinishPage.OrderedSizes);


                                    for (var i = 0; i <= FinishPage.OrderedSizes - 1; i++) {
                                        if ($($('#Draggables1 select')[i]).val() == '-1' || $($('#Draggables1 input')[i]).val() == 0)
                                            continue;

                                        if ($($('#Draggables2 select')[i]).val() == '-1' || $($('#Draggables2 input')[i]).val() == 0)
                                            continue;

                                        orderedPantSizes[i] = $($('#Draggables1 select')[i]).val();
                                        orderedUpperSizes[i] = $($('#Draggables2 select')[i]).val();
                                        orderedPantQuatities[i] = $($('#Draggables1 input')[i]).val();
                                        orderedUpperQuatities[i] = $($('#Draggables2 input')[i]).val();
                                    }



                                    OrderDetails = {
                                        orderedPantSizes: orderedPantSizes,
                                        orderedUpperSizes: orderedUpperSizes,
                                        orderedPantQuatities: orderedPantQuatities,
                                        orderedUpperQuatities: orderedUpperQuatities
                                    };
                                }
                            };


                            var LogoDataURL = '';

                            if ($('#Logo')[0].files[0] != "" && FinishPage.logoDataURL != '') {

                                LogoDataURL = FinishPage.logoDataURL;

                                FinishPage.CreatePDF(
                                   UserDetails,
                                   OrderDetails,
                                   Fabric,
                                   Color,
                                   HiVi,
                                   Reflectors,
                                   Pockets,
                                   Optionals,
                                   Logo,
                                   dataURLString,
                                   LogoDataURL);
                                //}
                            }
                            else {
                                LogoDataURL = 'none';
                                FinishPage.CreatePDF(
                                       UserDetails,
                                       OrderDetails,
                                       Fabric,
                                       Color,
                                       HiVi,
                                       Reflectors,
                                       Pockets,
                                       Optionals,
                                       Logo,
                                       dataURLString,
                                       LogoDataURL);
                            }

                        }

                    });
                }


            });


            var AppendedText = [
                        '<div class="DraggerSection">',
                            '<div class="textBoxContainer OrderTextBox">',
                                '<section class="DropDownContainer">',
                                    '<div class="dropdown dropdown-dark" style="background: none;">',
                                        '<select class="dropdown-select Order" title="Approximate Quantity" style="color: #BBBDBF; font-size: 14px; padding: 3px 0 0;">',
                                            '<option value="-1" selected disabled="disabled">Size</option>',
                                            '<option value="XS">XS</option>',
                                            '<option value="S">S</option>',
                                            '<option value="M">M</option>',
                                            '<option value="L">L</option>',
                                            '<option value="XL">XL</option>',
                                            '<option value="XXL">2XL</option>',
                                            '<option value="XXXL">3XL</option>',
                                            '<option value="XXXXL">4XL</option>',
                                            '<option value="XXXXXL">5XL</option>',
                                        '</select>',
                                    '</div>',
                                '</section>',
                            '</div>',
                            '<input type="text" data-slider="true" data-slider-range="0, 1000">',
                        '</div>'
            ].join("");

            if (amplify.store('theProduct') == 'JacketsPants' || amplify.store('theProduct') == 'ShirtsPants') {
                var text = amplify.store('theProduct') == 'JacketsPants' ? 'Jacket' : 'Shirt';
                $('#OrdersShirtsPants').text(text);
                $('.CombinedOrder').fadeIn();
                $("#moreOrders").click(function () {
                    FinishPage.addedControls++;
                    $('#Draggables1').append(AppendedText);
                    $('#Draggables2').append(AppendedText);

                    FinishPage.ExexuteRangeSliders();
                    FinishPage.OrderedSizes++;

                    $('.Order').unbind();
                    $('.Order').focus(function () {
                        if ($(this).val() == -1)
                            //FinishPage.OrderedSizes++;
                            FinishPage.previous = $(this).val();
                    }).change(function () {
                        FinishPage.HandleSizes(true, FinishPage.previous, this);
                    });

                    FinishPage.HandleSizes(true, null, null);
                    if (FinishPage.addedControls == 4)
                        $('#OrdersTab').jScrollPane({ autoReinitialise: true });
                    if (FinishPage.addedControls == 9)
                        $('#moreOrders').fadeOut();
                });
            }
            else {
                $('.CombinedOrder').fadeOut();
                $('.CombinedOrder').html('');
                $("#moreOrders").click(function () {


                    $('#Draggables1').append(AppendedText);

                    FinishPage.ExexuteRangeSliders();
                    FinishPage.addedControls++;
                    //FinishPage.OrderedSizes++;

                    $('.Order').unbind();
                    $('.Order').focus(function () {
                        if ($(this).val() == -1)
                            FinishPage.OrderedSizes++;
                        FinishPage.previous = $(this).val();
                    }).change(function () {
                        FinishPage.HandleSizes(false, FinishPage.previous, this);
                    });

                    FinishPage.HandleSizes(false, null, null);
                    if (FinishPage.addedControls == 7)
                        $('#OrdersTab').jScrollPane({ autoReinitialise: true });
                    if (FinishPage.addedControls == 9)
                        $('#moreOrders').fadeOut();
                });
            }

            $("#DayText").datepicker({ minDate: 1 });

            if (this.firstTimeAccess) {
                $("[data-slider]")
               .each(function () {
                   var input = $(this);
                   $("<span>")
                    .addClass("output")
                    .insertAfter($(this));
               })
               .bind("slider:ready slider:changed", function (event, data) {
                   $(this)
                     .nextAll(".output:first")
                 .html(data.value.toFixed(0));
               });
                this.firstTimeAccess = false;
            }
            else
                FinishPage.ExexuteRangeSliders();

            this.UpdateSectionText();
        },

        removeUnwanted: function (Elements) {
            Array.prototype.forEach.call(Elements, function (node) {
                if (node.style.display != 'inline')
                    node.parentNode.removeChild(node);
            });
        },

        ExexuteRangeSliders: function () {
            $("[data-slider]")
                .each(function () {
                    var input = $(this);
                    if ($(this).css('display') != 'none') {
                        $("<span>")
                            .addClass("output")
                            .insertAfter($(this));
                        $(this).simpleSlider({
                            range: [0, 1000],
                            step: 5
                        });
                    }
                })
                .bind("slider:ready slider:changed", function (event, data) {
                    $(this)
                      .nextAll(".output:first")
                  .html(data.value.toFixed(0));
                });
        },

        HandleSizes: function (isCombined, previous, DD) {
            if (isCombined) {
                var cat = '';
                if (DD != undefined && DD != '' && DD != null) {
                    cat = $(DD).parent().parent().parent().parent().parent()[0].id;
                }

                if (cat != '') {
                    if (previous != '' && previous != null && previous != undefined && previous != -1) {
                        $('#' + cat + ' .Order option[value=' + previous + ']').prop('disabled', false);
                    }

                    var selectedSizes = new Array();
                    var i = 0;
                    $('#' + cat + ' .Order').each(function () {
                        if ($(this).val() != '-1') {
                            selectedSizes[i] = $(this).val();
                            i++;
                        }
                    });

                    for (var i = 0; i < selectedSizes.length; i++) {
                        $('#' + cat + ' .Order option[value=' + selectedSizes[i] + ']').prop('disabled', true);
                    }
                }
                else {
                    var selectedSizes = new Array();
                    var i = 0;
                    $('#Draggables1 .Order').each(function () {
                        if ($(this).val() != '-1') {
                            selectedSizes[i] = $(this).val();
                            i++;
                        }
                    });

                    for (var i = 0; i < selectedSizes.length; i++) {
                        $('#Draggables1 .Order option[value=' + selectedSizes[i] + ']').prop('disabled', true);
                    }

                    selectedSizes = new Array();
                    i = 0;
                    $('#Draggables2 .Order').each(function () {
                        if ($(this).val() != '-1') {
                            selectedSizes[i] = $(this).val();
                            i++;
                        }
                    });

                    for (var i = 0; i < selectedSizes.length; i++) {
                        $('#Draggables2 .Order option[value=' + selectedSizes[i] + ']').prop('disabled', true);
                    }
                }


            }
            else {

                if (previous != '' && previous != null && previous != undefined && previous != -1) {
                    $('#Draggables1 .Order option[value=' + previous + ']').prop('disabled', false);
                }

                var selectedSizes = new Array();
                var i = 0;
                $('#Draggables1 .Order').each(function () {
                    if ($(this).val() != '-1') {
                        selectedSizes[i] = $(this).val();
                        i++;
                    }
                });

                for (var i = 0; i < selectedSizes.length; i++) {
                    $('#Draggables1 .Order option[value=' + selectedSizes[i] + ']').prop('disabled', true);
                }
            }
        },

        Animate: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            window.tl.set($('.textBoxContainer'), { 'scale': '0' })
            window.tl.set($('.AnyFinishHeader'), { 'scale': '0' })
            window.tl.set($('.AnyFinishText'), { 'scale': '0' })
            window.tl.set($('.CheckContainer'), { 'scale': '0' })
            window.tl.set($('#UploadLogo'), { 'scale': '0' })
            window.tl.set($('#UploadLogoTab'), { 'scale': '0' })
            window.tl.set($('#LogoUploader'), { 'scale': '0' })
            window.tl.set($('#finishButton'), { 'scale': '0' })

            .staggerTo($('.textBoxContainer'), 0.3, { 'scale': '1' }, 0.2, 1 + timeShift)
            .staggerTo($('.AnyFinishHeader'), 0.3, { 'scale': '1' }, 0.2, 2 + timeShift)
            .staggerTo($('.AnyFinishText'), 0.3, { 'scale': '1' }, 0.2, 2.2 + timeShift)
            .staggerTo($('.CheckContainer'), 0.3, { 'scale': '1' }, 0.2, 2.4 + timeShift)
            .staggerTo($('#UploadLogo'), 0.5, { 'scale': '1' }, 0, 2.4 + timeShift)
            .staggerTo($('#UploadLogoTab'), 0.5, { 'scale': '1' }, 0, 3 + timeShift)
            .staggerTo($('#LogoUploader'), 0.5, { 'scale': '1' }, 0, 3 + timeShift)
            .staggerTo($('#finishButton'), 0.5, { 'scale': '1' }, 0, 3.4 + timeShift)

            window.tl.seek(0);
            window.tl.play();
        },

        SaveFinishEntries: function () {
            this.RemoveMiscHandlers();
            //$('#UploadLogo').addClass('dontDisplay');
        },

        RemoveMiscHandlers: function () {
            $('.finishCheckBox').unbind('click');
            $('#Logo').unbind('change');
            $('.DarkTextBox').unbind('click');
            $('.DarkTextBox').unbind('blur');
            $('#finishButton').unbind('click');
            $("#moreOrders").unbind('click');
        },

        ReadImage: function (input) {
            try {
                var file = input.files[0];
                var reader = new FileReader();

                reader.onloadend = function () {
                    FinishPage.logoDataURL = reader.result;
                }

                if (file) {
                    reader.readAsDataURL(file);
                    FinishPage.hasLogo = true;
                    $('#LogoName').html(file.name);
                }
                else {
                    FinishPage.logoDataURL = '';
                    FinishPage.hasLogo = false;
                    $('#LogoName').html("Choose a File");
                }
            }
            catch (err) {

            }

        },

        CreatePDF: function (
            UserDetails,
            OrderDetails,
            Fabric,
            Color,
            HiVi,
            Reflectors,
            Pockets,
            Optionals,
            Logo,
            ImageDataURL,
            LogoDataURL) {


            var currentProcessObj = $('#FullLoader > div > p');

            currentProcessObj.text('We are uploading your customized product image...');
            currentProcessObj.parent().show();
            $.ajax({
                type: "POST",
                url: "UserControls/PDFEmailer.asmx/createImage",
                data: { ImageDataURL: ImageDataURL },
                success: function (msg) {
                    currentProcessObj.text('We are uploading your logo...');
                    $.ajax({
                        type: "POST",
                        url: "UserControls/PDFEmailer.asmx/CreateLogo",
                        data: { LogoDataURl: LogoDataURL },
                        success: function (msg) {
                            currentProcessObj.text('We are creating your handy PDF booklet...');
                            var Details = {
                                UserDetails: UserDetails,
                                OrderDetails: OrderDetails,
                                Fabric: Fabric,
                                Color: Color,
                                HiVi: HiVi,
                                Reflectors: Reflectors,
                                Pockets: Pockets,
                                Optionals: Optionals,
                                Logo: Logo
                            };
                            Details = JSON.stringify(Details);
                            $.ajax({
                                type: "POST",
                                url: "UserControls/PDFEmailer.asmx/createPDF",
                                data: Details,
                                dataType: "json",
                                contentType: "application/json",
                                success: function (msg) {
                                    currentProcessObj.text('We are emailing you...');
                                    $.ajax({
                                        type: "POST",
                                        url: "UserControls/PDFEmailer.asmx/SendMail",
                                        data: Details,
                                        dataType: "json",
                                        contentType: "application/json",
                                        success: function (msg) {
                                            alert('All done. A representative will be contacting you very soon regarding your order.');
                                            location.href = '/';
                                        },
                                        error: function (xhr, err) {
                                            alert("Sorry. There was an issue with emailing you!");
                                            $('#FullLoader').fadeOut();
                                            currentProcessObj.text('');
                                            currentProcessObj.parent().hide();
                                        }
                                    });
                                },
                                error: function (xhr, err) {
                                    alert("Sorry. There was a problem with creating your PDF booklet.");                                    
                                    $('#FullLoader').fadeOut();
                                    currentProcessObj.text('');
                                    currentProcessObj.parent().hide();
                                }
                            });
                        },
                        error: function (xhr, err) {
                            alert("Sorry. There was an issue with uploading your logo.");
                            $('#FullLoader').fadeOut();
                            currentProcessObj.text('');
                            currentProcessObj.parent().hide();
                        }
                    });
                },
                error: function (xhr, err) {
                    alert("Sorry. There was an issue with uploading the customized product.");                    
                    $('#FullLoader').fadeOut();
                    currentProcessObj.text('');
                    currentProcessObj.parent().hide();
                }
            });






            //var Details = {
            //    UserDetails: UserDetails,
            //    OrderDetails: OrderDetails,
            //    Fabric: Fabric,
            //    Color: Color,
            //    HiVi: HiVi,
            //    Reflectors: Reflectors,
            //    Pockets: Pockets,
            //    Optionals: Optionals,
            //    Logo: Logo,

            //    LogoDataURl: LogoDataURL
            //};
            //Details = JSON.stringify(Details);

            //$.ajax({
            //    type: "POST",
            //    url: "UserControls/PDFEmailer.asmx/createPDF",
            //    dataType: "json",
            //    contentType: "application/json",
            //    data: Details,
            //    success: function (msg) {
            //        alert('Your customized product has been requested');
            //        location.href = "/";
            //    },
            //    error: function (xhr, err) {
            //        alert("Sorry. We will be up and running soon.");
            //        location.href = "/";
            //    }
            //});
















            //var Details = {
            //    UserDetails: UserDetails,
            //    OrderDetails: OrderDetails,
            //    Fabric: Fabric,
            //    Color: Color,
            //    HiVi: HiVi,
            //    Reflectors: Reflectors,
            //    Pockets: Pockets,
            //    Optionals: Optionals,
            //    Logo: Logo,
            //    ImageDataURL: ImageDataURL,
            //    LogoDataURl: LogoDataURL
            //};
            //Details = JSON.stringify(Details);

            //$.ajax({
            //    type: "POST",
            //    url: "UserControls/PDFEmailer.asmx/createPDF",
            //    dataType: "json",
            //    contentType: "application/json",
            //    data: Details,
            //    success: function (msg) {
            //        alert('Your customized product has been requested');
            //        location.href = "/";
            //    },
            //    error: function (xhr, err) {
            //        alert("Sorry. We will be up and running soon.");
            //        location.href = "/";
            //    }
            //});

        },

        UpdateSectionText: function () {
            $('#StepsFootHeader').text('FINISH')
            $('#StepsFootBody').text("FOR A MORE ACCURATE QUOTE, PLEASE PROVIDE US WITH AS MUCH INFORMATION AS POSSIBLE.")
        }
    }

    return FinishPage;
});
