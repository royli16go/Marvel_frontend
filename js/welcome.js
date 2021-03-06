$token = localStorage.getItem("token");
if ($token) {
    $('#Register').hide();
    $('#Login').hide();
    $('#Logout').show();
    $.ajax({
        url: 'https://marvel-backend-nodejs.herokuapp.com/api/user/CheckActive',
        type: 'post',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
        },
        dataType: 'JSON',
        success: function (result) {
            if (result === true) {
                location.href = 'index.html';
            }
        },
        error: function (result) {
            alert(result['responseText']);
        }
    });
} else {
    $('#Register').show();
    $('#Login').show();
    $('#Logout').hide();
}

$('#BtnEnter').click(function () {
    var ActivationCode = {
        "ActivationCode": $('#ActivationCode').val()
    };
    var JSON_ActivationCode = JSON.stringify(ActivationCode);
    console.log(JSON_ActivationCode);
    $.ajax({
        url: 'https://marvel-backend-nodejs.herokuapp.com/api/user/ActivationCode',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': $token
        },
        data: JSON_ActivationCode,
        dataType: 'JSON',
        success: function (result) {
            location.href = 'index.html'
        },
        error: function (result) {
            $('.error').text(result['responseText'])
        }
    });
});

$('#Logout').click(function() {
    localStorage.removeItem('token');
    $('#Register').show();
    $('#Login').show();
    $('#Logout').hide();
    location.href='index.html';
});