define('HiViPage', [
    'jquery',
    'Overlay',
    'amplify',
    'helper'
], function ($, Overlay, amplify, helper) {
    var HiViPage;

    HiViPage = {
        isDone:
           false,

        CurrentTab:
            'Primary',

        SelectedOb:
            '',

        SelectedColor:
            '',

        SelectedFrom:
            'Primary',

        SelectedPlacement:
            '',

        isLegElement:
            false,

        usedID:
            '',




        PrimaryID:
            '',

        SecondaryID:
            '',

        LegElement1:
            '',

        LegElement2:
            '',

        enter: function () {



            $('#HiViIco .StepIcoHover').addClass('activeIco');


            $('#HiViText .isDoneIcon').addClass('isCurrentPage');

            $('#HiVi').fadeIn(function () {
                $(".tabs li").attr("id", "");
                $(".SubContent .InnerContent").hide();
                $("#HiVIFirst").parent().attr("id", "current");
                $('#' + $('#HiVIFirst').attr('title')).fadeIn();
                helper.setTheTabs();
            });

            $('#HiViTabs .tabs li a').click(function () {
                HiViPage.CurrentTab = $(this).parent().attr('title');
            });

            $('#HiViNextBack .Next').click(function () {
                HiViPage.next();
            });

            $('#HiViNextBack .Back').click(function () {
                HiViPage.back();
            });

            $('.question').click(function () {
                $('#my_modal').popup({
                    'autoopen': true
                });
            });

            $('.HiViCheckbox').change(function () {
                if (HiViPage.SelectedFrom != '' && HiViPage.SelectedFrom != HiViPage.CurrentTab)
                    if (!confirm('This will overwrite the selection you made from the ' + HiViPage.SelectedFrom + ' tab.')) {
                        $(this).prop('checked', false);
                        return;
                    }
                    else {
                        $(HiViPage.SelectedOb).val('-1');
                        $('#colorPreview').css('background-color', '');
                        $('.HiViPlacementItem2').children('.InnerHiviText').children('.css-checkbox').each(function () {
                            $(this)[0].checked = false;
                        });
                        HiViPage.SelectedPlacement = '';
                        $('#LegCheckbox2').css('background', 'url(../img/Customizer/PageNotDone.png) no-repeat');
                        HiViPage.isLegElement = false;
                    }

                HiViPage.SelectedOb = this;
                HiViPage.SelectedFrom = 'Primary';
                HiViPage.SelectedColor = $(this).val();
                HiViPage.AlterSVG(HiViPage.SelectedColor, $(HiViPage.SelectedPlacement).attr('value'));
                HiViPage.AlterSVG(HiViPage.SelectedColor, 'Leg');
            });

            $('#SecondaryColor').change(function () {
                if (HiViPage.SelectedFrom != '' && HiViPage.SelectedOb != '' && HiViPage.SelectedFrom != HiViPage.CurrentTab)
                    if (!confirm('This will overwrite the selection you made from the ' + HiViPage.SelectedFrom + ' tab.')) {
                        $(this).val('-1');

                        return;
                    }
                    else {
                        $(HiViPage.SelectedOb).prop('checked', false);
                        $('.HiViPlacementItem1').children('.InnerHiviText').children('.css-checkbox').each(function () {
                            $(this)[0].checked = false;
                        });
                        HiViPage.SelectedPlacement = '';
                        $('#LegCheckbox1').css('background', 'url(../img/Customizer/PageNotDone.png) no-repeat');
                        HiViPage.isLegElement = false;
                    }

                $('#colorPreview').css('background-color', $(this).val());
                HiViPage.SelectedOb = this;
                HiViPage.SelectedFrom = 'Secondary';
                HiViPage.SelectedColor = $(this).val();
                HiViPage.AlterSVG(HiViPage.SelectedColor, $(HiViPage.SelectedPlacement).attr('value'));
                HiViPage.AlterSVG(HiViPage.SelectedColor, 'Leg');
            });

            $('.HiViPlacementItem1').click(function () {

                $('.HiViPlacementItem1').children('.InnerHiviText').children('.css-checkbox').each(function () {
                    $(this)[0].checked = false;
                });

                if (HiViPage.SelectedFrom != 'Primary' && HiViPage.SelectedColor != '') {
                    alert('You have already selected from the secondary tab. Please select a color above to replace that selection.');
                    return;
                }



                if ($(this).attr('value') == '') {
                    $(this).children('.InnerHiviText').children('.css-checkbox')[0].checked = true;
                    HiViPage.SelectedPlacement = this;

                    $('#LegCheckbox1').css('background', 'url(../img/Customizer/PageNotDone.png) no-repeat');
                    HiViPage.isLegElement = false;
                    HiViPage.AlterSVG('', '');
                }
                else if (HiViPage.SelectedColor != '') {
                    $(this).children('.InnerHiviText').children('.css-checkbox')[0].checked = true;
                    HiViPage.SelectedPlacement = this;
                    HiViPage.AlterSVG(HiViPage.SelectedColor, $(HiViPage.SelectedPlacement).attr('value'));
                }
                else {
                    alert('Please select a HIVI color.');
                }
            });

            $('.HiViPlacementItem2').click(function () {
                $('.HiViPlacementItem2').children('.InnerHiviText').children('.css-checkbox').each(function () {
                    $(this)[0].checked = false;
                });

                if (HiViPage.SelectedFrom != 'Secondary' && HiViPage.SelectedColor != '') {
                    alert('You already selected from the primary tab. Please select a color above to replace that selection.');
                    return;
                }


                else if (HiViPage.SelectedColor != '') {
                    $(this).children('.InnerHiviText').children('.css-checkbox')[0].checked = true;
                    HiViPage.SelectedPlacement = this;


                    HiViPage.AlterSVG(HiViPage.SelectedColor, $(HiViPage.SelectedPlacement).attr('value'));
                }
                else {
                    alert('Please select a HIVI color.');
                }
            });

            $('#ClickableLeg1').click(function () {
                if (HiViPage.SelectedFrom != 'Primary' && HiViPage.SelectedColor != '') {
                    alert('You already selected from the secondary tab. Please select a color above to replace that selection.');
                    return;
                }
                if (HiViPage.SelectedColor == '') {
                    alert('Please select a color.');
                    return;
                }



                if (!HiViPage.isLegElement) {
                    $('#LegCheckbox1').css('background', 'url(../img/Customizer/PageisDone.png) no-repeat');
                    HiViPage.isLegElement = true;
                }
                else {
                    $('#LegCheckbox1').css('background', 'url(../img/Customizer/PageNotDone.png) no-repeat');
                    HiViPage.isLegElement = false;
                }
                HiViPage.AlterSVG(HiViPage.SelectedColor, 'Leg');
            });

            $('#ClickableLeg2').click(function () {
                if (HiViPage.SelectedFrom != 'Secondary' && HiViPage.SelectedColor != '') {
                    alert('You already selected from the primary tab. Please select a color above to replace that selection.');
                    return;
                }
                if (HiViPage.SelectedColor == '') {
                    alert('Please select a color.');
                    return;
                }

                if (!HiViPage.isLegElement) {
                    $('#LegCheckbox2').css('background', 'url(../img/Customizer/PageisDone.png) no-repeat');
                    HiViPage.isLegElement = true;
                }
                else {
                    $('#LegCheckbox2').css('background', 'url(../img/Customizer/PageNotDone.png) no-repeat');
                    HiViPage.isLegElement = false;
                }
                HiViPage.AlterSVG(HiViPage.SelectedColor, 'Leg');
            });

            $('li a[title="HiViColorTab"]').click(function () {
                HiViPage.AnimateHIVI();
            });

            $('li a[title="HiViSecondaryTab"]').click(function () {
                HiViPage.AnimateSecondary();
            });

            this.UpdateSectionText();
            $('li a[title="HiViColorTab"]').click();

            $('#HiviPrimScroller').jScrollPane({ autoReinitialise: true });
            $('#HiviSecondScroller').jScrollPane({ autoReinitialise: true });
        },

        saveUpdateColorForPockets: function (color, svgDoc) {
            amplify.store('pocketColor', color);

            if (amplify.store('selectedPocket') != '') {
                var elements = svgDoc.querySelectorAll('#' + amplify.store('selectedPocket') + ' > g');
                for (var i = 0; i < elements[0].childNodes.length; i++) {
                    if (elements[0].childNodes[i].style != null)
                        elements[0].childNodes[i].style.fill = color == '' ? (amplify.store('Color') != '' ? amplify.store('Color').color : 'rgb(193, 180, 150)') : color;
                }

            }
           
        },
        saveUpdateColorForArmPockets: function (color, svgDoc) {
            amplify.store('armPocketColor', color);

            if (amplify.store('selectedArmPocket') != '') {
                var elements = svgDoc.querySelectorAll('#' + amplify.store('selectedArmPocket') + ' > g');
                for (var i = 0; i < elements[0].childNodes.length; i++) {
                    if (elements[0].childNodes[i].style != null)
                        elements[0].childNodes[i].style.fill = color == '' ? (amplify.store('Color') != '' ? amplify.store('Color').color : 'rgb(193, 180, 150)') : color;
                }

            }
        },

        AnimateHIVI: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            window.tl.set($('.AnyHiVIHeader1'), { 'scale': '0' })
            window.tl.set($('.HIVIVolorItem1'), { 'scale': '0' })
            window.tl.set($('.HiViPlacementItem1'), { 'scale': '0', 'width': '0' })
            window.tl.set($('#LegElement1'), { 'scale': '0' })
            window.tl.set($('#LegElementPrim1'), { 'scale': '0' })

            .staggerTo($('.AnyHiVIHeader1'), 0.2, { 'scale': '1' }, 0.8, 1 + timeShift)
            .staggerTo($('.HIVIVolorItem1'), 0.5, { 'scale': '1' }, 0.4, 1.1 + timeShift)
            .staggerTo($('.HiViPlacementItem1'), 0.5, { 'scale': '1', 'width': '206px' }, 0.2, 1.5 + timeShift)
            .staggerTo($('#LegElement1'), 0.5, { 'scale': '1' }, 0.2, 3.8 + timeShift)
            .staggerTo($('#LegElementPrim1'), 0.5, { 'scale': '1' }, 0.2, 4 + timeShift)

            window.tl.seek(0);
            window.tl.play();
        },

        AnimateSecondary: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            window.tl.set($('.AnyHiVIHeader2'), { 'scale': '0' })
            window.tl.set($('.HiVISecondaryDD'), { 'scale': '0' })
            window.tl.set($('.HiViPlacementItem2'), { 'scale': '0', 'width': '0' })
            window.tl.set($('#LegElement2'), { 'scale': '0' })
            //window.tl.set($('#LegElementSecond2'), { 'scale': '0' })

            .staggerTo($('.AnyHiVIHeader2'), 0.2, { 'scale': '1' }, 0.8, 1 + timeShift)
            .staggerTo($('.HiVISecondaryDD'), 0.5, { 'scale': '1' }, 0.4, 1.1 + timeShift)
            .staggerTo($('.HiViPlacementItem2'), 0.5, { 'scale': '1', 'width': '206px' }, 0.2, 1.5 + timeShift)
            .staggerTo($('#LegElement2'), 0.5, { 'scale': '1' }, 0.2, 3 + timeShift)
            //.staggerTo($('#LegElementSecond2'), 0.5, { 'scale': '1' }, 0.2, 3 + timeShift)

            window.tl.seek(0);
            window.tl.play();
        },

        next: function () {
            this.SaveHiViSelection();
            this.OnNext();
        },

        back: function () {
            this.SaveHiViSelection();
            this.OnBack();
        },

        SaveHiViSelection: function () {

            if (this.SelectedOb == '' && this.SelectedPlacement == '')
                this.isDone = false;



            else if ($(this.SelectedPlacement).attr('value') == '') {
                var HIVI = {
                    color: this.SelectedOb == '' ? 'none' : $(this.SelectedOb).val(),
                    Placement: 'none',
                    isLegElement: this.isLegElement,
                    selectedFrom: this.SelectedFrom
                };
                amplify.store('HIVI', HIVI);
                this.isDone = true;
            }
            else {
                var HIVI = {
                    color: $(this.SelectedOb).val(),
                    Placement: $(this.SelectedPlacement).attr('data-text'),
                    isLegElement: this.isLegElement,
                    selectedFrom: this.SelectedFrom
                };

                amplify.store('HIVI', HIVI);
                this.isDone = true;
            }


            helper.updateProgress('HiViText', this.isDone);
            helper.RemoveNextBackHandlers();
            this.removeMiscHandlers();
        },

        removeMiscHandlers: function () {
            $('#HiViYellow1').unbind('change');
            $('#HiViOrange1').unbind('change');
            $('#SecondaryColor').unbind('change');
            $('#HiViTabs .tabs li a').unbind('click');
            $('.HiViPlacementItem1').unbind('click');
            $('.HiViPlacementItem2').unbind('click');
            $('#ClickableLeg1').unbind('click');
            $('#ClickableLeg2').unbind('click');
            $('.question').unbind('click');
            $('li a[title="HiViColorTab"]').unbind('click');
            $('li a[title="HiViSecondaryTab"]').unbind('click');
        },

        AlterSVG: function (theColor, theID) {
            var a = document.getElementById("theSVG");
            var svgDoc = a.contentDocument;


            if (theColor == '' || theColor == undefined || theID == '' || theID == undefined) {
                var allElements = svgDoc.querySelectorAll("#Hi_Vi > g");
                for (var i = 0; i < allElements.length; i++)
                    if (allElements[i].style != null)
                        allElements[i].style.display = 'none';
                HiViPage.saveUpdateColorForPockets('', svgDoc);
                HiViPage.saveUpdateColorForArmPockets('', svgDoc);
                HiViPage.usedID = '';
                return;
            }


            if (theID == 'Leg') {
                if (!HiViPage.isLegElement) {
                    svgDoc.getElementById('Leg').style.display = 'none';
                    return;
                }
            }
            else {
                if (HiViPage.usedID != '')
                    svgDoc.getElementById(HiViPage.usedID).style.display = 'none';
                HiViPage.usedID = theID;
            }

            var theElement = svgDoc.getElementById(theID);

            theElement.style.display = 'inline';
            if ($(HiViPage.SelectedPlacement).attr('data-Chest') == 'Y')
                HiViPage.saveUpdateColorForPockets(theColor, svgDoc);
            else
                HiViPage.saveUpdateColorForPockets('', svgDoc);

            if ($(HiViPage.SelectedPlacement).attr('data-Arm') == 'Y')
                HiViPage.saveUpdateColorForArmPockets(theColor, svgDoc);
            else
                HiViPage.saveUpdateColorForArmPockets('', svgDoc);

            var needFilling = svgDoc.querySelectorAll("#" + theID + " > g")[0].childNodes;
            for (var i = 0; i < needFilling.length; i++) {
                if (needFilling[i].style != null) {
                    needFilling[i].style.fill = theColor;
                }
            }
        },

        UpdateSectionText: function () {
            $('#StepsFootHeader').text('SELECT HI VISUALS')
            $('#StepsFootBody').text("THE ONLY HI VISUAL RETARDANT FABRIC IN THE MARKET. USE IT TO ENHANCE THE VISIBILITY OF YOUR GARMENTS IN A VERY DURABLE WAY.")
        }
    }

    return HiViPage;
});

