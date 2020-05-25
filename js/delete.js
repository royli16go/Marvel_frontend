$("#BtnDeleteHero").click(function() {
    $.ajax({
        url: 'https://marvel-backend-nodejs.herokuapp.com/api/info/' + $("#HeroName").val(),
        type: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (result) {
            if(result['deletedCount']==1){
                alert('Delete Success');
            }
            
        },
        error: function(result){
            console.log(result);
            alert(result['error']);
        }
      });
});