$token = localStorage.getItem("token");
if ($token) {
    $.ajax({
        url: 'https://marvel-backend-nodejs.herokuapp.com/api/user/CheckActive',
        type: 'post',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': $token
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


$("#BtnLogin").click(function () {
    var userdata = {
        "email": $("#email").val(),
        "password": $('#password').val()
    };
    var JSON_userdata = JSON.stringify(userdata);
    $.ajax({
        url: 'https://marvel-backend-nodejs.herokuapp.com/api/user/login',
        type: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON_userdata,
        dataType: 'JSON',
        success: function (result) {
            localStorage.setItem("token", result['token']);
            $.ajax({
                url: 'https://marvel-backend-nodejs.herokuapp.com/api/user/CheckActive',
                type: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem("token")
                },
                dataType: 'JSON',
                success: function (result) {
                    if(result === true) {
                        location.href = 'index.html';
                    } else {
                        location.href = 'welcome.html';        
                    }
                },
                error: function (result) {
                    alert(result['responseText']);
                }
            });
        },
        error: function (result) {
            alert(result['responseText']);
        }
    });
});