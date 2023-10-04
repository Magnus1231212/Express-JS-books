let api = "http://localhost:3000/"
let type = "Title";

$("#dropdown").click(function(){
    if($(".dropdown ul").hasClass("active")) {
        $(".dropdown ul").removeClass("active");
    } else {
        $(".dropdown ul").addClass("active");
    }
});
  
$(".dropdown ul li").click(function(){
    var text = $(this).text();
    $(".default_option").text(text);
    type = text;
});

$('.input').on('input', (e) => {
    if(e.target.value == '') {
        $('code').html('');
        return;
    }
    setCode(type, e.target.value).then((data) => {
        $('code').html(JSON.stringify(data, null, '\t'));
        console.log(JSON.stringify(data, null, '\t'));
    });
});

async function setCode(searchtype, searchvalue) {
    const response = await fetch(`${api}books/search/${searchtype}/${searchvalue}`);
    const books = await response.json();
    return books;
}