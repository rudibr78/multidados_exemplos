//noconflict para caso quisermos atualizar o jquery do app no futuro
var $1 = jQuery.noConflict();

﻿CP = {online: true};
CP.jsv = Math.ceil(Math.random() * 999999999999999) + 1;
CP.APP_NAME = 'multidados_exemplos';

//cookie para debug
if (document.cookie.toString().indexOf('RDD=RDD') === -1) {
    CP.URL_API = 'http://h1.multidadosti.com.br:8080/m_apps/multidados_exemplosw/';
    CP.URL_APP = 'http://h1.multidadosti.com.br:8080/m_apps/multidados_exemplosw/';
    CP.URL_PUB = 'http://h1.multidadosti.com.br:8080/m_apps/public/';
} else {
    CP.URL_APP = 'http://127.0.0.1/m_apps/multidados_exemplosw/';
    CP.URL_API = 'http://127.0.0.1/m_apps/multidados_exemplosw/';
    CP.URL_PUB = 'http://127.0.0.1/m_apps/public/';
}

MSG_SEM_NET = "Sua conexão com a internet parece estar desligada. Por favor verifique sua conexão e tente de novo.";

function app_connected() {
    if (typeof navigator == 'undefined' || typeof Connection == 'undefined')
        return true;

    //API antiga (com .network.)
    if (typeof navigator.network != 'undefined'
            && typeof navigator.network.connection != 'undefined'
            && typeof navigator.network.connection.type != 'undefined'
            && navigator.network.connection.type == Connection.NONE)
        return false;

    //nova API (direto em navigator.connection)
    if (typeof navigator.connection != 'undefined'
            && typeof navigator.connection.type != 'undefined'
            && navigator.connection.type == Connection.NONE)
        return false;

    return true;
}

function load_ini_script() {
    $1('#divsemnet').remove();

    $1('body').css({display: 'none', visibility: 'hidden'});

    $1('html').css({backgroundColor: '#FFF'
        , backgroundImage: 'url("' + CP.URL_APP + 'imgs/splash_loading.png")'
        , backgroundRepeat: 'no-repeat'
        , backgroundAttachment: 'fixed'
        , backgroundPosition: 'center'});

    $1('head').append('<script' + ' type="text/javascript"' + ' src="' + CP.URL_APP + 'js/app.js?v=' + CP.jsv + '"' + '><' + '/' + 'script>');

    window.load_ini_script_interval = window.setInterval(function() {
        if ($1('body').hasClass('ui-mobile-viewport')) {//verificao confiavel que o jqm terminou de renderizar

            $1('html').css({backgroundColor: ''
                , backgroundImage: ''
                , backgroundRepeat: ''
                , backgroundAttachment: ''
                , backgroundPosition: ''});

            $1('body').css({display: '', visibility: 'visible'});

            window.clearInterval(window.load_ini_script_interval);
        }
    }, 100);
}

$1(function() {
    var wait_one_int = true;
    if (app_connected()) {
        load_ini_script();
    } else {
        var init_interval = window.setInterval(function() {
            if (app_connected()) {
                load_ini_script();
                window.clearInterval(init_interval);
            } else {
                if (wait_one_int) {
                    wait_one_int = false;
                } else {
                    $1('#divsemnet').remove();
                    $1('body').append('<div id="divsemnet" style="font-family:Arial">' + MSG_SEM_NET + '</div>');
                }
            }
        }, 1000);
    }
});