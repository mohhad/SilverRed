define('FabricsPage', [
        'jquery',
        'amplify',
        'helper'
], function ($, amplify, helper) {
    var FabricsPage;

    FabricsPage = {
        isDone:
            false,

        svgIsSHown:
            false,

        CurrentTab:
            'Protal',
        
        selectedob:
            undefined,

        selectedPants:
            undefined,

        SelectedFrom:
            '',

        SelectedFabric:
            '',

        SelectedGSM:
            '',

        SelectedUpperFab:
            '',

        SelectedLowerFab:
            '',

        SelectedUpperGSM:
            '',

        SelectedLowerGSM:
            '',

        enter: function () {

            this.CurrentTab = 'Protal';
            $('#FabricsIco .StepIcoHover').addClass('activeIco');

            $('#FabricsText .isDoneIcon').addClass('isCurrentPage');
            $('#Fabrics').fadeIn(function () {
                $(".tabs li").attr("id", "");
                $(".SubContent .InnerContent").hide();
                $(".tabs li:first").attr("id", "current");
                $('#' + $('#FabricsFirst').attr('title')).fadeIn();
                helper.SetAllReadyScripts();
            });

            $('#FabricsNextBack .Next').click(function () {
                FabricsPage.next();
            });

            $('#FabricsTabs .tabs li a').click(function () {
                FabricsPage.CurrentTab = $(this).parent().attr('title');
            });

            $('li a[title="FabricsTab"]').click(function () {
                FabricsPage.AnimateFabrics();
            });

            $('li a[title="OtherTab"]').click(function () {
                FabricsPage.AnimateOther();
            });

           
            $('.CoverallStuff .css-checkbox').click(function () {
                if (FabricsPage.SelectedFrom != '' && FabricsPage.CurrentTab != FabricsPage.SelectedFrom)
                    if (!confirm('This will replace the selection you made from the "' + FabricsPage.SelectedFrom + '" tab.')) {
                        $(FabricsPage.selectedob).prop("checked", true);
                        $(this).prop("checked", false);
                        return;
                    }
                        

                FabricsPage.selectedob = this;
                FabricsPage.SelectedFrom = FabricsPage.CurrentTab;
                FabricsPage.SelectedFabric = $(this).val();
                FabricsPage.SelectedGSM = $(this).attr('GSM');
            });

            $('.CombinationStuff .dropdown-select').change(function () {
                if (FabricsPage.SelectedFrom != '' && FabricsPage.CurrentTab != FabricsPage.SelectedFrom) {
                    if (!confirm('This will replace the selection you made from the "' + FabricsPage.SelectedFrom + '" tab.')) {
                        $(this).val('-1');
                        return;
                    }
                    else {
                        $(FabricsPage.selectedob).val('-1');
                        $(FabricsPage.selectedPants).val('-1');
                        FabricsPage.SelectedUpperFab = '';
                        FabricsPage.SelectedUpperGSM = '';
                        FabricsPage.SelectedLowerFab = '';
                        FabricsPage.SelectedLowerGSM = '';
                    }
                }

                FabricsPage.SelectedFrom = FabricsPage.CurrentTab;
                if ($(this).attr('type') == 'Jacket' || $(this).attr('type') == 'Shirt') {
                    FabricsPage.SelectedUpperFab = $(this).val();
                    FabricsPage.SelectedUpperGSM = $('option:selected', this).attr('GSM');
                    FabricsPage.selectedob = this;
                }
                else
                {
                    FabricsPage.SelectedLowerFab = $(this).val();
                    FabricsPage.SelectedLowerGSM = $('option:selected', this).attr('GSM');
                    FabricsPage.selectedPants = this;
                }
            });


            $('#FabricsScroller').jScrollPane({ autoReinitialise: true });
            this.UpdateSectionText();
            this.AnimateFabrics();
        },

        AnimateFabrics: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            if (amplify.store('theProduct') == 'Coverall') {
                $('.CombinationStuff').hide();
                window.tl.set($('.FabGen'), { 'scale': '0px' })
                window.tl.set($('.ColorSquare'), { 'width': '0px' })
                window.tl.set($('.anyHeaderFab'), { 'scale': '0px' })
                window.tl.set($('.fabricsX'), { 'scale': '0' })
                
                .staggerTo($('.anyHeaderFab'), 0.5, { 'scale': '1' }, 0.2, 1 + timeShift)
                .staggerTo($('.FabGen'), 0.5, { 'scale': '1' }, 0.2, 1.2 + timeShift)
                .staggerTo($('.ColorSquare'), 0.5, { 'width': '24px' }, 0.2, 2 + timeShift)
                .staggerTo($('.fabricsX'), 0.5, { 'scale': '1' }, 0.2, 1.75 + timeShift)
                ;
                
            }
            else {
                $('.CoverallStuff').hide();
                $('#theJacketsProtal').hide();
                $('#theShirtsProtal').hide();

                

                if(amplify.store('theProduct') == 'JacketsPants'){
                    $('#theJacketsProtal').fadeIn();                    
                }
                else {                    
                    $('#theShirtsProtal').fadeIn();
                }
                
                window.tl.set($('.anyHeaderFab1'), { 'scale': '0px' })
                window.tl.set($('.FabGen'), { 'scale': '0px' })

                .staggerTo($('.anyHeaderFab1'), 0.5, { 'scale': '1' }, 0.2, 3 + timeShift)
                .staggerTo($('.FabGen'), 0.5, { 'scale': '1' }, 0.2, 1.2 + timeShift)
                ;
               
            }

           
                

            
            

            window.tl.seek(0);
            window.tl.play();

            if (!this.svgIsSHown) {
                document.getElementById('theSVG').style.display = 'none';
                document.getElementById('theSVG').style.display = 'block';
                this.svgIsSHown = true;
            }

        },

        AnimateOther: function () {
            var timeShift = 0;
            window.tl.clear();
            window.tl

            if (amplify.store('theProduct') == 'Coverall') {
                $('.CombinationStuff').hide();
                window.tl.set($('.ColorSquare2'), { 'width': '0px' })
                window.tl.set($('.anyHeaderFab2'), { 'scale': '0px' })
                window.tl.set($('.FabGen2'), { 'scale': '0px' })
                window.tl.set($('.fabricsX2'), { 'scale': '0' })

                .staggerTo($('.anyHeaderFab2'), 0.5, { 'scale': '1' }, 0.2, 1 + timeShift)
                .staggerTo($('.FabGen2'), 0.5, { 'scale': '1' }, 0.2, 1.2 + timeShift)
                .staggerTo($('.ColorSquare2'), 0.5, { 'width': '24px' }, 0.2, 2 + timeShift)
                .staggerTo($('.fabricsX2'), 0.5, { 'scale': '1' }, 0.2, 1.75 + timeShift)

                ;
            }
            else {
                $('.CoverallStuff').hide();
                $('#theJacketsOther').hide();
                $('#theShirtsOther').hide();



                if (amplify.store('theProduct') == 'JacketsPants') {
                    $('#theJacketsOther').fadeIn();
                }
                else {
                    $('#theShirtsOther').fadeIn();
                }

                window.tl.set($('.FabGen2'), { 'scale': '0px' })
                window.tl.set($('.anyHeaderFab2'), { 'scale': '0px' })
                window.tl.set($('.anyHeaderFab3'), { 'scale': '0px' })
                
                
                .staggerTo($('.FabGen2'), 0.5, { 'scale': '1' }, 0.2, 1.2 + timeShift)
                .staggerTo($('.anyHeaderFab2'), 0.5, { 'scale': '1' }, 0.2, 1 + timeShift)
                .staggerTo($('.anyHeaderFab3'), 0.5, { 'scale': '1' }, 0.2, 3 + timeShift)
                


                
                ;

            }

            

            window.tl.seek(0);
            window.tl.play();
        },

        next: function () {
            this.SaveFabricsSelection();
            this.OnNext();
        },

        back: function () {
            this.OnBack();
        },

        SaveFabricsSelection: function () {
            if (amplify.store('theProduct') == 'Coverall')
            {
                if (this.SelectedFabric != '' && this.SelectedGSM != '') {
                    var CoverallFabric = {
                        fabric: this.SelectedFabric,
                        GSM: this.SelectedGSM
                    };
                    amplify.store('Fabric', CoverallFabric);
                    this.isDone = true;
                }
                else {
                    this.isDone = false;
                }
            }
            else if (amplify.store('theProduct') == 'ShirtsPants' || amplify.store('theProduct') == 'JacketsPants')
            {
                if (this.SelectedUpperFab != '' && this.SelectedUpperGSM != '' && this.SelectedLowerFab != '' && this.SelectedLowerGSM) {
                    var CombinedFabric = {
                        Upperfabric: this.SelectedUpperFab,
                        UpperGSM: this.SelectedUpperGSM,
                        LowerFabric: this.SelectedLowerFab,
                        LowerGSM: this.SelectedLowerGSM
                    };
                    amplify.store('Fabric', CombinedFabric);
                    this.isDone = true;
                }
                else {
                    this.isDone = false;
                }
            }
            else
            {
                this.isDone = false;
            }

            amplify.store('isOtherFabrics', this.SelectedFrom == 'Others' && this.isDone);

            if (amplify.store('isOtherFabrics') && !amplify.store('isStandard')) {
                this.resetColor();
                helper.updateProgress('ColorsText', false);
            }

            helper.updateProgress('FabricsText', this.isDone);
            helper.RemoveNextBackHandlers();
            this.RemoveMiscHandlers();
        },

        resetColor: function(){
            var a = document.getElementById("theSVG");
            var svgDoc = a.contentDocument;
            var delta = svgDoc.getElementById("Background_Colour");

            recIterate(delta);
            function recIterate(obj) {

                for (var i = 0; i < obj.childNodes.length; i++) {
                    if (obj.childNodes[i].style != null) {
                        obj.childNodes[i].style.display = "inline";
                        obj.childNodes[i].style.fill = "rgb(193, 180, 150)";
                    }
                    if (obj.childNodes[i].childNodes.length > 0)
                        recIterate(obj.childNodes[i]);
                }
            }
        },

        RemoveMiscHandlers: function () {
            $('li a[title="OtherTab"]').unbind('click');
            $('li a[title="FabricsTab"]').unbind('click');
            $('#FabricsTabs .tabs li a').unbind('click');
            $('.CoverallStuff .css-checkbox').unbind('click');
            $('.CombinationStuff .dropdown-select').unbind('change');
        },

        UpdateSectionText: function () {
            $('#StepsFootHeader').text('SELECT A FABRIC')
            $('#StepsFootBody').text('PROTAL IS OUR SUGGESTED CHOICE AS A FR SOLUTION FOR GARMENTS: BREATHABLE, GREAT MOISTURE MANAGEMENT AND DURABLE COLOR FASTNESS.')
        }
    }

    return FabricsPage;
});