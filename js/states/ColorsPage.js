define('ColorsPage', [
    'jquery',
    'amplify',
    'helper',
    'spectrum'
], function ($, amplify, helper, spectrum) {
    var ColorsPage;

    ColorsPage = {
        isDone:
           false,

        isStandard:
            false,

        isCustom:
            false,

        ColorValue:
            '',

        firstChecked:
            '',

        secondChecked:
            '',

        customUpper:
            '',

        customLower:
            '',

        theProduct:
            amplify.store('theProduct'),

        enter: function () {


            $('#ColorsIco .StepIcoHover').addClass('activeIco');
     

            $('#ColorsText .isDoneIcon').addClass('isCurrentPage');
            $('#Colors').fadeIn(function () {
                $(".tabs li").attr("id", "");
                $(".SubContent .InnerContent").hide();
                $("#ColorFirst").parent().attr("id", "current");
                $('#' + $('#ColorFirst').attr('title')).fadeIn();
                helper.setTheTabs();
            });

            if (amplify.store('theProduct') == 'Coverall') {
                this.setColorsFunctionality(false);
            }
            else {
                this.setColorsFunctionality(true);
            }

            if ($("#flat").css('display') != 'none') {
                $("#flat").spectrum({
                    flat: true,
                    showInput: true,
                    preferredFormat: "rgb"
                });
            }


            setTimeout(function () {
                
                if (ColorsPage.theProduct == 'ShirtsPants' || ColorsPage.theProduct == 'JacketsPants') {
                    if ($("#flat2").css('display') != 'none') {
                        $("#flat2").spectrum({
                            flat: true,
                            showInput: true,
                            preferredFormat: "rgb"
                        });
                    }

                    if (ColorsPage.theProduct == 'ShirtsPants') {
                        $('#ShirtsJacketHeader').text('Shirt');
                    }
                    else {
                        $('#ShirtsJacketHeader').text('Jacket');
                    }
                }
                else {
                    $('.CombinedStuff').fadeOut();
                }
            }, 2000);
            

            $('#CustomColorScroller').jScrollPane({ autoReinitialise: true });

            $('#resetButton').click(function () {
                $("input.ColorCheckbox:checkbox").prop("checked", false);
                ColorsPage.firstChecked = '';
                ColorsPage.secondChecked = '';
                ColorsPage.AlterSVG(ColorsPage.firstChecked, 'Upper');
                ColorsPage.AlterSVG(ColorsPage.secondChecked, 'Lower');
            });

            $('#ColorsNextBack .Next').click(function () {
                ColorsPage.next();
            });

            $('#ColorsNextBack .Back').click(function () {
                ColorsPage.back();
            });

            $('.ColorPicker1 .sp-input').change(function () {

                if (ColorsPage.theProduct == 'ShirtsPants' || ColorsPage.theProduct == 'JacketsPants') {
                    if (ColorsPage.isStandard && ColorsPage.firstChecked != '') {
                        if (confirm('This will replace the standard color selection.')) {
                            ColorsPage.isStandard = false;
                            ColorsPage.isCustom = true;
                            $('#resetButton').click();
                            ColorsPage.customUpper = $(this).val();
                            ColorsPage.AlterSVG(ColorsPage.customUpper, 'Upper');
                        }
                    }
                    else {
                        ColorsPage.isStandard = false;
                        ColorsPage.isCustom = true;
                        ColorsPage.customUpper = $(this).val();
                        ColorsPage.AlterSVG(ColorsPage.customUpper, 'Upper');
                    }
                }
                else {
                    if (ColorsPage.isStandard && ColorsPage.ColorValue != '') {
                        if (confirm('This will replace the standard color selection.')) {
                            ColorsPage.isStandard = false;
                            ColorsPage.isCustom = true;
                            ColorsPage.ColorValue = $(this).val();
                            ColorsPage.AlterSVG(ColorsPage.ColorValue);
                            $("input.ColorCheckbox:checkbox").prop("checked", false);
                        }
                    }
                    else {
                        ColorsPage.isStandard = false;
                        ColorsPage.isCustom = true;
                        ColorsPage.ColorValue = $(this).val();
                        ColorsPage.AlterSVG(ColorsPage.ColorValue);
                    }
                }
                
            });

            $('.ColorPicker2 .sp-input').change(function () {
                if (ColorsPage.isStandard && ColorsPage.firstChecked != '') {
                    if (confirm('This will replace the standard color selection.')) {
                        ColorsPage.isStandard = false;
                        ColorsPage.isCustom = true;
                        $('#resetButton').click();
                        ColorsPage.customLower = $(this).val();
                        ColorsPage.AlterSVG(ColorsPage.customLower, 'Lower');
                    }
                }
                else {
                    ColorsPage.isStandard = false;
                    ColorsPage.isCustom = true;
                    ColorsPage.customLower = $(this).val();
                    ColorsPage.AlterSVG(ColorsPage.customLower, 'Lower');
                }

            });

            $('li a[title="ColorStandard"]').click(function () {
                $('#ColorCustom').fadeOut();
                ColorsPage.AnimateStandard();
            });

            if (amplify.store('isOtherFabrics')) 
                $('#ColorsTabs .tabs li:last-child').fadeOut();            
            else
                $('#ColorsTabs .tabs li:last-child').fadeIn();

            this.UpdateSectionText();
            $('li a[title="ColorStandard"]').click();

        },

        setColorsFunctionality: function (isCombined) {
            
            if (isCombined) {
                $('#resetButton').fadeIn(4000);
                $("input.ColorCheckbox:checkbox").click(function () {

                    if (ColorsPage.isCustom && (ColorsPage.customLower != '' || ColorsPage.customUpper != '')) {
                        if (!confirm('This will remove the custom color.'))
                            return;
                        else {
                            $('.ColorPicker1 .sp-input').val('rgb(0, 0, 0)');
                            $('.ColorPicker2 .sp-input').val('rgb(0, 0, 0)');
                            ColorsPage.customUpper = '';
                            ColorsPage.customLower = '';
                        }
                    }
                        


                    ColorsPage.isStandard = true;
                    ColorsPage.isCustom = false;
                    var group = "input:checkbox[customName='" + $(this).attr("customName") + "']";
                    var checkedcb = $(group + ':checked').length;
                    if (checkedcb == 1){
                        ColorsPage.firstChecked = $(this);
                        ColorsPage.AlterSVG($(ColorsPage.firstChecked).val(), 'Lower');
                    }   
                    else if (checkedcb == 2) {
                        ColorsPage.secondChecked = $(this);
                        ColorsPage.AlterSVG($(ColorsPage.secondChecked).val(), 'Upper');
                    }
                    else {
                        $(this).prop("checked", false);
                    }                        
                });
            }
            else {
                $('#resetButton').fadeOut();
                $("input.ColorCheckbox:checkbox").click(function () {

                    if (ColorsPage.isCustom && ColorsPage.ColorValue != '')
                    {
                        if (!confirm('This will replace the custom selection.')) {
                            return;
                        }
                        else {
                            $('.ColorPicker1 .sp-input').val('rgb(0, 0, 0)');                            
                        }
                    }

                    var group = "input:checkbox[customName='" + $(this).attr("customName") + "']";
                    $(group).prop("checked", false);
                    $(this).prop("checked", true);
                    ColorsPage.ColorValue = $(this).val();
                    ColorsPage.isStandard = true;
                    ColorsPage.isCustom = false;
                    ColorsPage.AlterSVG(ColorsPage.ColorValue);
                });
            }
        },

        AnimateStandard: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            window.tl.set($('.ColorItem'), { 'scale': '0' })
            window.tl.set($('.anyColHeader'), { 'scale': '0' })
            window.tl.set($('.GenColOpt'), { 'scale': '0' })

            .staggerTo($('.anyColHeader'), 0.5, { scale: '1' }, 0.2, 1 + timeShift)
            .staggerTo($('.GenColOpt'), 0.5, { scale: '1' }, 0.1, 1.2 + timeShift)

            .staggerTo($('.stage1'), 0.5, { scale: '1' }, 0, 1.4 + timeShift)
            .staggerTo($('.stage2'), 0.5, { scale: '1' }, 0, 1.6 + timeShift)
            .staggerTo($('.stage3'), 0.5, { scale: '1' }, 0, 1.8 + timeShift)
            .staggerTo($('.stage4'), 0.5, { scale: '1' }, 0, 2 + timeShift)
            ;

            window.tl.seek(0);
            window.tl.play();
        },

        AnimateCustom: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            window.tl.set($('.ColorPicker'), { 'height': '0' })
            window.tl.set($('#ColorTextContainer'), { 'scale': '0' })

            .staggerTo($('.ColorPicker'), 2, { 'height': '300px' }, 0, 1 + timeShift)
            .staggerTo($('#ColorTextContainer'), 0.5, { 'scale': '1' }, 0, 2.5 + timeShift)
        },

        next: function () {
            this.SaveColorSelection();
            this.OnNext();
        },

        back: function () {
            this.SaveColorSelection();
            this.OnBack();
        },

        SaveColorSelection: function () {

            if (this.theProduct == 'ShirtsPants' || this.theProduct == 'JacketsPants') {
                if (this.isStandard) {
                    if (this.firstChecked != '' && this.secondChecked != '') {
                        var combinedColors = {
                            isStandard: this.isStandard,
                            upperColor: this.firstChecked.val(),
                            lowerColor: this.secondChecked.val()
                        };
                        amplify.store('Colors', combinedColors);
                        this.isDone = true;
                    }
                    else {
                        amplify.store('Colors', '');
                        this.isDone = false;
                    }
                }
                else {
                    if (this.customUpper != '' && this.customLower != '') {
                        var combinedColors = {
                            isStandard: this.isStandard,
                            upperColor: this.customUpper,
                            lowerColor: this.customLower
                        };
                        amplify.store('Colors', combinedColors);
                        this.isDone = true;
                    }
                    else {
                        amplify.store('Colors', '');
                        this.isDone = false;
                    }
                }
            }
            else {
                if (this.ColorValue != '') {
                    var colors = {
                        isStandard: this.isStandard,
                        color: this.ColorValue
                    };
                    amplify.store('Color', colors);
                    amplify.store('isStandard', this.isStandard);
                    this.isDone = true;
                }
                else {
                    amplify.store('Color', '');
                    this.isDone = false;
                }
            }


            helper.updateProgress('ColorsText', this.isDone);
            helper.RemoveNextBackHandlers();
            this.removeMiscHandlers();
        },

        updatePockets: function (color, svgDoc) {
            if (amplify.store('selectedPocket') != '' && amplify.store('pocketColor') == '') {                
                var elements = svgDoc.querySelectorAll('#' + amplify.store('selectedPocket') + ' > g');
                for (var i = 0; i < elements[0].childNodes.length; i++) {
                    if (elements[0].childNodes[i].style != null)
                        elements[0].childNodes[i].style.fill = color;
                }
            }
            if (amplify.store('selectedArmPocket') != '' && amplify.store('pocketColor') == '') {
                var elements = svgDoc.querySelectorAll('#' + amplify.store('selectedArmPocket') + ' > g');
                for (var i = 0; i < elements[0].childNodes.length; i++) {
                    if (elements[0].childNodes[i].style != null)
                        elements[0].childNodes[i].style.fill = color;
                }
            }
        },

        removeMiscHandlers: function () {
            $('#ColorIcons .css-checkbox').unbind('change');
            $('.ColorPicker1 .sp-input').unbind('change');
            $('.ColorPicker2 .sp-input').unbind('change');
            $('#resetButton').unbind('click');
            $('li a[title="ColorStandard"]').unbind('click');
            $("input.ColorCheckbox:checkbox").unbind('click');
        },


        AlterSVG: function (Color, section) {
            var a = document.getElementById("theSVG");
            var svgDoc = a.contentDocument; //get the inner DOM of alpha.svg

            function recIterate(obj, Col) {
                for (var i = 0; i < obj.childNodes.length; i++) {
                    if (obj.childNodes[i].style != null) {
                        obj.childNodes[i].style.fill = Col;
                    }
                    if (obj.childNodes[i].childNodes.length > 0)
                        recIterate(obj.childNodes[i]);
                }
            }
            if (section == null || section == '' || section == undefined)
            {
                var delta = svgDoc.getElementById("Background_Colour"); //get the inner element by id
                if (Color == '') {
                    recIterate(delta, 'rgb(193, 180, 150)');
                    this.updatePockets('rgb(193, 180, 150)', svgDoc);
                }
                else {
                    recIterate(delta, Color);
                    this.updatePockets(Color, svgDoc);
                }   
            }
            else
            {
                if (section == 'Upper') {
                    var delta = svgDoc.getElementById("Background_Colour"); //get the inner element by id
                    if (Color == '')
                        recIterate(delta, 'rgb(193, 180, 150)');
                    else
                        recIterate(delta, Color);
                }
                else {
                    var delta = svgDoc.getElementById("Background_Colour"); //get the inner element by id
                    if (Color == '')
                        recIterate(delta, 'rgb(193, 180, 150)');
                    else
                        recIterate(delta, Color);
                }
            }

            //var PocketShown = amplify.store('PocketSelections');
            //if (PocketShown != null && PocketShown != '' && PocketShown != undefined) {
            //    var theBodyPoc = PocketShown.BodyPocketPosition,
            //        theArmsPoc = PocketShown.ArmsPocketPosition,
            //        theLegCargoPoc = PocketShown.LegsCargoPocketPosition,
            //        thelegBackPoc = PocketShown.LegsBackPocketPosition;

            //    if (theBodyPoc != '' && theBodyPoc != 'none')
            //        recIterate(svgDoc.getElementById(theBodyPoc), Color);
            //    if (theArmsPoc != '' && theArmsPoc != 'none')
            //        recIterate(svgDoc.getElementById(theArmsPoc), Color);
            //    if (theLegCargoPoc != '' && theLegCargoPoc != 'none')
            //        recIterate(svgDoc.getElementById(theLegCargoPoc), Color);
            //    if (thelegBackPoc != '' && thelegBackPoc != 'none')
            //        recIterate(svgDoc.getElementById(thelegBackPoc), Color);
            //}

           


        },

        UpdateSectionText: function () {
            $('#StepsFootHeader').text('SELECT A COLOR')
            $('#StepsFootBody').text("PROTAL'S UNIQUE BLEND IS NOT ONLY SAFE AND COMFORTABLE, BUT CAN ALSO BE DIED INTO ANY COLOR IMAGINABLE.")
        }
    }

    return ColorsPage;
});