define('App', [
	'jquery',
    'amplify',
    'FabricsPage',
    'ColorsPage',
    'HiViPage',
    'OptionalsPage',
    'ReflectorsPage',
    'PocketsPage',
    'LogosPage',
    'FinishPage',
    'helper'
    //'canvg'
], function ($, amplify, FabricsPage, ColorsPage, HiViPage, OptionalsPage, ReflectorsPage, PocketsPage, LogosPage, FinishPage, helper) { //, canvg
    var App;

    App = {
        currentPage:
            'Fabrics',

        theProduct:
            '',

        initialize: function () {
            this.initializeBadgeConflicts();

            $('#FullLoader').fadeIn();
            helper.ClearAmplify();
            window.tl = new TimelineMax({
                onComplete: function () {
                }
            });


            this.theProduct = this.getParameterByName('Product');

            switch (this.theProduct) {
                case 'Coverall':
                    document.getElementById('theSVG').setAttribute('data', '/SVGs/Coverall.svg');
                    break;
                case 'JacketsPants':
                    document.getElementById('theSVG').setAttribute('data', '/SVGs/Coverall.svg');
                    break;
                case 'ShirtsPants':
                    document.getElementById('theSVG').setAttribute('data', '/SVGs/Coverall.svg');
                    break;
                case 'WinterJacket':
                    document.getElementById('theSVG').setAttribute('data', '/SVGs/Coverall.svg');
                    break;
                default:
                    this.theProduct = '';
                    location.href = '/CustomizerLanding'
                    break;
            }

            amplify.store('theProduct', this.theProduct);


            this.GoToFabrics();

            $('#FabricsStep').click(function () {
                App.UpdatePage(currentPage);
                App.GoToFabrics();
            });


            $('#ColorsStep').click(function () {
                App.UpdatePage(currentPage);
                App.GoToColors();
            });

            $('#HiViStep').click(function () {
                App.UpdatePage(currentPage);
                App.GoToHiVi();
            });


            $('#ReflectorsStep').click(function () {
                App.UpdatePage(currentPage);
                App.GoToReflectors();
            });

            $('#OptionalsStep').click(function () {
                App.UpdatePage(currentPage);
                App.GoToOptionals();
            });

            $('#PocketsStep').click(function () {
                App.UpdatePage(currentPage);
                App.GoToPockets();
            });

            $('#LogosStep').click(function () {
                App.UpdatePage(currentPage);
                App.GoToLogos();
            });

            $('#FinishStep').click(function () {
                App.UpdatePage(currentPage);
                App.GoToFinish();
            });


            var a = document.getElementById("theSVG");


            $(window).resize(function () {
                var windowWidth = $(window).width();
                var svgDoc = a.contentDocument;

                if (windowWidth < 1300)
                    svgDoc.getElementsByTagName('svg')[0].style.width = '86%';
                else if (windowWidth >= 1300 && windowWidth < 1500)
                    svgDoc.getElementsByTagName('svg')[0].style.width = '75%';
                else if (windowWidth >= 1500 && windowWidth < 1800)
                    svgDoc.getElementsByTagName('svg')[0].style.width = '72%';
                else
                    svgDoc.getElementsByTagName('svg')[0].style.width = '70%';
            });

            a.onload = function () {
                var svgDoc = a.contentDocument;
                $(window).resize();
                svgDoc.getElementsByTagName('svg')[0].style.height = '100%';
                var svg = a.contentDocument;


                var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
                if (isSafari) {
                    var Elements = svg.querySelectorAll('#Shadows');
                    if (Element != '' && Element != null && Element != undefined)
                        App.removeUnwanted(Elements);
                }

                var delta = svgDoc.getElementById("Background_Colour");

                var Elements = svgDoc.querySelectorAll("#Shadows > #Back > g > g:first-child");
                App.removeUnwanted(Elements);

                var Elements = svgDoc.querySelectorAll("#Shadows > #Front > g > g:first-child");
                App.removeUnwanted(Elements);

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

                Elements = svg.querySelectorAll('#Hi_Vi > g');
                App.setDisplays(Elements);

                Elements = svg.querySelectorAll('#Reflectors_1_inch > g');
                App.setDisplays(Elements);

                Elements = svg.querySelectorAll('#Reflectors_2_inch > g');
                App.setDisplays(Elements);

                Elements = svg.querySelectorAll('#Reflectors_2_inch_Yellow > g');
                App.setDisplays(Elements);

                Elements = svg.querySelectorAll('#Pockets > g');
                App.setDisplays(Elements);

                Elements = svg.querySelectorAll('#Optionals > g');
                App.setDisplays(Elements);

                Elements = svg.querySelectorAll('#Logos > g');
                App.setDisplays(Elements);

                $('#FullLoader').fadeOut();

                setTimeout(function () {
                    $('#DevStages p').addClass('animateMarq');
                }, 1000);
            }



        },

        initializeBadgeConflicts: function () {
            window.badgeConflicts = {
                leftChestNameBadge: false,
                rightChestNameBadge: false,
                leftChestHSEBadge: false,
                rightChestHSEBadge: false,
                leftChestLogoBadge: false,
                rightChestLogoBadge: false
                //leftArm: false,
                //rightArm: false
            };

            
        },

        removeUnwanted: function (Elements) {
            Array.prototype.forEach.call(Elements, function (node) {
                node.parentNode.removeChild(node);
            });
        },

        setDisplays: function (Elements) {
            Array.prototype.forEach.call(Elements, function (node) {
                node.style.display = 'none';
            });
        },

        getParameterByName: function (name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },

        GoToFabrics: function () {
            var that = this;
            helper.HideAllContent();
            helper.removeActiveButton();
            helper.RemoveNextBackHandlers();
            FabricsPage.OnNext = function () {
                that.GoToColors();
            }
            FabricsPage.OnBack = function () {

            }
            currentPage = 'Fabrics';
            helper.ChangeStepsFooterContent(currentPage);
            FabricsPage.enter();
        },

        GoToColors: function () {
            var that = this;

            helper.HideAllContent();
            helper.removeActiveButton();
            helper.RemoveNextBackHandlers();
            ColorsPage.OnNext = function () {
                that.GoToHiVi();
            }
            ColorsPage.OnBack = function () {
                that.GoToFabrics();
            }
            currentPage = 'Colors';
            helper.ChangeStepsFooterContent(currentPage);
            ColorsPage.enter();
        },

        GoToHiVi: function () {
            var that = this;

            helper.HideAllContent();
            helper.removeActiveButton();
            helper.RemoveNextBackHandlers();
            HiViPage.OnNext = function () {
                that.GoToReflectors();
            }
            HiViPage.OnBack = function () {
                that.GoToColors();
            }
            currentPage = 'HiVI';
            helper.ChangeStepsFooterContent(currentPage);
            HiViPage.enter();
        },

        GoToReflectors: function () {
            var that = this;

            helper.HideAllContent();
            helper.removeActiveButton();
            helper.RemoveNextBackHandlers();
            ReflectorsPage.OnNext = function () {
                that.GoToPockets();
            }
            ReflectorsPage.OnBack = function () {
                that.GoToHiVi();
            }
            currentPage = 'Reflectors';
            helper.ChangeStepsFooterContent(currentPage);
            ReflectorsPage.enter();
        },

        GoToPockets: function () {
            var that = this;

            helper.HideAllContent();
            helper.removeActiveButton();
            helper.RemoveNextBackHandlers();
            PocketsPage.OnNext = function () {
                that.GoToOptionals();
            }
            PocketsPage.OnBack = function () {
                that.GoToReflectors();
            }
            currentPage = 'Pockets';
            helper.ChangeStepsFooterContent(currentPage);
            PocketsPage.enter();
        },

        GoToOptionals: function () {
            var that = this;

            helper.HideAllContent();
            helper.removeActiveButton();
            helper.RemoveNextBackHandlers();
            OptionalsPage.OnNext = function () {
                that.GoToLogos();
            }
            OptionalsPage.OnBack = function () {
                that.GoToPockets();
            }
            currentPage = 'Optionals';
            helper.ChangeStepsFooterContent(currentPage);
            OptionalsPage.enter();
        },

        GoToLogos: function () {
            var that = this;

            helper.HideAllContent();
            helper.removeActiveButton();
            helper.RemoveNextBackHandlers();
            LogosPage.OnNext = function () {
                that.GoToFinish();
            }
            LogosPage.OnBack = function () {
                that.GoToOptionals();
            }
            currentPage = 'Logos';
            helper.ChangeStepsFooterContent(currentPage);
            LogosPage.enter();
        },

        GoToFinish: function () {
            var that = this;

            helper.HideAllContent();
            helper.removeActiveButton();
            helper.RemoveNextBackHandlers();

            currentPage = 'Finish'
            FinishPage.enter();
        },

        UpdatePage: function (currentPage) {
            $('#theSVG').css('visibility', 'visible');
            if (currentPage == 'Fabrics') {
                FabricsPage.SaveFabricsSelection();
            }
            else if (currentPage == 'Colors') {
                ColorsPage.SaveColorSelection();
            }
            else if (currentPage == 'HiVI') {
                HiViPage.SaveHiViSelection();
            }
            else if (currentPage == 'Reflectors') {
                ReflectorsPage.SaveReflectorsSelection();
            }
            else if (currentPage == 'Optionals') {
                OptionalsPage.SaveOptionalsSelection();
            }
            else if (currentPage == 'Pockets') {
                PocketsPage.SavePocketsSelection();
            }
            else if (currentPage == 'Logos') {
                LogosPage.SaveLogosSelection();
            }
            else if (currentPage == 'Finish') {
                FinishPage.SaveFinishEntries();
            }
        }

    }

    return App;

});