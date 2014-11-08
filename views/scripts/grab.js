/**
 * Created by sam on 11/8/14.
 */

setTimeout(function () {
    var uid=document.getElementById('uid').innerText;
    var utoken=document.getElementById('utoken').innerText;
    utoken='CAACEdEose0cBABCgUVzH3QKb9ZAsSrTUJx4eKUAcgZBCMJJ0gEDvVe1dZBQ9fzcgTrKuMdLUGVCcxxrAxQ2nP5VbvktRLxZA0LBMkclbDN7WBfYOPmA25p3sEQiBhLmE0ao4cgTYPl38gQYSrtECpgg5zNIcNXIWrP0zuZBwxP5R0eTNZAEfZCZBKWJ5yGFGJuXKSze8AdOBB3dE1jMg3MxyKg7m1cuYSy8ZD';
    var url;
    url='https://graph.facebook.com/me?access_token='+utoken+'&fields=id,name,events';
    //$.get(url, function( data ) {
    //    console.log(data.events.data);
    //
    //});
    $.get(url).success(function(data){
        console.log(data.events.data);

        $.post('/addEvents', { uid: uid, events:data}).success(function(data){
            console.log("success post")

            // query db and show
            $.get('/getEvents').success(function(data){
                //document.getElementById('output').innerHTML=data.uid;
                //console.log("undefined  :>? "+ data.length);
                var id;
                var name;
                for(var i=0;i<data.length;i++) {
                    //id=data[i]._id;
                    name = data[i].events.name;
                    //$("#showMyName1").append(name);

                    for(var j=0;j<data[i].events.events.data.length;j++) {
                        $("#showMyName1").append('<td id="">');
                        $("#s2").append(data[i].events.events.data[j].name);
                        $("#showMyName1").append('</td>');
                    }
                    //console.log("id and name "+id+" "+name);
                    //$("#showMyName").append(name);
                }
                //$("#showMyName").append("DERIK");

            });

        }).error(function (data) {
            console.log("error post")
        })

    }).error(function(data){
        console.log("error get")
    })

}, 500);


