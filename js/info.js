$("#BtnInsertHero").click(function() {

    var HeroData = {
        "name": $("#HeroName").val(),
        "description": $('#description').val(),
        "image": $('#b64').text()
    };

    var JSON_HeroData = JSON.stringify(HeroData);

    $.ajax({
        url: 'https://marvel-backend-nodejs.herokuapp.com/api/info/',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON_HeroData,
        dataType: 'JSON',
        success: function (result) {
            alert(result['success']);
            $("#HeroName").val("");
            $('#description').val("");
            $('#b64').text("");
            $('#img').removeAttr('src').replaceWith($('#img').clone());
        },
        error: function(result){
            console.log(result);
            alert(result['error']);
        }
      });
    
});

  $("#imageInput").change(function() {
    if ($("#imageInput")[0].files[0]) {
        var FR= new FileReader();
        FR.addEventListener("load", function(e) {
          document.getElementById("img").src       = e.target.result;
          document.getElementById("b64").innerHTML = e.target.result;
        }); 
        FR.readAsDataURL($("#imageInput")[0].files[0] );
      }
  })