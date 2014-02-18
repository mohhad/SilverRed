define('PocketsPage', [
    'jquery',
    'amplify',
    'Scroller',
    'helper'
], function ($, amplify, Scroller, helper) {
    var PocketsPage;

    PocketsPage = {
        isDone:
           false,

        CurrentTab:
           'Body',

        BodyClosing:
            '',

        CargoClosing:
            '',

        BackPocketClosing:
            '',

        bodyPlacement:
            '',

        armsPlacement:
            '',

        cargoPlacement:
            '',

        backPocketPlacement:
            '',

        selectedBodyPocket:
            '',

        selectedArmPocket:
            '',

        selectedCargoPocket:
            '',

        selectedBackPocket:
            '',

        enter: function () {

            this.CurrentTab = 'Body';

            $('#PocketsIco .StepIcoHover').addClass('activeIco');

            //helper.removeAllCurrentPages();
            this.CurrentTab = 'Body';
            $('#PocketsText .isDoneIcon').addClass('isCurrentPage');
            $('#Pockets').fadeIn(function () {
                $(".tabs li").attr("id", "");
                $(".SubContent .InnerContent").hide();
                $("#PocketsFirst").parent().attr("id", "current");
                $('#' + $('#PocketsFirst').attr('title')).fadeIn();
                helper.setTheTabs();
            });

            $('#PocketsNextBack .Next').click(function () {
                PocketsPage.next();
            });

            $('#PocketsNextBack .Back').click(function () {
                PocketsPage.back();
            });

            $('#PocketsTabs .tabs li a').click(function () {
                PocketsPage.CurrentTab = $(this).parent().attr('title');
            });

            $('#BodyClosing').change(function () {
                PocketsPage.BodyClosing = $(this).val();
                
                PocketsPage.AlterSVG(PocketsPage.selectedBodyPocket, $(PocketsPage.bodyPlacement).attr('data-Closing'), PocketsPage.BodyClosing, '');
            });

            $('#LegsCargoClosing').change(function () {
                PocketsPage.CargoClosing = $(this).val();
                PocketsPage.AlterSVG(PocketsPage.selectedCargoPocket, $(PocketsPage.cargoPlacement).attr('data-Closing'), PocketsPage.CargoClosing, 'Cargo');
            });

            $('#LegsBackClosing').change(function () {
                PocketsPage.BackPocketClosing = $(this).val();
                PocketsPage.AlterSVG(PocketsPage.selectedBackPocket, $(PocketsPage.backPocketPlacement).attr('data-Closing'), PocketsPage.BackPocketClosing, 'Back');
            });

            $('li a[title="PocketsBodyTab"]').click(function () {
                PocketsPage.AnimateBody();
            });

            $('li a[title="PocketsArmsTab"]').click(function () {
                PocketsPage.AnimateArms();
            });

            $('li a[title="PocketsLegsTab"]').click(function () {
                PocketsPage.AnimateLegs();
            });
            
            $('.PocketsPlacementItem').click(function () {

                if (PocketsPage.CurrentTab == 'Body') {
                    $('.BodyPocketItem').children('.InnerPocketsText').children('.css-checkbox').each(function () {
                        $(this)[0].checked = false;
                    });

                    if ($(this).attr('value') == 'none') {
                        PocketsPage.bodyPlacement = this;
                        $(this).children('.InnerPocketsText').children('.css-checkbox')[0].checked = true;
                        PocketsPage.AlterSVG($(this).attr('value'), $(this).attr('data-Closing'), PocketsPage.BodyClosing, '');
                    }
                    else {
                        if($(this).attr('data-Closing') == 'No'){
                            PocketsPage.bodyPlacement = this;
                            $(this).children('.InnerPocketsText').children('.css-checkbox')[0].checked = true;
                            PocketsPage.AlterSVG($(this).attr('value'), $(this).attr('data-Closing'), '', '');
                        }
                        else if (PocketsPage.BodyClosing != '') {
                            PocketsPage.bodyPlacement = this;
                            $(this).children('.InnerPocketsText').children('.css-checkbox')[0].checked = true;
                            PocketsPage.AlterSVG($(this).attr('value'), $(this).attr('data-Closing'), PocketsPage.BodyClosing, '');
                        }
                        else
                        {                        
                            alert('Please select a closing type.');
                            if (PocketsPage.bodyPlacement != undefined && PocketsPage.bodyPlacement != '')
                                $(PocketsPage.bodyPlacement).children('.InnerPocketsText').children('.css-checkbox')[0].checked = true;
                        }
                    }
                }
                else if (PocketsPage.CurrentTab == 'Arms') {
                    $('.ArmsPocketItem').children('.InnerPocketsText').children('.css-checkbox').each(function () {
                        $(this)[0].checked = false;
                    });

                    PocketsPage.armsPlacement = this;
                    $(this).children('.InnerPocketsText').children('.css-checkbox')[0].checked = true;
                    PocketsPage.AlterSVG($(this).attr('value'), $(this).attr('data-Closing'), $(this).attr('data-Closing'), '');

                }

                else{
                    if ($(this).hasClass('LegsCargoPocketItem')) {
                        $('.LegsCargoPocketItem').children('.InnerPocketsText').children('.css-checkbox').each(function () {
                            $(this)[0].checked = false;
                        });

                        if ($(this).attr('value') == 'none') {
                            PocketsPage.cargoPlacement = this;
                            $(this).children('.InnerPocketsText').children('.css-checkbox')[0].checked = true;
                            PocketsPage.AlterSVG($(this).attr('value'), $(this).attr('data-Closing'), PocketsPage.CargoClosing, 'Cargo');
                        }
                        else{
                            if($(this).attr('data-Closing') == 'No'){
                                PocketsPage.cargoPlacement = this;
                                $(this).children('.InnerPocketsText').children('.css-checkbox')[0].checked = true;
                                PocketsPage.AlterSVG($(this).attr('value'), $(this).attr('data-Closing'), '', 'Cargo');
                            }
                            else if (PocketsPage.CargoClosing != '') {
                                PocketsPage.cargoPlacement = this;
                                $(this).children('.InnerPocketsText').children('.css-checkbox')[0].checked = true;
                                PocketsPage.AlterSVG($(this).attr('value'), $(this).attr('data-Closing'), PocketsPage.CargoClosing, 'Cargo');
                            }
                            else {
                                alert('Please select a closing type.');
                            }
                        }

                    }
                    else{
                        $('.LegsBackPocketItem').children('.InnerPocketsText').children('.css-checkbox').each(function () {
                            $(this)[0].checked = false;
                        });

                        if ($(this).attr('value') == 'none') {
                            PocketsPage.backPocketPlacement = this;
                            $(this).children('.InnerPocketsText').children('.css-checkbox')[0].checked = true;
                            PocketsPage.AlterSVG($(this).attr('value'), $(this).attr('data-Closing'), PocketsPage.BackPocketClosing, 'Back');
                        }
                        else
                        {
                            if($(this).attr('data-Closing') == 'No'){
                                PocketsPage.backPocketPlacement = this;
                                $(this).children('.InnerPocketsText').children('.css-checkbox')[0].checked = true;
                                PocketsPage.AlterSVG($(this).attr('value'), $(this).attr('data-Closing'), '', 'Back');
                            }
                            else if (PocketsPage.BackPocketClosing != '') {
                                PocketsPage.backPocketPlacement = this;
                                $(this).children('.InnerPocketsText').children('.css-checkbox')[0].checked = true;
                                PocketsPage.AlterSVG($(this).attr('value'), $(this).attr('data-Closing'), PocketsPage.BackPocketClosing, 'Back');
                            }
                            else {
                                alert('Please select a closing type.');
                            }
                        }                       
                    }
                }
            });
                        
            $('#PocketsLegsTab .ScrollerDiv').jScrollPane({ autoReinitialise: true });
            $('#PocketsBodyScroll').jScrollPane({ autoReinitialise: true });

            this.UpdateSectionText();
            this.AnimateBody();
        },

        AnimateBody: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            window.tl.set($('.AnyHeaderPockets1'), { 'scale': '0' })
            window.tl.set($('.AnyPocketText'), { 'scale': '0' })
            window.tl.set($('.pocketDD1'), { 'scale': '0' })
            window.tl.set($('.pocketItem1'), { 'scale': '0' })
            window.tl.set($('#PocketsBodyNone'), { 'scale': '0' })

            .staggerTo($('.AnyHeaderPockets1'), 0.3, { 'scale': '1' }, 0.2, 1 + timeShift)
            .staggerTo($('.AnyPocketText'), 0.3, { 'scale': '1' }, 0.2, 1.1 + timeShift)
            .staggerTo($('.pocketDD1'), 0.3, { 'scale': '1' }, 0.2, 1.2 + timeShift)
            .staggerTo($('.pocketItem1'), 0.5, { 'scale': '1' }, 0.2, 1.4 + timeShift)
            .staggerTo($('#PocketsBodyNone'), 0.5, { 'scale': '1' }, 0.2, 1.8 + timeShift)

            window.tl.seek(0);
            window.tl.play();
        },

        AnimateArms: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            window.tl.set($('.AnyHeaderPockets2'), { 'scale': '0' })
            window.tl.set($('.AnyPocketText2'), { 'scale': '0' })
            window.tl.set($('.pocketDD2'), { 'scale': '0' })
            window.tl.set($('.pocketItem2'), { 'scale': '0' })
            window.tl.set($('#PocketsArmsNone'), { 'scale': '0' })

            .staggerTo($('.AnyHeaderPockets2'), 0.3, { 'scale': '1' }, 0.2, 1 + timeShift)
            .staggerTo($('.AnyPocketText2'), 0.3, { 'scale': '1' }, 0.2, 1.1 + timeShift)
            .staggerTo($('.pocketDD2'), 0.3, { 'scale': '1' }, 0.2, 1.2 + timeShift)
            .staggerTo($('.pocketItem2'), 0.5, { 'scale': '1' }, 0.2, 1.4 + timeShift)
            .staggerTo($('#PocketsArmsNone'), 0.5, { 'scale': '1' }, 0.2, 1.8 + timeShift)

            window.tl.seek(0);
            window.tl.play();
        },

        AnimateLegs: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            window.tl.set($('.AnyHeaderPockets3'), { 'scale': '0' })
            window.tl.set($('.AnyPocketText3'), { 'scale': '0' })
            window.tl.set($('.pocketDD3'), { 'scale': '0' })
            window.tl.set($('.pocketItem3'), { 'scale': '0' })
            window.tl.set($('#CargoPocketNone'), { 'scale': '0' })
            window.tl.set($('#BackPocketNone'), { 'scale': '0' })

            .staggerTo($('.AnyHeaderPockets3'), 0.3, { 'scale': '1' }, 0.2, 1 + timeShift)
            .staggerTo($('.AnyPocketText3'), 0.3, { 'scale': '1' }, 0.2, 1.1 + timeShift)
            .staggerTo($('.pocketDD3'), 0.3, { 'scale': '1' }, 0.2, 1.2 + timeShift)
            .staggerTo($('.pocketItem3'), 0.5, { 'scale': '1' }, 0.2, 1.4 + timeShift)
            .staggerTo($('#CargoPocketNone'), 0.5, { 'scale': '1' }, 0.2, 1.8 + timeShift)
            .staggerTo($('#BackPocketNone'), 0.5, { 'scale': '1' }, 0.2, 2.2 + timeShift)

            window.tl.seek(0);
            window.tl.play();
        },

        next: function () {
            this.SavePocketsSelection();
            this.OnNext();
        },

        back: function () {
            this.SavePocketsSelection();
            this.OnBack();
        },

        SavePocketsSelection: function () {
            if (this.bodyPlacement == '' || this.armsPlacement == '' || this.cargoPlacement == '' || this.backPocketPlacement == '')
                this.isDone = false;

            else {
                var Pockets = {
                    BodyClosing: this.BodyClosing,
                    CargoClosing: this.CargoClosing,
                    backPocketClosing: this.BackPocketClosing,
                    bodyPlacement: $(this.bodyPlacement).attr('data-text'),
                    armsPlacement: $(this.armsPlacement).attr('data-text'),
                    cargoPlacement: $(this.cargoPlacement).attr('data-text'),
                    backPocketPlacement: $(this.backPocketPlacement).attr('data-text')
                };

                amplify.store('Pockets', Pockets);
                this.isDone = true;
            }

            helper.updateProgress('PocketsText', this.isDone);
            helper.RemoveNextBackHandlers();
            this.removeMiscHandlers();
        },

        removeMiscHandlers: function () {
            $('#BodyClosing').unbind('change');
            $('#LegsCargoClosing').unbind('change');
            $('#LegsBackClosing').unbind('change');
            $('#PocketsTabs .tabs li a').unbind('click');
            $('.PocketsPlacementItem').unbind('click');           
            $('li a[title="PocketsBodyTab"]').unbind('click');
            $('li a[title="PocketsArmsTab"]').unbind('click');
            $('li a[title="PocketsLegsTab"]').unbind('click');
        },
        
        ColorPocket: function (Element, color) {
            recIterate(Element);
            function recIterate(obj) {
                for (var i = 0; i < obj.childNodes.length; i++) {
                    if (obj.childNodes[i].style != null) {
                        obj.childNodes[i].style.fill = color;
                    }
                    if (obj.childNodes[i].childNodes.length > 0)
                        recIterate(obj.childNodes[i]);
                }
            }
        },

        AlterSVG: function (theID, hasClosing, theClosing, legCat) {

            var a = document.getElementById("theSVG");
            var svgDoc = a.contentDocument;
            var isChest = false;
            var isArms = false;
            var isCargo = false;
            var isBack = false;

            if (theID == '' || hasClosing == '')
                return;
            
            if (PocketsPage.CurrentTab == 'Body') {
                if (PocketsPage.selectedBodyPocket != '' && PocketsPage.selectedBodyPocket != 'none') 
                    svgDoc.getElementById(PocketsPage.selectedBodyPocket).style.display = 'none';
                isChest = true;
            }
            else if (PocketsPage.CurrentTab == 'Arms') {
                if (PocketsPage.selectedArmPocket != '' && PocketsPage.selectedArmPocket != 'none')
                    svgDoc.getElementById(PocketsPage.selectedArmPocket).style.display = 'none';
                isArms = true;
            }
            else if (PocketsPage.CurrentTab == 'Legs') {
                if (legCat == 'Cargo')
                {
                    if (PocketsPage.selectedCargoPocket != '' && PocketsPage.selectedCargoPocket != 'none')
                        svgDoc.getElementById(PocketsPage.selectedCargoPocket).style.display = 'none';
                    isCargo = true;
                }
                else if (legCat == 'Back')
                {
                    if (PocketsPage.selectedBackPocket != '' && PocketsPage.selectedBackPocket != 'none')
                        svgDoc.getElementById(PocketsPage.selectedBackPocket).style.display = 'none';
                    isBack = true;
                }
            }

            if (theID == 'none') {
                amplify.store('selectedPocket', '');
                amplify.store('pocketPosition', '');

                PocketsPage.setSelections(theID, PocketsPage.CurrentTab, legCat);
                return; 
            }

            var svgID = theID;

            if (PocketsPage.CurrentTab != 'Arms')
                svgID = this.getPureID(theID);
            
            if (hasClosing == 'Yes')
                svgID = svgID + theClosing;

                if (isChest) {
                    amplify.store('selectedPocket', svgID);
                    amplify.store('pocketPosition', $(this.bodyPlacement).attr('data-position'));


                    var elements = svgDoc.querySelectorAll('#' + svgID + ' > g');
                    var theColor;
                    if (amplify.store('pocketColor'))
                        theColor = amplify.store('pocketColor');
                    else if (amplify.store('Color') != '') {
                        theColor = amplify.store('Color').color;
                    }
                    else
                        theColor = 'rgb(193, 180, 150)';

                    for (var i = 0; i < elements[0].childNodes.length; i++) {
                        if (elements[0].childNodes[i].style != null)
                            elements[0].childNodes[i].style.fill = theColor;
                    }
                }
               
                

                if (isArms) {
                    amplify.store('selectedArmPocket', svgID);


                    var elements = svgDoc.querySelectorAll('#' + svgID + ' > g');
                    var theColor;
                    if (amplify.store('armPocketColor'))
                        theColor = amplify.store('armPocketColor');
                    else if (amplify.store('Color') != '') {
                        theColor = amplify.store('Color').color;
                    }
                    else
                        theColor = 'rgb(193, 180, 150)';

                    for (var i = 0; i < elements[0].childNodes.length; i++) {
                        if (elements[0].childNodes[i].style != null)
                            elements[0].childNodes[i].style.fill = theColor;
                    }
                }

                if (isCargo) {
                    var elements = svgDoc.querySelectorAll('#' + svgID + ' > g');
                    var theColor;
                    if (amplify.store('Color') != '') {
                        theColor = amplify.store('Color').color;
                    }
                    else
                        theColor = 'rgb(193, 180, 150)';

                    for (var i = 0; i < elements[0].childNodes.length; i++) {
                        if (elements[0].childNodes[i].style != null)
                            elements[0].childNodes[i].style.fill = theColor;
                    }
                }
                

            svgDoc.getElementById(svgID).style.display = 'inline';
            
            
                

            this.setSelections(svgID, PocketsPage.CurrentTab, legCat);
        },

        getPureID: function (ID) {
            ID = ID.replace('Velcro', '');
            ID = ID.replace('Zipper', '');
            ID = ID.replace('Button', '');
            return ID;
        },

        setSelections: function (ID, tab, leg) {
            if (tab == 'Body') {
                this.selectedBodyPocket = ID;
            }
            else if (tab == 'Arms') {
                this.selectedArmPocket = ID;
            }
            else {
                if (leg == 'Cargo') {
                    this.selectedCargoPocket = ID;
                }
                else if(leg == 'Back'){
                    this.selectedBackPocket = ID;
                }
            }
        },

        UpdateSectionText: function () {
            $('#StepsFootHeader').text('SELECT POCKETS')
            $('#StepsFootBody').text("OUR POCKETS ARE MADEWITH FULL ATTENTION TO DETAIL. WE ADDED HARMONICA ELEMENTS TO OFFER MAXIMUM STORAGE.")
        }

        
    }

    return PocketsPage;
});