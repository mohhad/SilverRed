define('ReflectorsPage', [
    'jquery',
    'amplify',
    'Scroller',
    'helper'
], function ($, amplify, Scroller, helper) {
    var ReflectorsPage;

    ReflectorsPage = {
        isDone:
           false,

        CurrentTab:
            'Body',

        ReflectorType:
            'OneInch',

        ReflectorColor:
            'Silver',

        bodyPlacement:
            '',

        armsPlacement:
            '',

        legsPlacement:
            '',

        selectedBody:
            '',

        selectedArm:
            '',

        selectedLeg:
            '',

        enter: function () {

            ReflectorsPage.CurrentTab = 'Body';
            $('#ReflectorsIco .StepIcoHover').addClass('activeIco');
        
            $('#ReflectorsText .isDoneIcon').addClass('isCurrentPage');
            $('#Reflectors').fadeIn(function () {
                $(".tabs li").attr("id", "");
                $(".SubContent .InnerContent").hide();
                $("#ReflectorsFirst").parent().attr("id", "current");
                $("#ReflectorsInnerFirst").parent().attr("id", "currentInner");
                $('#' + $('#ReflectorsFirst').attr('title')).fadeIn();
                helper.setTheTabs();
            });

            $('#ReflectorsNextBack .Next').click(function () {
                ReflectorsPage.next();
            });

            $('#ReflectorsNextBack .Back').click(function () {
                ReflectorsPage.back();
            });

            $('#ReflectorsTabs .tabs li a').click(function () {
                ReflectorsPage.CurrentTab = $(this).parent().attr('title');
            });

            $('#ReflectorType').change(function () {
                ReflectorsPage.ReflectorType = $(this).val();
                ReflectorsPage.ReflectorColor = $('option:selected', this).attr('color');

                ReflectorsPage.AlterSVG(ReflectorsPage.selectedBody, ReflectorsPage.ReflectorType, 'Body', 'R');
                ReflectorsPage.AlterSVG(ReflectorsPage.selectedArm, ReflectorsPage.ReflectorType, 'Arms', 'R');
                ReflectorsPage.AlterSVG(ReflectorsPage.selectedLeg, ReflectorsPage.ReflectorType, 'Legs', 'R');
            });

            $('.ReflectorPlacementItem').click(function () {

                if (ReflectorsPage.CurrentTab == 'Body') {
                    $('.ReflectorPI1').children('.InnerReflectorText').children('.css-checkbox').each(function () {
                        $(this)[0].checked = false;
                    });
                    ReflectorsPage.bodyPlacement = this;
                    ReflectorsPage.AlterSVG($(ReflectorsPage.bodyPlacement).attr('value'), ReflectorsPage.ReflectorType, 'Body');
                }
                else if (ReflectorsPage.CurrentTab == 'Arms') {
                    $('.ReflectorPI2').children('.InnerReflectorText').children('.css-checkbox').each(function () {
                        $(this)[0].checked = false;
                    });
                    ReflectorsPage.armsPlacement = this;
                    ReflectorsPage.AlterSVG($(ReflectorsPage.armsPlacement).attr('value'), ReflectorsPage.ReflectorType, 'Arms');
                }
                else {
                    $('.ReflectorPI3').children('.InnerReflectorText').children('.css-checkbox').each(function () {
                        $(this)[0].checked = false;
                    });
                    ReflectorsPage.legsPlacement = this;
                    ReflectorsPage.AlterSVG($(ReflectorsPage.legsPlacement).attr('value'), ReflectorsPage.ReflectorType, 'Legs');
                }
                
                $(this).children('.InnerReflectorText').children('.css-checkbox')[0].checked = true;
            });

            $('li a[title="ReflectorsBodyTab"]').click(function () {
                ReflectorsPage.AnimateBody();
            });

            $('li a[title="ReflectorsArmsTab"]').click(function () {
                ReflectorsPage.AnimateArms();
            });

            $('li a[title="ReflectorsLegsTab"]').click(function () {
                ReflectorsPage.AnimateLegs();
            });

            $('#ReflectorsScroller').jScrollPane({ autoReinitialise: true });

            this.UpdateSectionText();
            $('li a[title="ReflectorsBodyTab"]').click();

        },

        AnimateBody: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            window.tl.set($('.AnyReflectorHeader1'), { 'scale': '0' })
            window.tl.set($('.dropDownAnim1'), { 'scale': '0' })
            window.tl.set($('.ReflectorPI1'), { 'scale': '0', 'width': '0' })

            .staggerTo($('.AnyReflectorHeader1'), 0.2, { 'scale': '1' }, 0.2, 1 + timeShift)
            .staggerTo($('.dropDownAnim1'), 0.5, { 'scale': '1' }, 0.4, 1.1 + timeShift)
            .staggerTo($('.ReflectorPI1'), 0.5, { 'scale': '1', 'width': '204px' }, 0.2, 1.5 + timeShift)

            window.tl.seek(0);
            window.tl.play();
        },

        AnimateArms: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            window.tl.set($('.AnyReflectorHeader1'), { 'scale': '0' })
            window.tl.set($('.dropDownAnim1'), { 'scale': '0' })
            window.tl.set($('.ReflectorPI2'), { 'scale': '0', 'width': '0' })

            .staggerTo($('.AnyReflectorHeader1'), 0.2, { 'scale': '1' }, 0.2, 1 + timeShift)
            .staggerTo($('.dropDownAnim1'), 0.5, { 'scale': '1' }, 0.4, 1.1 + timeShift)
            .staggerTo($('.ReflectorPI2'), 0.5, { 'scale': '1', 'width': '204px' }, 0.2, 1.5 + timeShift)

            window.tl.seek(0);
            window.tl.play();
        },

        AnimateLegs: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            window.tl.set($('.AnyReflectorHeader1'), { 'scale': '0' })
            window.tl.set($('.dropDownAnim1'), { 'scale': '0' })
            window.tl.set($('.ReflectorPI3'), { 'scale': '0', 'width': '0' })

            .staggerTo($('.AnyReflectorHeader1'), 0.2, { 'scale': '1' }, 0.2, 1 + timeShift)
            .staggerTo($('.dropDownAnim1'), 0.5, { 'scale': '1' }, 0.4, 1.1 + timeShift)
            .staggerTo($('.ReflectorPI3'), 0.5, { 'scale': '1', 'width': '204px' }, 0.2, 1.5 + timeShift)

            window.tl.seek(0);
            window.tl.play();
        },

        next: function () {
            this.SaveReflectorsSelection();
            this.OnNext();
        },

        back: function () {
            this.SaveReflectorsSelection();
            this.OnBack();
        },

        SaveReflectorsSelection: function () {
            if (this.bodyPlacement == '' || this.armsPlacement == '' || this.legsPlacement == '')
                this.isDone = false;

            else {
                var reflectors = {
                    reflectorType: this.ReflectorType,
                    reflectorColor: this.ReflectorColor,
                    body: $(this.bodyPlacement).attr('data-text'),
                    arms: $(this.armsPlacement).attr('data-text'),
                    legs: $(this.legsPlacement).attr('data-text'),
                };
                amplify.store('reflectors', reflectors);
                this.isDone = true;
            }

            helper.updateProgress('ReflectorsText', this.isDone);
            helper.RemoveNextBackHandlers();
            this.removeMiscHandlers();
        },

        removeMiscHandlers: function () {
            $('#ReflectorsTabs .tabs li a').unbind('click');
            $('.ReflectorPlacementItem').unbind('click');
            $('li a[title="ReflectorsBodyTab"]').unbind('click');
            $('li a[title="ReflectorsArmsTab"]').unbind('click');
            $('li a[title="ReflectorsLegsTab"]').unbind('click');
            $('#ReflectorType').unbind('change');
        },

        AlterSVG: function (theID, theType, theTab, replace) {
            var a = document.getElementById("theSVG");
            var svgDoc = a.contentDocument;
            if (theID == '' || theType == '')
                return;


            var svgID = this.getThePureID(theID);
            

            if (theTab == 'Body') {
                if (this.selectedBody != '' && this.selectedBody != 'none')
                    svgDoc.getElementById(this.selectedBody).style.display = 'none';
            }
            else if (theTab == 'Arms') {
                if (this.selectedArm != '' && this.selectedArm != 'none')
                    svgDoc.getElementById(this.selectedArm).style.display = 'none';
            }
            else {
                if (this.selectedLeg != '' && this.selectedLeg != 'none')
                    svgDoc.getElementById(this.selectedLeg).style.display = 'none';
            }

            if (svgID == 'none') {
                this.setSelectedItems(svgID, theTab);
                return;
            }
                

            svgID = svgID + theType;
            
            svgDoc.getElementById(svgID).style.display = 'inline';

            this.setSelectedItems(svgID, theTab);
        },

        setSelectedItems: function (ID, Tab) {
            if (Tab == 'Body') {
                this.selectedBody = ID;
            }
            else if(Tab == 'Arms'){
                this.selectedArm = ID;
            }
            else{
                this.selectedLeg = ID;
            }
        },

        getThePureID: function (theID) {
            
            theID = theID.replace('OneInch', '');
            theID = theID.replace('TwoInchY', '');
            theID = theID.replace('TwoInch', '');
            return theID;
        },

        UpdateSectionText: function () {
            $('#StepsFootHeader').text('SELECT REFLECTORS')
            $('#StepsFootBody').text("ALL REFLECTORS ARE MADE OF THE HIGHEST QUALITY AND ARE 100% FIRE RETARDANT.")
        }
    }

    return ReflectorsPage;
});