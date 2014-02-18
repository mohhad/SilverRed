requirejs.config({
    baseUrl: './js',
    waitSeconds: 0,
    shim: {
        'App': {
            deps: ['jquery', 'jqueryUI', 'JquerySlider', 'tweenmax', 'timelinemax', 'fabric']
        },
        'jqueryUI': {
            deps: ['jquery']
        },
        'JquerySlider': {
            deps: ['jquery']
        },
        'amplify':{
            deps: ['jquery'],
            exports: 'amplify'
        },
        //'canvg': {
        //    exports: 'canvg'
        //},
        'Scroller': {
            deps: ['MouseWheel']
        }
    },
    paths: {
        lib: 'lib',
        'App': 'app',
        'FabricsPage': 'states/FabricsPage',
        'ColorsPage': 'states/ColorsPage',
        'HiViPage': 'states/HiViPage',
        'OptionalsPage': 'states/OptionalsPage',
        'ReflectorsPage': 'states/ReflectorsPage',
        'PocketsPage': 'states/PocketsPage',
        'LogosPage': 'states/LogosPage',
        'FinishPage': 'states/FinishPage',
        'helper': 'lib/helper',

        'jquery': 'lib/jquery-1.8.2.min',
        'jqueryUI': 'lib/jquery-ui.min',
        'JquerySlider': 'lib/simple-slider.min',
        'Overlay': 'lib/jsOverlay.min',
        'Scroller': 'lib/jscrollpane.min',
        'fabric': 'lib/fabric.min',
        'MouseWheel': 'lib/jquery.mousewheel.min',
        'spectrum': 'lib/spectrum.min',
        'amplify': 'lib/amplify.min',
        //'canvg': 'lib/canvg',
        'tweenmax': 'lib/timeline/TweenMax.min',
        'timelinemax': 'lib/timeline/TimelineMax.min',
        'tweenEase': 'lib/timeline/EasePack.min',
        'tweenCssPlugin': 'lib/timeline/CSSPlugin.min'

    },
    urlArgs: "bust=" + (new Date()).getTime()
});

require(['App'], function (App) {    
    App.initialize();
});
