define('LogosPage', [
    'jquery',
    'amplify',
    'Scroller',
    'helper'
], function ($, amplify, Scroller, helper) {
    var LogosPage;

    LogosPage = {
        isDone:
           false,

        isNone:
            false,

        ClosingType:
            new Array(7),

        Placements:
            new Array(7),

        enter: function () {

            $('#LogosIco .StepIcoHover').addClass('activeIco');

            $('#LogosText .isDoneIcon').addClass('isCurrentPage');
            $('#Logos').fadeIn(function () {
                $(".tabs li").attr("id", "");
                $(".SubContent .InnerContent").hide();
                $("#LogosFirst").parent().attr("id", "current");
                $('#' + $('#LogosFirst').attr('title')).fadeIn();
                helper.setTheTabs();
            });

            $('#LogosNextBack .Next').click(function () {
                LogosPage.next();
            });

            $('#LogosNextBack .Back').click(function () {
                LogosPage.back();
            });

            $('#LogoNone').click(function () {
                LogosPage.isNone = true;
                LogosPage.ClosingType = new Array(7);
                LogosPage.Placements = new Array(7);
                $('.SmallDDContainer .SmallDD').val('-1');
                $(this).addClass('CurrentPlacementItem');
                window.badgeConflicts.leftArmLogo = false;
                window.badgeConflicts.rightArmLogo = false;
                LogosPage.AlterSVG('');
            });

            $('.SmallDDContainer .SmallDD').change(function () {

                //window.badgeConflicts.leftChestLogoBadge = $(this).attr('data-location') == 'leftChest';
                //window.badgeConflicts.rightChestLogoBadge = $(this).attr('data-location') == 'rightChest';

                if ($(this).attr('placement') == 'Sleeve Left') {
                    if (window.badgeConflicts.leftArmHSEBadge) {
                        alert('This option conflicts with the HSE badge selection.');
                        $(this).val('-1');
                        return;
                    }
                    else if (window.badgeConflicts.leftArmFlag) {
                        alert('This option conflicts with the Flag badge selection.');
                        $(this).val('-1');
                        return;
                    }
                    window.badgeConflicts.leftArmLogo = true;
                }

                else if ($(this).attr('placement') == 'Sleeve Right') {
                    if (window.badgeConflicts.rightArmHSEBadge) {
                        alert('This option conflicts with the HSE badge selection.');
                        $(this).val('-1');
                        return;
                    }
                    else if (window.badgeConflicts.rightArmFlag) {
                        alert('This option conflicts with the Flag badge selection.');
                        $(this).val('-1');
                        return;
                    }
                    window.badgeConflicts.rightArmLogo = true;
                }



                if ((window.badgeConflicts.leftArmLogo && window.badgeConflicts.leftArmHSEBadge) || (window.badgeConflicts.rightArmLogo && window.badgeConflicts.rightArmHSEBadge)) {
                    alert('This option conflicts with the HSE badge selection.');
                    $(this).val('-1');
                    return;
                }

                if ($(this).attr('data-pocket') != '' && $(this).attr('data-pocket') != undefined && $(this).attr('data-pocket') != null) {
                    if (amplify.store('selectedPocket') == '') {
                        alert('This option requires a chest pocket.');
                        $(this).val('-1');
                        return;
                    }
                    else if (amplify.store('pocketPosition') != 'both' && amplify.store('pocketPosition') != $(this).attr('data-pocket')) {
                        alert('This option requires a ' + $(this).attr('data-pocket') + ' pocket selection!');
                        $(this).val('-1');
                        return;
                    }
                    amplify.store('leftChestLogo', $(this).attr('data-pocket') == 'left' ? 'yes' : amplify.store('leftChestLogo'));
                    amplify.store('rightChestLogo', $(this).attr('data-pocket') == 'right' ? 'yes' : amplify.store('rightChestLogo'));
                }


                $('#LogoNone').removeClass('CurrentPlacementItem');
                LogosPage.isNone = false;
                var index = $(this).attr('arrayIndex');
                LogosPage.ClosingType[index] = $(this).val();
                LogosPage.Placements[index] = $(this).attr('placement');
                LogosPage.AlterSVG($(this).attr('data-ID'));
            });

            $('li a[title="LogosBodyTab"]').click(function () {
                LogosPage.Animate();
            });

            this.UpdateSectionText();
            this.Animate();

        },

        Animate: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            window.tl.set($('.anyLogoHeader'), { 'scale': '0' })
            window.tl.set($('.anyLogoText'), { 'scale': '0' })
            window.tl.set($('.LogosPlacementItem'), { 'scale': '0' })
            window.tl.set($('.SmallDDContainer'), { 'scale': '0' })

            .staggerTo($('.anyLogoHeader'), 0.3, { 'scale': '1' }, 0.2, 1 + timeShift)
            .staggerTo($('.anyLogoText'), 0.3, { 'scale': '1' }, 0.2, 1.1 + timeShift)
            .staggerTo($('.LogosPlacementItem'), 0.3, { 'scale': '1' }, 0.2, 1.2 + timeShift)
            .staggerTo($('.SmallDDContainer'), 0.3, { 'scale': '1' }, 0.2, 2 + timeShift)

            window.tl.seek(0);
            window.tl.play();
        },

        next: function () {
            this.SaveLogosSelection();
            this.OnNext();
        },

        back: function () {
            this.SaveLogosSelection();
            this.OnBack();
        },

        SaveLogosSelection: function () {

            var arrayHasValues = false;
            for (var i = 0; i <= this.ClosingType.length; i++) {
                if (this.ClosingType[i] != undefined) {
                    arrayHasValues = true;
                    break;
                }
            }

            if (this.isNone) {
                var logo = {
                    ClosingType: new Array(7),
                    Placements: new Array(7)
                };
                amplify.store('Logo', logo);
                this.isDone = true;
            }
            else if (arrayHasValues) {
                var logo = {
                    ClosingType: this.ClosingType,
                    Placements: this.Placements
                };

                amplify.store('Logo', logo);
                this.isDone = true;
            }

            else
                this.isDone = false;


            helper.updateProgress('LogosText', this.isDone);
            helper.RemoveNextBackHandlers();
            this.removeMiscHandlers();
        },

        removeMiscHandlers: function () {
            $('#LogoNone').unbind('click');
            $('li a[title="LogosBodyTab"]').unbind('click');
            $('.SmallDDContainer .SmallDD').unbind('change');
        },

        AlterSVG: function (logo) {
            var a = document.getElementById("theSVG");
            var svgDoc = a.contentDocument;
            if (logo == '') {
                var elements = svgDoc.querySelectorAll('#Logos > g');
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i].style != null)
                        elements[i].style.display = 'none';
                }
                return;
            }

            var theElement = svgDoc.getElementById(logo);

            if (theElement == null || theElement == undefined)
                return

            theElement.style.display = 'inline';

        },

        UpdateSectionText: function () {
            $('#StepsFootHeader').text('SELECT LOGO')
            $('#StepsFootBody').text("SELECT THE LOCATION AND THE FINISHING OF YOUR COMPANY LOGO.")
        }

    }

    return LogosPage;
});