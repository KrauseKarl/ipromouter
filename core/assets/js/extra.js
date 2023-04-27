/*************************************************/
/*                 INDEX                         */
/*=================================================
 *     01.  SEARCH CITIES LIST                    *
 *     02.  CHOSEN CITIES BUTTONS                 *
 *     03.  CONTACT MESSAGE  FORM                 *
 *     04.  CONTACT MESSAGE VALIDATOR             *
 *     05.  PHONE NUMBER  VALIDATOR               *
 *     06.  COPY PHONE NUMBER + TOASTER           *
 *     07.  COPY E-MAIL   + TOASTER               *
 *     08.  NAVBAR SERVICES ACCORDION             *
 =================================================*/




// 01. SEARCH CITIES LIST
$(document).ready(function ()  {
    var options = {
            valueNames: ['name']
        };
    var userList = new List('ru_all_cities', options)
});

// 02. CHOSEN CITIES BUTTONS
$(document).ready(function () {
    var $kz_cities = $('#kz_cities').hide();
    var $ru_big = $('#ru_big_cities').show();
    var $ru_all = $('#ru_all_cities').hide();

    $('#ru_big_cities_btn').addClass('btn-success  p-1 rounded')
    $('#ru_all_cities_btn').removeClass('btn-success  p-1 rounded')
    $('#kz_cities_btn').removeClass('btn-success  p-1 rounded' )

    $('#kz_cities_btn').on('click', function () {
        $kz_cities.show('slow')
        $('#kz_cities_btn').addClass('btn-success  p-1 rounded');
        $('#ru_all_cities_btn').removeClass('btn-success  p-1 rounded');
        $('#ru_big_cities_btn').removeClass('btn-success  p-1 rounded');
        $ru_big.hide('slow')
        $ru_all.hide('slow')
    });
    $('#ru_all_cities_btn').on('click', function () {
    console.log($('#search').val(''))
        $('#search').val('');
//
        $kz_cities.hide('slow');
        $ru_big.hide('slow');
        $ru_all.show('slow');
        $('#ru_all_cities_btn').addClass('btn-success  p-1 rounded');
        $('#kz_cities_btn').removeClass('btn-success  p-1 rounded');
        $('#ru_big_cities_btn').removeClass('btn-success  p-1 rounded');

    });
    $('#ru_big_cities_btn').on('click', function () {
        $kz_cities.hide('slow')
        $ru_big.show('slow')
        $ru_all.hide('slow')
        $('#ru_big_cities_btn').addClass('btn-success  p-1 rounded');
        $('#ru_all_cities_btn').removeClass('btn-success  p-1 rounded');
        $('#kz_cities_btn').removeClass('btn-success  p-1 rounded');
    });
});

// 03. CONTACT MESSAGE  FORM
$('#message_form').on('submit', function (event) {
    $("#error-msg").css('opacity', '0');
     validateForm()
     event.preventDefault();
});

// 04. MESSAGE VALIDATOR
function validateForm() {
    $('#success_send').addClass('invisible');
    var name = $("#name").val();
    var email = $("#email").val();
    var subject = $("#subject").val();
    var comments = $("#comments").val();
    $("#error-msg").css('opacity', '0');
    $('#error-msg').html("");
    if (name == "" || name == null) {
        $('#error-msg').html("<div class='text-danger alert alert-warning error_message'>*Please enter a Name*</div>");
        $('#error-msg').css('opacity', '1');
        return false;
    }
    if (email == "" || email == null) {
        $('#error-msg').html("<div class='alert alert-warning error_message'>*Please enter a Email*</div>");
        $('#error-msg').css('opacity', '1');
        return false;
    }
    if (subject == "" || subject == null) {
        $('#error-msg').html("<div class='alert alert-warning error_message'>*Please enter a Subject*</div>");
        $('#error-msg').css('opacity', '1');
        return false;
    }
    if (comments == "" || comments == null) {
        $('#error-msg').html("<div class='alert alert-warning error_message'>*Please enter a Comments*</div>");
        $('#error-msg').css('opacity', '1');
        return false;
    }
    $.ajax({
        url: "/contact",
        type: 'post',
        dataType: 'json',
        data: $('form#message_form').serialize(),
        success: function (response) {
            console.log('you did it!')
            if (response.message == true) {
                $('#message_form').css('display', 'none ')
                $('#success_send').removeClass('invisible')
                setTimeout(function () {
                    $('#success_send').addClass('invisible');
                    $('#message_form').css('display', 'block ');
                        $("#name").val("");
                    $("#email").val("");
                    $("#subject").val("");
                    $("#comments").val("");
                    $('#contactform').modal('hide');
    }, 3000);
            } else {
                alert('error')
            };
            },
    });
  }

// 05. PHONE NUMBER VALIDATOR
$(document).ready(function() {
$("#telephone").mask("+7 (999) 999-99-99");
});

// 06. COPY PHONE NUMBER + TOASTER
$('#copyPhoneBtn').on('click', function () {
    var info = $(this).val()
    navigator.clipboard.writeText(info)
    .then(() => {
    })
    .catch(err => {
    });
    $('#copyPhoneToast').show('slow');
    setTimeout(() => {
    $('#copyPhoneToast').hide('slow');
    }, 2000);
})

// 07. COPY E-MAIL + TOASTER
$('#copyMailBtn').on('click', function () {
     var info = $(this).val()
    navigator.clipboard.writeText(info)
    .then(() => {
    })
    .catch(err => {
    });
    $('#copyMailToast').show('slow');
    setTimeout(() => {
    $('#copyMailToast').hide('slow');
    }, 2000);
})


// 08. NAVBAR SERVICES ACCORDION


