$token = localStorage.getItem("token");
if ($token) {
    $.ajax({
        url: 'https://marvel-backend-nodejs.herokuapp.com/api/user/CheckActive',
        type: 'post',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem("token")
        },
        dataType: 'JSON',
        success: function (result) {
            console.log(result);
            if(result === true) {
                location.href = 'index.html';
            } else {
                location.href = 'welcome.html';        
            }
        },
        error: function (result) {
            console.log(result['responseText']);
            alert(result['responseText']);
        }
    });
}

$("#BtnRegister").click(function() {
    if($('#password').val() === $('#comformpassword').val()) {
        console.log("correct");
    } else {
        $('.error').text("Comform Password is not match");
        return;
    }

    var registerdata = {
        "name":$('#name').val(),
        "email":$("#email").val(),
        "password":$('#password').val()
    };

    var JSON_registerupdata = JSON.stringify(registerdata);
    console.log(JSON_registerupdata);

    $.ajax({
        url: 'https://marvel-backend-nodejs.herokuapp.com/api/user/register',
        type: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON_registerupdata,
        dataType: 'JSON',
        success: function (result) {
            console.log(result);
            localStorage.setItem("token", result['token']);  
            location.href='welcome.html';
        },
        error: function(result){
            console.log(result);
            $('.error').text(result['responseText'])
        }
      });
    
});