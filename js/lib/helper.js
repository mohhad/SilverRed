define('helper', ['jquery', 'amplify'], function ($, amplify) {
    var helper;

    helper = {
        SetAllReadyScripts: function () {
            $(".tabs li:first").attr("id", "current");
            $('.tabs a').click(function (e) {
                e.preventDefault();
                $(".SubContent .InnerContent").hide();
                $(".tabs li").attr("id", "");
                $(this).parent().attr("id", "current");
                $('#' + $(this).attr('title')).fadeIn();
            });

            $("input.css-checkbox:checkbox:not([name='Enforcements'])").click(function () {
                //if ($(this).is(":checked")) {
                    var group = "input:checkbox[name='" + $(this).attr("name") + "']";
                    $(group).prop("checked", false);
                    $(this).prop("checked", true);
                //} else {
                 //   $(this).prop("checked", false);
                //}
            });

            

            //$("input.ColorCheckbox:checkbox").click(function () {
            //    if ($(this).is(":checked")) {
            //        var group = "input:checkbox[name='" + $(this).attr("name") + "']";
            //        $(group).prop("checked", false);
            //        $(this).prop("checked", true);
            //    } else {
            //        $(this).prop("checked", false);
            //    }
            //});

            //$("input.HiViCheckbox:checkbox").click(function () {
            //    if ($(this).is(":checked")) {
            //        var group = "input:checkbox[name='" + $(this).attr("name") + "']";
            //        $(group).prop("checked", false);
            //        $(this).prop("checked", true);
            //    } else {
            //        $(this).prop("checked", false);
            //    }
            //});

            //$("input.OptionalsChkBx:checkbox").click(function () {
            //    if ($(this).is(":checked")) {
            //        var group = "input:checkbox[name='" + $(this).attr("name") + "']";
            //        $(group).prop("checked", false);
            //        $(this).prop("checked", true);
            //    } else {
            //        $(this).prop("checked", false);
            //    }
            //});
        },

        setTheTabs: function(){
            $(".tabs li:first").attr("id", "current");
            $('.tabs a').click(function (e) {
                e.preventDefault();
                $(".SubContent .InnerContent").hide();
                $(".tabs li").attr("id", "");
                $(this).parent().attr("id", "current");
                $('#' + $(this).attr('title')).fadeIn();
            });
        },

        HideAllContent: function () {
            $('#Fabrics').fadeOut();
            $('#Colors').fadeOut();
            $('#HiVi').fadeOut();
            $('#Reflectors').fadeOut();
            $('#Optionals').fadeOut();
            $('#Pockets').fadeOut();
            $('#Logos').fadeOut();
            $('#Finish').fadeOut();
        },

        removeActiveButton: function () {
            $(".StepIcoHover").removeClass('activeIco');
        },

        RemoveNextBackHandlers: function () {
            $('#FabricsNextBack .Next').unbind('click');
            $('#FabricsNextBack .Back').unbind('click');
            $('#ColorsNextBack .Next').unbind('click');
            $('#ColorsNextBack .Back').unbind('click');
            $('#HiViNextBack .Next').unbind('click');
            $('#HiViNextBack .Back').unbind('click');
            $('#ReflectorsNextBack .Next').unbind('click');
            $('#ReflectorsNextBack .Back').unbind('click');
            $('#OptionalsNextBack .Next').unbind('click');
            $('#OptionalsNextBack .Back').unbind('click');
            $('#PocketsNextBack .Next').unbind('click');
            $('#PocketsNextBack .Back').unbind('click');
            $('#LogosNextBack .Next').unbind('click');
            $('#LogosNextBack .Back').unbind('click');

        },

        updateProgress: function (iconID, pageState) {
            if (pageState) {
                $('#' + iconID + " .isDoneIcon").removeClass('isCurrentPage');
                $('#' + iconID + " .isDoneIcon").addClass('isDone');
            }
            else {
                $('#' + iconID + " .isDoneIcon").addClass('isCurrentPage');
                $('#' + iconID + " .isDoneIcon").removeClass('isDone');
            }
        },

        removeAllCurrentPages: function () {
            $('.isDoneIcon').removeClass('isCurrentPage');
        },

        
        ClearAmplify: function () {
            amplify.store('Fabric', '');
            amplify.store('Color', '');
            amplify.store('HIVI', '');
            amplify.store('reflectors', '');
            amplify.store('Pockets', '');
            amplify.store('optionals', '');
            amplify.store('Logo', '');
            amplify.store('theProduct', '');
            amplify.store('pocketColor', '');
            amplify.store('armPocketColor', '')
            amplify.store('selectedPocket', '');
            amplify.store('isOtherFabrics', '');
            amplify.store('selectedArmPocket', '');
        },

        ChangeStepsFooterContent: function (Page) {
            var HeaderText = '',
                BodyText = '';
            switch (Page)
            {
                case "Fabrics":
                    break;

                case "Colors":
                    break;

                case "HiVI":
                    break;

                case "Reflectors":
                    break;

                case "Optionals":
                    break;

                case "Pockets":
                    break;

                case "Logos":
                    break;
            }
        }

    }
    return helper;
});
