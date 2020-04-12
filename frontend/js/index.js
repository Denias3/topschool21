$('#open-fil').click(function () {
    var hex = 43;
    if ($(window).width() <= 767)
        hex = 75;
    if ($("#filtration-id").css("height") == "0px") {
        $("#filtration-id").animate({
            height: `${hex}px`
        }, 200, function () {
            $("#filtration-id").css({"z-index": 0});
        });
        $(".filtration").animate({  i: 0}, {
            step: function(now, fx) {
              $(this).css('transform','translateY(' + now + '%)');
            },
            duration: 200
        }, 'linear');
    }
    else {
        $("#filtration-id").animate({
            height: "0px"
        }, 200, function () {
            $("#filtration-id").css({"z-index": -1});
        });
        $(".filtration").animate({  i: -100}, {
            step: function(now, fx) {
              $(this).css('transform','translateY(' + now + '%)');
            },
            duration: 200
        }, 'linear');
    }
});


function queryGetUsers(url, curse, login) {
    $.ajax({
        url: url,
        success: function(data){
            console.log(data[0].datatime);
            if (curse == 1) {
                curse = data.length + 1;
            }
            else
                curse = 0;
            var tr, num, lg, lvl;
            data.forEach((element, i) => {
                if (login === 0 || element.login == login.toLowerCase())
                {
                    tr = $('<tr>', {
                        class: 'table-block'
                    });
                    num = $('<td>', {
                        text: Math.abs(curse - (i + 1)),
                        class: 'number-t'
                    });
                    lg = $('<td>', {
                        text: element.login,
                        class: 'login-t'
                    });
                    lvl = $('<td>', {
                        text: element.level.toFixed(2),
                        class: 'level-t'
                    });
                    tr.append(num).append(lg).append(lvl);
                    $('#table-id').append(tr);
                }
            });
        
        }
    });
};

$('#goSubid').click(function () {
    let ord, wave;
    let tableb = $('.table-block');
    tableb.detach();

    if ($("#ordid").val() == 'По убыванию')
        ord = 'up';
    else
        ord = 'down';
    if ($("#waveid").val() == 'Все')
        wave = -1;
    else if ($("#waveid").val() == 'Первая')
        wave = 1;
    else
        wave = 2
    queryGetUsers(`http://127.0.0.1:3000/get_users?wave=${wave}&ord=${ord}`, (ord == 'down')? 1: 0, 0);
});

$('#loginSub').click(function (event) {
    event.preventDefault();
    let ord, wave;
    let tableb = $('.table-block');
    tableb.detach();

    if ($("#ordid").val() == 'По убыванию')
    ord = 'up';
    else
        ord = 'down';
    if ($("#waveid").val() == 'Все')
        wave = -1;
    else if ($("#waveid").val() == 'Первая')
        wave = 1;
    else
        wave = 2
    queryGetUsers(`http://127.0.0.1:3000/get_users?wave=${wave}&ord=${ord}`,(ord == 'down')? 1: 0, $("#loginArea").val());
    $("#loginArea").val('');
});

queryGetUsers('http://127.0.0.1:3000/get_users', 0, 0);