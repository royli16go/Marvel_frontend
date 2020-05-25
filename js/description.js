var pid;
$token = localStorage.getItem("token");
if ($token) {
    $('#Register').hide();
    $('#Login').hide();
    $('#Logout').show();
} else {
    $('#Register').show();
    $('#Login').show();
    $('#Logout').hide();
}
$('#Logout').click(function () {
    localStorage.removeItem('token');
    $('#Register').show();
    $('#Login').show();
    $('#Logout').hide();
    location.href = 'index.html';
});

let params = new URLSearchParams(location.search);
$.ajax({
    url: 'https://marvel-backend-nodejs.herokuapp.com/api/info/' + params.get('name'),
    type: 'POST',
    success: function (result) {
        pid = result._id;
        $('.characters_img').append("<img src='" + result.image + "' class='card-img-top'>")
        $('.characters_name').text(result.name);
        $('.characters_description').text(result.description);
        var postID = {
            "pid": pid
        };
        var JSON_postID = JSON.stringify(postID);
        if($token) {
            $.ajax({
                url: 'https://marvel-backend-nodejs.herokuapp.com/api/comment/getCommentsToken',
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': $token
                },
                data: JSON_postID,
                dataType: 'JSON',
                success: function (result) {
                    $.each(result, function (key, value) {
                        if(value.create == true) {
                            $('.comment').append("<hr>" +
                            "<div style='display: flex;justify-content: space-between;'>" +
                                "<div>" +
                                    "<div style='display: flex;'>"+
                                        "<div style='font-weight: 500;line-height: 2rem;'>" + value.uid + "</div>" +
                                        "<div style='margin-left: 10px;line-height: 2rem;'>" + value.date + "</div>" +
                                    "</div>" +
                                    "<div style='white-space:pre;line-height: 1;'>" + value.comment + "</div>" +
                                "</div>" +
                                "<div class='showDelete'>" +
                                    "<div style='display: none;' id='postID'>" + value._id + "</div>" +
                                    "<button class='btn btn-secondary fas fa-trash' id='btnDelete'>Delete</button>" +
                                "</div>" +
                            "</div>");
                        } else {
                            $('.comment').append("<hr>" +
                            "<div style='display: flex;justify-content: space-between;'>" +
                                "<div>" +
                                    "<div style='display: flex;'>"+
                                        "<div style='font-weight: 500;line-height: 2rem;'>" + value.uid + "</div>" +
                                        "<div style='margin-left: 10px;line-height: 2rem;'>" + value.date + "</div>" +
                                    "</div>" +
                                    "<div style='white-space:pre;line-height: 1;'>" + value.comment + "</div>" +
                                "</div>" +
                                "<div>" +
                                "</div>" +
                            "</div>");
                        }
                    });
                    $('Button#btnDelete').click(function() {
                        $.ajax({
                            url: 'https://marvel-backend-nodejs.herokuapp.com/api/comment/' + $(this).closest('.showDelete').children('#postID').text(),
                            type: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'auth-token': $token
                            },
                            dataType: 'JSON',
                            success: function (result) {
                                location.reload();
                            },
                            error: function (result) {
                                console.log(result['statusText']);
                                alert(result['statusText']);
                            }
                        });
                    });
                },
                error: function (result) {
                    alert(result["statusText"]);
                }
            });
        } else if (!$token) {
            $.ajax({
                url: 'https://marvel-backend-nodejs.herokuapp.com/api/comment/getComments',
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON_postID,
                dataType: 'JSON',
                success: function (result) {
                    $.each(result, function (key, value) {
                        $('.comment').append("<hr>" + 
                        "<div style='display: flex;'>" +
                            "<div style='font-weight: 500;line-height: 2rem;'>" + value['uid'] + "</div>" +
                            "<div style='margin-left: 10px;line-height: 2rem;'>" + value['date'] + "</div>" +
                        "</div>" +
                        "<div style='white-space:pre;line-height: 1;'>" + value['comment'] + "</div>");
                    });
                },
                error: function (result) {
                    alert(result["statusText"]);
                }
            });
        }
    },
    error: function (result) {
        alert(result["statusText"]);
    }
});

$("#submit").attr("disabled", true);
$("#comment_text").keyup(function (e) {
    if (e.which == 8 || e.which == 46) {
        $(this).height(parseFloat($(this).css("min-height")) != 0 ? parseFloat($(this).css("min-height")) : parseFloat($(this).css("font-size")));
    }
    while ($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
        $(this).height($(this).height() + 1);
    };
    if (!$("#comment_text").val() || !$("#comment_text").val().replace(/\s/g, '').length) {
        $("#submit").attr("disabled", true);
    } else {
        $("#submit").attr("disabled", false);
    }
}).css("resize", "none");

$("#submit").click(function(){
    var commentData = {
        "pid": pid,
        "comment": $('#comment_text').val()
    };
    var JSON_commentData = JSON.stringify(commentData);
    $.ajax({
        url: 'https://marvel-backend-nodejs.herokuapp.com/api/comment',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': $token
        },
        data: JSON_commentData,
        dataType: 'JSON',
        success: function (result) {
            var postID = {
                "pid": pid
            };
            var JSON_postID = JSON.stringify(postID);
            if($token) {
                $.ajax({
                    url: 'https://marvel-backend-nodejs.herokuapp.com/api/comment/getCommentsToken',
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': $token
                    },
                    data: JSON_postID,
                    dataType: 'JSON',
                    success: function (result) {
                        $('.comment').empty();
                        $.each(result, function (key, value) {
                            if(value.create == true) {
                                $('.comment').append("<hr>" +
                                "<div style='display: flex;justify-content: space-between;'>" +
                                    "<div>" +
                                        "<div style='display: flex;'>"+
                                            "<div style='font-weight: 500;line-height: 2rem;'>" + value.uid + "</div>" +
                                            "<div style='margin-left: 10px;line-height: 2rem;'>" + value.date + "</div>" +
                                        "</div>" +
                                        "<div style='white-space:pre;line-height: 1;'>" + value.comment + "</div>" +
                                    "</div>" +
                                    "<div class='showDelete'>" +
                                        "<div style='display: none;' id='postID'>" + value._id + "</div>" +
                                        "<button class='btn btn-secondary fas fa-trash' id='btnDelete'>Delete</button>" +
                                    "</div>" +
                                "</div>");
                            } else {
                                $('.comment').append("<hr>" +
                                "<div style='display: flex;justify-content: space-between;'>" +
                                    "<div>" +
                                        "<div style='display: flex;'>"+
                                            "<div style='font-weight: 500;line-height: 2rem;'>" + value.uid + "</div>" +
                                            "<div style='margin-left: 10px;line-height: 2rem;'>" + value.date + "</div>" +
                                        "</div>" +
                                        "<div style='white-space:pre;line-height: 1;'>" + value.comment + "</div>" +
                                    "</div>" +
                                    "<div>" +
                                    "</div>" +
                                "</div>");
                            }
                        });
                        $('Button#btnDelete').click(function() {
                            $.ajax({
                                url: 'https://marvel-backend-nodejs.herokuapp.com/api/comment/' + $(this).closest('.showDelete').children('#postID').text(),
                                type: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'auth-token': $token
                                },
                                dataType: 'JSON',
                                success: function (result) {
                                    location.reload();
                                },
                                error: function (result) {
                                    console.log(result['error']);
                                    alert(result['error']);
                                }
                            });
                        });
                    },
                    error: function (result) {
                        alert(result["statusText"]);
                    }
                });
            } else if (!$token) {
                $.ajax({
                    url: 'https://marvel-backend-nodejs.herokuapp.com/api/comment/getComments',
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON_postID,
                    dataType: 'JSON',
                    success: function (result) {
                        $.each(result, function (key, value) {
                            $('.comment').append("<hr>" + 
                            "<div style='display: flex;'>" +
                                "<div style='font-weight: 500;line-height: 2rem;'>" + value['uid'] + "</div>" +
                                "<div style='margin-left: 10px;line-height: 2rem;'>" + value['date'] + "</div>" +
                            "</div>" +
                            "<div style='white-space:pre;line-height: 1;'>" + value['comment'] + "</div>");
                        });
                    },
                    error: function (result) {
                        alert(result["statusText"]);
                    }
                });
            }
        },
        error: function (result) {
            alert(result['responseText']);
        }
    });
    $('#comment_text').val("")
    $("#submit").attr("disabled", true);
})

$('#comment_text').click(function(){
    if(!$token) {
        window.location = './login.html';
    }
})

$("#reset").click(function () {
    $("#comment_text").height(24).val("");
    $("#submit").attr("disabled", true);
});