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
$(document).ready(function() {
    $('#search').on('change', function(){
        cleanCities()
        var query = $(this).val().toLowerCase().trim()
        if(query != ''){
            queryString(query);
        } else {
            backCities();
        };
    });
});
$(document).ready(function() {
    $('#clean_city').on('click', function(){
      backCities();
      $('#search').val('')
    });
});



function queryString(query) {
    var counterCity = 0
    $('button.accordion-button').each(function() {
        var parent = $(this)
        var region = $(this).data('value')
        var cityArray = $(this).data('cities') + ', '+ region + ''
        var result = cityArray.replace('[', '').replace(']', '').replaceAll("\'", '').split(',')
        $.each(result, function(index, value){
            if(value.indexOf(query) == 1 || region == query ){
                counterCity += 1
                parent.parents('.listt.col-lg-4.col-md-12.mb-2').removeClass('invisible');
                parent.parents('.accordion-item').children('.accordion-collapse.collapse').removeClass('collapse').addClass('collapsed')
                var allCities = parent.parents('.accordion-item')
                var childrenLi = $('span.city.fs-6')
                $.each(childrenLi, function(index, res){
                    var town = $(this).text().toLowerCase()
                    var spanTown = $(this)
                    if(town.indexOf(query) == 0){
                        spanTown.removeClass('fs-6').addClass('bg-primary fs-3 rounded px-2 py-1 text-light')
                    } else {
                        spanTown.removeClass('fs-3 bg-primary rounded px-2 py-1 text-light').addClass('fs-6')
                    };
                });
              return false;
            } else {
                parent.parents('.listt.col-lg-4.col-md-12.mb-2').addClass("invisible");
                parent.parents('.accordion-item').children('.accordion-collapse.collapsed').removeClass('collapsed').addClass('collapse')
            }; // if
        }); // each
    }); // each
     if(counterCity < 1){
        htmlStr = '<div>По запросу "'+ query +'" ничего не найдено</div>'
        $('#search_result').html(htmlStr).css('display','block')
     };
}; // queryString

function cleanCities() {
$('button.accordion-button').each(function() {
      var childrenLi = $('span.city.fs-3.bg-primary.rounded.px-2.py-1.text-light')
      $.each(childrenLi, function(index, res){
        var town = $(this)
        town.removeClass('fs-3 bg-primary rounded px-2 py-1 text-light').addClass('fs-6')
      });
    });
};

function backCities() {
    $('button.accordion-button').each(function() {
      var parent = $(this)
      parent.parents('.col-lg-4.col-md-12.mb-2.invisible').removeClass('invisible');
      parent.parents('.accordion-item').children('.accordion-collapse.collapsed').removeClass('collapsed').addClass('collapse')
      $('#search_result').css('display','none')
      var childrenLi = $('span.city.fs-3.bg-primary.rounded.px-2.py-1.text-light')
      $.each(childrenLi, function(index, res){
        var town = $(this)
        town.removeClass('fs-3 bg-primary rounded px-2 py-1 text-light').addClass('fs-6')
      });
    });
};



// 02. CHOSEN CITIES BUTTONS
$(document).ready(function () {
    var $kz_cities = $('#kz_cities').hide();
    var $ru_big = $('#ru_big_cities').show();
    var $ru_all = $('#ru_all_cities').hide();

    $('#ru_big_cities_btn').addClass('btn-primary  p-1 rounded')
    $('#ru_all_cities_btn').removeClass('btn-primary  p-1 rounded')
    $('#kz_cities_btn').removeClass('btn-primary  p-1 rounded' )

    $('#kz_cities_btn').on('click', function () {
        $kz_cities.show('slow')
        $('#kz_cities_btn').addClass('btn-primary  p-1 rounded');
        $('#ru_all_cities_btn').removeClass('btn-primary  p-1 rounded');
        $('#ru_big_cities_btn').removeClass('btn-primary  p-1 rounded');
        $ru_big.hide('slow')
        $ru_all.hide('slow')
    });
    $('#ru_all_cities_btn').on('click', function () {
        $('#search').val('');
//
        $kz_cities.hide('slow');
        $ru_big.hide('slow');
        $ru_all.show('slow');
        $('#ru_all_cities_btn').addClass('btn-primary  p-1 rounded');
        $('#kz_cities_btn').removeClass('btn-primary  p-1 rounded');
        $('#ru_big_cities_btn').removeClass('btn-primary  p-1 rounded');

    });
    $('#ru_big_cities_btn').on('click', function () {
        $kz_cities.hide('slow')
        $ru_big.show('slow')
        $ru_all.hide('slow')
        $('#ru_big_cities_btn').addClass('btn-primary  p-1 rounded');
        $('#ru_all_cities_btn').removeClass('btn-primary  p-1 rounded');
        $('#kz_cities_btn').removeClass('btn-primary  p-1 rounded');
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
    var telephone = $("#telephone").val();
    var subject = $("#subject").val();
    var comments = $("#comments").val();
    $("#error-msg").css('opacity', '0');
    $('#error-msg').html("");
    if (name == "" || name == null) {
        $('#error-msg').html("<div class='text-danger alert alert-warning error_message'>* поле 'имя' обязательно *</div>");
        $('#error-msg').css('opacity', '1');
        return false;
    }
    if (email == "" || email == null) {
        $('#error-msg').html("<div class='alert alert-warning error_message'>* поле 'электронный адрес' обязательно *</div>");
        $('#error-msg').css('opacity', '1');
        return false;
    }
    if (telephone == "" || telephone == null) {
        $('#error-msg').html("<div class='alert alert-warning error_message'>* поле 'телефон' обязательно *</div>");
        $('#error-msg').css('opacity', '1');
        return false;
    }
    if (subject == "" || subject == null) {
        $('#error-msg').html("<div class='alert alert-warning error_message'>* поле 'тема' обязательно *</div>");
        $('#error-msg').css('opacity', '1');
        return false;
    }
    if (comments == "" || comments == null) {
        $('#error-msg').html("<div class='alert alert-warning error_message'>* поле 'сообщение' обязательно *</div>");
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
