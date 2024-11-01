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
 *     09. HEADHUNTER MESSAGE FORM                *
 =================================================*/




// 01. SEARCH CITIES LIST
$(document).ready(function() {
    $('#search').on('change', function(){
        cleanCities()

        var query = $(this).val().toLowerCase().trim()
        if(query != ''){
            queryString(query);
             $("#clean_city").removeClass("invisible");
             $("#search-bottom").addClass("invisible");
        } else {
            backCities();
             $("#clean_city").addClass("invisible");
             $("#search-bottom").removeClass("invisible");
        };
    });
});
$(document).ready(function() {
    $('#clean_city').on('click', function(){
        backCities();
        $("#clean_city").addClass("invisible");
        $("#search-bottom").removeClass("invisible");
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
                console.log(region, value.indexOf(query))
                counterCity += 1
                parent.parents('.city-list.col-lg-4.col-md-12.mb-2').removeClass('invisible');
                parent.parents('.accordion-item').children('.accordion-collapse.collapse').addClass('show')
                var allCities = parent.parents('.accordion-item')
                var childrenLi = $('li.city')

                $.each(childrenLi, function(index, res){
                    var town = $.trim($(this).text().toLowerCase())
                    var spanTown = $(this)
                    if(town.indexOf(query) == 0){
                         $(this).addClass('bg-warning rounded px-2 py-1 text-light');
                    } else {
                         $(this).removeClass('bg-warning rounded px-2 py-1 text-light');
                    };
                });
              return false;
            } else {
                parent.parents('.city-list.col-lg-4.col-md-12.mb-2').addClass("invisible");
                parent.parents('.accordion-item').children('.accordion-collapse.collapse.show').removeClass('show')
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
      var childrenLi = $('span.city.fs-3.bg-warning.rounded.px-2.py-1.text-light')
      $.each(childrenLi, function(index, res){
        var town = $(this)
        town.removeClass('fs-3 bg-warning rounded px-2 py-1 text-light').addClass('fs-6')
      });
    });
};

function backCities() {
    $('button.accordion-button').each(function() {
      var parent = $(this)
      parent.parents('.col-lg-4.col-md-12.mb-2.city-list').addClass('invisible');
      parent.parents('.accordion-item').children('.accordion-collapse.collapse.show').removeClass('show')
      $('#search_result').css('display','none')
      var childrenLi = $('span.city.fs-3.bg-warning.rounded.px-2.py-1.text-light')
      $.each(childrenLi, function(index, res){
        var town = $(this)
        town.removeClass('fs-3 bg-warning rounded px-2 py-1 text-light').addClass('fs-6')
      });
    });
};



// 02. CHOSEN CITIES BUTTONS
$(document).ready(function () {
    var $kz_cities = $('#kz_cities').hide();
    var $ru_big = $('#ru_big_cities').show();
    var $ru_all = $('#ru_all_cities').hide();

    $('#ru_big_cities_btn').addClass('btn-warning  p-1 rounded')
    $('#ru_all_cities_btn').removeClass('btn-warning   p-1 rounded')
    $('#kz_cities_btn').removeClass('btn-warning  p-1 rounded' )

    $('#kz_cities_btn').on('click', function () {
        $kz_cities.show('slow')
        $('#kz_cities_btn').addClass('btn-warning  p-1 rounded');
        $('#ru_all_cities_btn').removeClass('btn-warning  p-1 rounded');
        $('#ru_big_cities_btn').removeClass('btn-warning  p-1 rounded');
        $ru_big.hide('slow')
        $ru_all.hide('slow')
    });
    $('#ru_all_cities_btn').on('click', function () {
        $('#search').val('');
//
        $kz_cities.hide('slow');
        $ru_big.hide('slow');
        $ru_all.show('slow');
        $('#ru_all_cities_btn').addClass('btn-warning  p-1 rounded');
        $('#kz_cities_btn').removeClass('btn-warning  p-1 rounded');
        $('#ru_big_cities_btn').removeClass('btn-warning  p-1 rounded');

    });
    $('#ru_big_cities_btn').on('click', function () {
        $kz_cities.hide('slow')
        $ru_big.show('slow')
        $ru_all.hide('slow')
        $('#ru_big_cities_btn').addClass('btn-warning  p-1 rounded');
        $('#ru_all_cities_btn').removeClass('btn-warning  p-1 rounded');
        $('#kz_cities_btn').removeClass('btn-warning  p-1 rounded');
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
    $('#message_form').css('display', 'none ')
    $('#spinner').removeClass('invisible d-none').addClass('d-flex');
    $('#success_send').addClass('invisible');
    var name = $("#name_c").val();
    var email = $("#email_c").val();
    var telephone = $("#telephone_c").val();
    var subject = $("#subject_c").val();
    var comments = $("#comments_c").val();
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
        timeout: 6000,
        data: $('form#message_form').serialize(),
        success: function (response) {
            console.log('you did it!')
            if (response.message == true) {
                $('#message_form').css('display', 'none');
                $('#spinner').addClass('d-none');
                $('#success_send').removeClass('invisible');
                setTimeout(function () {
                    $('#success_send').addClass('invisible');
                    $('#message_form').css('display', 'block ');
                    $("#name_c").val("");
                    $("#email_c").val("");
                    $("#subject_c").val("");
                    $("#comments_c").val("");
                    $('#contactform').modal('hide');
                }, 2000);
            } else {
                alert(response)
            };
        },
    });
  }

// 05. PHONE NUMBER VALIDATOR
$(document).ready(function() {
    $("#telephone_c").mask("+7 (999) 999-99-99");
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

$('#copyPhoneBtnFooter').on('click', function () {
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
$('#copyMailBtnFooter').on('click', function () {
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
$('#headhunter_form').on('submit', function (event) {
    $("#error-msg-hh").css('opacity', '0');
     console.log('before')
     validateCandidateForm()
      console.log('after')
     event.preventDefault();
});
// 09. HEADHUNTER MESSAGE FORM
function validateCandidateForm() {
    $('#headhunter_form').css('display', 'none ')
    $('#hh_spinner').removeClass('invisible d-none').addClass('d-flex');
    $('#hh_success_send').addClass('invisible');
    var name = $("#name").val();
    var email = $("#email").val();
    var telephone = $("#telephone").val();
    var city = $("#city").val();
    var position = $("#position").val();

    console.log('var ++++')
    console.log(name)
    console.log(email)
    console.log(telephone)
    console.log(city)
    console.log(position)
    console.log('var end +++++')
    $("#error-msg-hh").css('opacity', '0');
    $('#error-msg-hh').html("");
    if (name == "" || name == null) {
        $('#error-msg-hh').html("<div class='text-danger alert alert-warning error_message'>* поле 'имя' обязательно *</div>");
        $('#error-msg-hh').css('opacity', '1');
        return false;
    }
    if (email == "" || email == null) {
        $('#error-msg-hh').html("<div class='alert alert-warning error_message'>* поле 'электронный адрес' обязательно *</div>");
        $('#error-msg-hh').css('opacity', '1');
        return false;
    }
    if (telephone == "" || telephone == null) {
        $('#error-msg-hh').html("<div class='alert alert-warning error_message'>* поле 'телефон' обязательно *</div>");
        $('#error-msg-hh').css('opacity', '1');
        return false;
    }
    if (city == "" || city == null) {
        $('#error-msg-hh').html("<div class='alert alert-warning error_message'>* поле 'город' обязательно *</div>");
        $('#error-msg-hh').css('opacity', '1');
        return false;
    }
    if (position == "" || position == null) {
        $('#error-msg-hh').html("<div class='alert alert-warning error_message'>* поле 'вакансия' обязательно *</div>");
        $('#error-msg-hh').css('opacity', '1');
        return false;
    }
    console.log('before ajax')
    $.ajax({
        url: "/candidate",
        type: 'post',
        dataType: 'json',
        timeout: 6000,
        data: $('form#headhunter_form').serialize(),
        success: function (response) {
            console.log('you sent hh')
            if (response.message == true) {
                $('#headhunter_form').css('display', 'none ')
                $('#hh_spinner').addClass('d-none');
                $('#hh_success_send').removeClass('invisible')
                setTimeout(function () {
                    $('#hh_success_send').addClass('invisible');
                    $('#headhunter_form').css('display', 'block ');
                    $("#name").val("");
                    $("#email").val("");
                    $("#position").val("");
                    $("#city").val("");
                    $("#age").val("");
                    $("#sex").val("");
                    $("#height").val("");
                    $("#weight").val("");
                    $("#clothes_size").val("");
                    $("#shoes_size").val("");
                    $("#experience").val("");
                    $("#preferences").val("");
                    $('#hh_form').modal('hide');
    }, 3000);
            } else {
                alert('error')
            };
        },
        error: function (jqXHR, exception) {
                if (jqXHR.status === 0) {
                        alert('Not connect. Verify Network.');
                } else if (jqXHR.status == 404) {
                        alert('Requested page not found (404).');
                } else if (jqXHR.status == 500) {
                        alert('Internal Server Error (500).');
                } else if (exception === 'parsererror') {
                        alert('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                        alert('Time out error.');
                } else if (exception === 'abort') {
                        alert('Ajax request aborted.');
                } else {
                        alert('Uncaught Error. ' + jqXHR.responseText);
                }
        }
    });
  }

$('.navbar-collapse').on('click', function () {
    $('.navbar-collapse').collapse('hide');
    $a = $($(this).attr('href'));
    $('html,body').animate({ scrollTop: $a.offset().top - 50}, 500);
    return false;
});