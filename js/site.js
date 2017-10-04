$(function () {
    /**
     * Parte do dropdown do menu desktop
     **/
    $(".dropdown-slave").css('maxWidth', $(".dropdown-master").outerWidth());
    setTimeout(function () {
        $(".dropdown-slave").css('maxWidth', $(".dropdown-master").outerWidth());
    }, 5000);
    setTimeout(function () {
        $(".dropdown-slave").css('maxWidth', $(".dropdown-master").outerWidth());
    }, 7000);
    $(".dropdown-master").hover(
        function () {
            $(".dropdown-slave").removeClass("hidden");
        }
    );
    $(".dropdown-master").click(
        function (e) {
            e.preventDefault();
            $(".dropdown-slave").removeClass("hidden");
        }
    );
    $(".dropdown-master").mouseleave(function () {
        $(".dropdown-slave").addClass("hidden");
    });
    $("body").click(function () {
        $(".dropdown-slave").addClass("hidden");
    });

    /**
     * Ajustar a altura do background da index
     **/
    function adjustHeightIndexBg() {
        $(".background-index").css("height", $(".background-index-height").outerHeight());
    }
    adjustHeightIndexBg();
    $(window).resize(function () {
        adjustHeightIndexBg();
    });

    /**
     * Esconder a navegação mobile ao clicar nele ou no "x" da navigation-drawer
     **/
    $(".navigation-mobile-overlay, .navigation-drawer .fa-times").click(function () {
        $(".navigation-mobile-overlay").addClass("hidden", { duration: 300 });
        $("body").removeClass("overflow-hidden", { duration: 300 });
        $(".navigation-drawer").removeClass("pulled-drawer", { duration: 300 });
    });

    /**
     * Esconder a navegação mobile ao apertar esc
     **/
    $(document).keyup(function (e) {
        if (e.keyCode == 27) { // escape key maps to keycode `27`
            $(".navigation-mobile-overlay").addClass("hidden", { duration: 300 });
            $("body").removeClass("overflow-hidden", { duration: 300 });
            $(".navigation-drawer").removeClass("pulled-drawer", { duration: 300 });
        }
    });

    /**
     * Abre a navegação mobile ao clicar no ícone de hamburguer (.fa-bars)
     **/
    $(".navigation-mobile .fa-bars").on("click", function () {
        $(".navigation-mobile-overlay").toggleClass("hidden", { duration: 300 });
        $(".navigation-drawer").addClass("pulled-drawer", { duration: 300 });
        $("body").addClass("overflow-hidden", { duration: 300 });
    });
});

