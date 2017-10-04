$(function () {
    // Menu
    $(".nav-hamburguer").on("click", function (e) {
        e.preventDefault();
        $("#hamburger-menu").toggleClass("active");
        $("#menu-overlay").toggleClass("hidden");
    });

    $("#hamburger-x").on("click", function (e) {
        e.preventDefault();
        $("#hamburger-menu").removeClass("active");
        $("#menu-overlay").addClass("hidden");
    });

    $("#menu-overlay").on("click", function () {
        $("#hamburger-menu").removeClass("active");
        // $("#hamburger").children().removeClass('toClose').addClass('toOpen');
        $("#menu-overlay").addClass("hidden");
    });

    $(document).keyup(function (esc) {
        if (esc.keyCode == 27) { // escape key maps to keycode `27`
            $("#hamburger-menu").removeClass("active");
            $("#menu-overlay").addClass("hidden");
            // $("#hamburger").children().removeClass('toClose').addClass('toOpen');
        }
    });

    // Formulário
    $(".botao-formulario").on("click", function (e) {
        e.preventDefault();
        $(this).parent(".col-xs-6").parent(".row").find(".botao-formulario").removeClass("selecionado");
        // .blur() tira o foco (focus) do elemento
        $(this).addClass("selecionado").blur();
        if ($(this).hasClass("transfer-out")) {
            $("#label-embarque-desembarque").text("Local de embarque");
        } else if ($(this).hasClass("transfer-in")) {
            $("#label-embarque-desembarque").text("Local de desembarque");
        }
    });

    $(".ativar-endereco-completo").click(function () {
        $(".endereco-completo").toggleClass("hidden");
    })

    $("span.label-checkbox").click(function () {
        if ($(this).siblings("input").is(":checked")) {
            $(this).siblings("input").prop('checked', false);
        } else {
            $(this).siblings("input").prop('checked', true);
        }
    });

    // Container
    function containerization() {
        if ($(window).width() > 768) {
            $(".desktop-containerization").addClass("container");
        } else {
            $(".desktop-containerization").removeClass("container");
        }
    }

    containerization();
    $(window).resize(function (event) {
        containerization();
    });

    // Malas
    //plugin bootstrap minus and plus
    //http://jsfiddle.net/laelitenetwork/puJ6G/
    $('.btn-number').click(function (e) {
        e.preventDefault();

        fieldName = $(this).attr('data-field');
        type = $(this).attr('data-type');
        var input = $("input[name='" + fieldName + "']");
        var currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if (type == 'minus') {

                if (currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if (parseInt(input.val()) == input.attr('min')) {
                    $(this).attr('disabled', true);
                }

            } else if (type == 'plus') {

                if (currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                }
                if (parseInt(input.val()) == input.attr('max')) {
                    $(this).attr('disabled', true);
                }

            }
        } else {
            input.val(0);
        }
        $(this).blur();
    });

    $('.input-number').focusin(function () {
        $(this).data('oldValue', $(this).val());
    });

    $('.input-number').change(function () {

        minValue = parseInt($(this).attr('min'));
        maxValue = parseInt($(this).attr('max'));
        valueCurrent = parseInt($(this).val());

        name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(".btn-number[data-type='minus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Valor mínimo alcançado');
            $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".btn-number[data-type='plus'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            alert('Valor máximo alcançado');
            $(this).val($(this).data('oldValue'));
        }

    });

    $(".input-number").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    //$('.hora-mask').inputmask("hh:mm", {
    //    placeholder: "HH:MM",
    //    insertMode: false,
    //    showMaskOnHover: false,
    //    hourFormat: 24
    //});

    function replaceBadInputs(val) {
        // Replace impossible inputs as they appear
        console.log("entrou");
        val = val.replace(/[^\dh:]/, "");
        val = val.replace(/^[^0-2]/, "");
        val = val.replace(/^([2-9])[4-9]/, "$1");
        val = val.replace(/^\d[:h]/, "");
        val = val.replace(/^([01][0-9])[^:h]/, "$1");
        val = val.replace(/^(2[0-3])[^:h]/, "$1");
        val = val.replace(/^(\d{2}[:h])[^0-5]/, "$1");
        val = val.replace(/^(\d{2}h)./, "$1");
        val = val.replace(/^(\d{2}:[0-5])[^0-9]/, "$1");
        val = val.replace(/^(\d{2}:\d[0-9])./, "$1");
        return val;
    }

    // Apply input rules as the user types or pastes input
    $('.hora-mask').keyup(function () {
        var val = this.value;
        var lastLength;
        do {
            // Loop over the input to apply rules repeately to pasted inputs
            lastLength = val.length;
            val = replaceBadInputs(val);
        } while (val.length > 0 && lastLength !== val.length);
        this.value = val;
    });

    // Check the final result when the input has lost focus
    $('.hora-mask').blur(function () {
        var val = this.value;
        val = (/^(([01][0-9]|2[0-3])h)|(([01][0-9]|2[0-3]):[0-5][0-9])$/.test(val) ? val : "");
        this.value = val;
    });



    // Calendário
    //$( function() {
    //    $( "#datepicker" ).datepicker({
    //        minDate: 0,
    //        maxDate: "+1Y",
    //        todayHighlight: true,
    //        /*
    //         * Tradução do calendário para o português
    //         */
    //        dateFormat: 'dd/mm/yy',
    //        dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    //        dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
    //        dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
    //        monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    //        monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    //        nextText: 'Próximo',
    //        prevText: 'Anterior'
    //        /* Fim da tradução */
    //    });
    //});
});

function OpenReport(params) {
    var w = window.open(String.format('{0}Report?p={1}', window.BASEURL, params), '', 'width=' + (screen.availWidth - 10) + ',height=' + (screen.availHeight - 30) + ',top=0,left=0,resizable=yes,status=no,scrollbars=yes');
    if (w == null) {
        alert("Desabilite o bloqueador de popup!");
    }
}
