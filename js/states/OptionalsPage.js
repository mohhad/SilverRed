define('OptionalsPage', [
    'jquery',
    'amplify',
    'Scroller',
    'helper'
], function ($, amplify, Scroller, helper) {
    var OptionalsPage;

    OptionalsPage = {
        isDone:
           false,

        MainClosing:
            '',

        CurrentTab:
            'Body',

        NameOptions: 
            '',

        CorporateHSEOptions:
            '',

        GasLoopOptions:
            '',

        CollarOption:
            '',

        ShoulderEpauletOptions:
            '',

        FRIconOptions:
            '',

        FlagIconOptions:
           '',

        KneeEnforcement:
            false,

        KneePad:
            false,

        ElbowEnforcement:
            false,

        Winter:
            '',


        selectedNameBadge:
            '',

        selectedHSEBadge:
            '',

        selectedGasLoop:
            '',

        selectedCollar:
            '',

        selectedShoulderEpaulette:
            '',

        selectedFRIcon:
            '',

        selectedFlagIcon:
            '',

        selectedEnforcement:
            '',

        enter: function () {


            $('#OptionalsIco .StepIcoHover').addClass('activeIco');

            $('#OptionalsTabs .tabs li a').click(function () {
                OptionalsPage.CurrentTab = $(this).parent().attr('title');
            });

            $('#OptionalsText .isDoneIcon').addClass('isCurrentPage');
            $('#Optionals').fadeIn(function () {
                $(".tabs li").attr("id", "");
                $(".SubContent .InnerContent").hide();
                $("#OptionalsFirst").parent().attr("id", "current");
                $('#' + $('#OptionalsFirst').attr('title')).fadeIn();
                helper.setTheTabs();
            });

            $('#OptionsScroll').jScrollPane({ autoReinitialise: true });

            $('#OptionalsNextBack .Next').click(function () {
                OptionalsPage.next();
            });

            $('#OptionalsNextBack .Back').click(function () {
                OptionalsPage.back();
            });

            $(".OptionalsChkBx1:checkbox").change(function () {
                OptionalsPage.MainClosing = $(this).val();
            });

            $(".OptionalsChkBx2:checkbox").change(function () {

                var thisEnf = $(this).attr('data-ID'),
                    selected = $(this).prop("checked");

                if (thisEnf == 'KneeEnforcements') {
                    OptionalsPage.KneeEnforcement = selected;                    
                    if (selected && OptionalsPage.KneePad) {
                        OptionalsPage.KneePad = false;
                        $('.OptionalsChkBx2:checkbox[data-ID=KneePad]').attr('checked', false);
                        OptionalsPage.AlterSVG('KneePad', 'Enforcement', true);
                    }                        
                }
                else if (thisEnf == 'ElbowEnforcements') {
                    OptionalsPage.ElbowEnforcement= selected;
                }
                else {
                    OptionalsPage.KneePad = selected;
                    if (selected && OptionalsPage.KneeEnforcement) {
                        OptionalsPage.KneeEnforcement = false;
                        $('.OptionalsChkBx2:checkbox[data-ID=KneeEnforcements]').attr('checked', false);
                        OptionalsPage.AlterSVG('KneeEnforcements', 'Enforcement', true);
                    }                        
                }
                if (!selected) {
                    OptionalsPage.AlterSVG(thisEnf, 'Enforcement', true);
                    return;
                }
                OptionalsPage.AlterSVG(thisEnf, 'Enforcement', false);
            });

            $('#NameOptions').change(function () {
                window.badgeConflicts.leftChestNameBadge = $('option:selected', this).attr('data-location') == 'leftChest';
                window.badgeConflicts.rightChestNameBadge = $('option:selected', this).attr('data-location') == 'rightChest';

                //if ((window.badgeConflicts.leftArmHSEBadge && window.badgeConflicts.leftChestNameBadge) || (window.badgeConflicts.rightArmHSEBadge && window.badgeConflicts.rightChestNameBadge)) {
                //    alert('Please change the HSE badge selection.');
                //    $(this).val('None');
                //    window.badgeConflicts.rightChestNameBadge = window.badgeConflicts.leftChestNameBadge = false;
                //}
                
                OptionalsPage.NameOptions = $(this).val();
                OptionalsPage.AlterSVG($('option:selected', this).attr('data-ID'), 'NameBadge');
            });

            $('#CorporateHSEOptions').change(function () {
                window.badgeConflicts.leftArmHSEBadge = $('option:selected', this).attr('data-location') == 'leftArm';
                window.badgeConflicts.rightArmHSEBadge = $('option:selected', this).attr('data-location') == 'rightArm';


                if ((window.badgeConflicts.leftArmHSEBadge && window.badgeConflicts.leftArmFlag) || (window.badgeConflicts.rightArmHSEBadge && window.badgeConflicts.rightArmFlag)) {
                    alert('Please change the Flag badge selection.');
                    $(this).val('None');
                    window.badgeConflicts.rightArmHSEBadge = window.badgeConflicts.leftArmHSEBadge = false;
                }

                
                OptionalsPage.CorporateHSEOptions = $(this).val();
                OptionalsPage.AlterSVG($('option:selected', this).attr('data-ID'), 'HSEBadge');
            });

            $('#GasLoopOptions').change(function () {
                OptionalsPage.GasLoopOptions = $(this).val();
                OptionalsPage.AlterSVG($('option:selected', this).attr('data-ID'), 'GasLoop');
            });

            $('#CollarOptions').change(function () {
                OptionalsPage.CollarOption = $(this).val();
                OptionalsPage.AlterSVG($('option:selected', this).attr('data-ID'), 'Collar');
            });
            $('#ShoulderEpauletOptions').change(function () {
                OptionalsPage.ShoulderEpauletOptions = $(this).val();
                OptionalsPage.AlterSVG($('option:selected', this).attr('data-ID'), 'ShoulderEpaulette');
            });

            $('#FRIconOptions').change(function () {
                OptionalsPage.FRIconOptions = $(this).val();
                OptionalsPage.AlterSVG($('option:selected', this).attr('data-ID'), 'FRIcon');
            });

            $('#FlagIconOptions').change(function () {
                window.badgeConflicts.leftArmFlag = $('option:selected', this).attr('data-location') == 'leftArm';
                window.badgeConflicts.rightArmFlag = $('option:selected', this).attr('data-location') == 'rightArm';


                if ((window.badgeConflicts.leftArmHSEBadge && window.badgeConflicts.leftArmFlag) || (window.badgeConflicts.rightArmHSEBadge && window.badgeConflicts.rightArmFlag)) {
                    alert('Please change the HSE badge selection.');
                    $(this).val('None');
                    window.badgeConflicts.rightArmFlag = window.badgeConflicts.leftArmFlag = false;
                }


                OptionalsPage.FlagIconOptions = $(this).val();
                OptionalsPage.AlterSVG($('option:selected', this).attr('data-ID'), 'FlagIcon');
            });

            $('.WinterCheckbox').click(function () {
                OptionalsPage.Winter = $(this).val();
            });


            $('li a[title="OptionalTab"]').click(function () {
                OptionalsPage.Animate();
            });

            $('li a[title="WinterTab"]').click(function () {
                OptionalsPage.AnimateWinter();
            });

            if (amplify.store('theProduct') == 'ShirtsPants' || amplify.store('theProduct') == 'JacketsPants') {
                $('li a[title="WinterTab"]').hide();
            }
            else {
                $('li a[title="WinterTab"]').click(function () {
                    OptionalsPage.AnimateWinter();
                });
            }

            this.UpdateSectionText();
            this.Animate();
        },

        Animate: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            window.tl.set($('.AnyHeaderOpt'), { 'scale': '0' })
            window.tl.set($('.OptGen'), { 'scale': '0' })
            window.tl.set($('.dropDownAnimOpt'), { 'scale': '0' })
            window.tl.set($('.OptionalItem'), { 'scale': '0' })

            .staggerTo($('.AnyHeaderOpt'), 0.3, { 'scale': '1' }, 0.2, 1 + timeShift)
            .staggerTo($('.OptGen'), 0.3, { 'scale': '1' }, 0.2, 1.1 + timeShift)
            .staggerTo($('.OptionalItem'), 0.5, { 'scale': '1' }, 0.2, 1.5 + timeShift)
            .staggerTo($('.dropDownAnimOpt'), 0.3, { 'scale': '1' }, 0.2, 1.9 + timeShift)           

            window.tl.seek(0);
            window.tl.play();
        },

        AnimateWinter: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            window.tl.set($('.AnyHeaderOpt2'), { 'scale': '0' })
            window.tl.set($('.OptGen2'), { 'scale': '0' })
            window.tl.set($('.ColorSquareWinter'), { 'width': '0px' })
            window.tl.set($('.OptGen2'), { 'scale': '0px' })
            window.tl.set($('.WinterX'), { 'scale': '0' })

            .staggerTo($('.AnyHeaderOpt2'), 0.3, { 'scale': '1' }, 0.2, 1 + timeShift)
            .staggerTo($('.OptGen2'), 0.3, { 'scale': '1' }, 0.2, 1.1 + timeShift)
            .staggerTo($('.OptGen2'), 0.5, { 'scale': '1' }, 0.2, 1.2 + timeShift)
            .staggerTo($('.ColorSquareWinter'), 0.5, { 'width': '24px' }, 0.2, 2 + timeShift)
            .staggerTo($('.WinterX'), 0.5, { 'scale': '1' }, 0.2, 1.75 + timeShift)
            


            window.tl.seek(0);
            window.tl.play();
        },

        next: function () {
            this.SaveOptionalsSelection();
            this.OnNext();
        },

        back: function () {
            this.SaveOptionalsSelection();
            this.OnBack();
        },

        SaveOptionalsSelection: function () {
            //if((this.MainClosing == '' || this.NameOptions == '' || this.CorporateHSEOptions =='' || 
            //    this.GasLoopOptions == '' || this.ShoulderEpauletOptions == '' || this.FRIconOptions == '') || (amplify.store('theProduct') != 'ShirtsPants' && this.Winter == ''))
            //    this.isDone = false;

            //else {
                var optionals = {
                    mainClosing: this.MainClosing,
                    nameOption: this.NameOptions,
                    HSEBadge: this.CorporateHSEOptions,
                    gasLoop: this.GasLoopOptions,
                    Collar: this.CollarOption,
                    ShoulderEpaulet: this.ShoulderEpauletOptions,
                    FRIcon: this.FRIconOptions,
                    FlagIcon: this.FlagIconOptions,
                    KneeEnforcement: this.KneeEnforcement,
                    KneePad: this.KneePad,
                    ElbowEnforcement: this.ElbowEnforcement,
                    winter: this.Winter
                };
                amplify.store('optionals', optionals);

                this.isDone = true;
            //}
                


            helper.updateProgress('OptionalsText', this.isDone);
            helper.RemoveNextBackHandlers();
            this.removeMiscHandlers();
        },

        removeMiscHandlers: function () {
            $('li a[title="WinterTab"]').unbind('click');
            $('li a[title="OptionalTab"]').unbind('click');
            $(".OptionalsChkBx:checkbox").unbind('change');
            $(".OptionalsChkBx2:checkbox").unbind('change');
            $('#NameOptions').unbind('change');
            $('#CorporateHSEOptions').unbind('change');
            $('#GasLoopOptions').unbind('change');
            $('#CollarOptions').unbind('change');
            $('#ShoulderEpauletOptions').unbind('change');
            $('#FRIconOptions').unbind('change');
            $('#FlagIconOptions').unbind('change');
            $('#OptionalsTabs .tabs li a').unbind('click');
            $('.WinterCheckbox').unbind('click')
        },
       
        AlterSVG: function (theID, section, Overlaps) {

            var a = document.getElementById("theSVG");
            var svgDoc = a.contentDocument;

            if (theID == '' || section == '') {
                return;
            }


            if (section == 'NameBadge') {
                if (this.selectedNameBadge != '' && this.selectedNameBadge != 'none')
                    svgDoc.getElementById(this.selectedNameBadge).style.display = 'none';
            }
            else if(section == 'HSEBadge'){
                if (this.selectedHSEBadge != '' && this.selectedHSEBadge != 'none')
                    svgDoc.getElementById(this.selectedHSEBadge).style.display = 'none';
            }
            else if (section == 'GasLoop') {
                if (this.selectedGasLoop != '' && this.selectedGasLoop != 'none')
                    svgDoc.getElementById(this.selectedGasLoop).style.display = 'none';
            }
            else if (section == 'Collar') {
                if (this.selectedCollar != '' && this.selectedCollar != 'none')
                    svgDoc.getElementById(this.selectedCollar).style.display = 'none';
            }
            else if (section == 'ShoulderEpaulette') {
                if (this.selectedShoulderEpaulette != '' && this.selectedShoulderEpaulette != 'none')
                    svgDoc.getElementById(this.selectedShoulderEpaulette).style.display = 'none';
            }
            else if (section == 'FRIcon') {
                if (this.selectedFRIcon != '' && this.selectedFRIcon != 'none')
                    svgDoc.getElementById(this.selectedFRIcon).style.display = 'none';
            }
            else if (section == 'FlagIcon') {
                if (this.selectedFlagIcon != '' && this.selectedFlagIcon != 'none')
                    svgDoc.getElementById(this.selectedFlagIcon).style.display = 'none';
            }
            else if (section == 'Enforcement') {
                //if (this.selectedEnforcement != '' && this.selectedEnforcement != 'none')
                //    svgDoc.getElementById(this.selectedEnforcement).style.display = 'none';
                if (Overlaps) {
                    svgDoc.getElementById(theID).style.display = 'none';
                    return;
                }
            }

            this.setSelections(theID, section);
            if (theID == 'none') {
                return;
            }

            

            svgDoc.getElementById(theID).style.display = 'inline';

        },

        setSelections: function (theID, section) {
            if (section == 'NameBadge') {
                this.selectedNameBadge = theID;
            }
            else if (section == 'HSEBadge') {
                this.selectedHSEBadge = theID;
            }
            else if (section == 'GasLoop') {
                this.selectedGasLoop = theID;
            }
            else if (section == 'Collar') {
                this.selectedCollar = theID;
            }
            else if (section == 'ShoulderEpaulette') {
                this.selectedShoulderEpaulette = theID;
            }
            else if (section == 'FRIcon') {
                this.selectedFRIcon = theID;
            }
            else if (section == 'FlagIcon') {
                this.selectedFlagIcon = theID;
            }
            //else if (section == 'Enforcement') {
            //    this.selectedEnforcement = theID;
            //}
        },

        UpdateSectionText: function () {
            $('#StepsFootHeader').text('SELECT OPTIONALS')
            $('#StepsFootBody').text("WINTER INSULATION, CLOSINGS, NAME BADGES, ALL ADD-ONS CAN BE FOUND IN THIS SECTION.")
        }
    }

    return OptionalsPage;
});