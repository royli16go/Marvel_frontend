$token = localStorage.getItem("token");
if($token){
    $('#Register').hide();
    $('#Login').hide();
    $('#Logout').show();
} else {
    $('#Register').show();
    $('#Login').show();
    $('#Logout').hide();
}

$("#BtnLogin").click(function() {
    var userdata = {
        "email":$("#email").val(),
        "password":$('#password').val()
    };
    var JSON_userdata = JSON.stringify(userdata);
    console.log(JSON_userdata);
    $.ajax({
        url: 'https://marvel-backend-nodejs.herokuapp.com/api/user/login',
        type: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON_userdata,
        dataType: 'JSON',
        success: function (result) {
            console.log(result['message']);
            alert(result['message']);
            console.log(result['token']);
            localStorage.setItem("token", result['token']);  
            location.href='welcome.html';
        },
        error: function(result){
            console.log(result['responseText']);
            alert(result['responseText']);
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