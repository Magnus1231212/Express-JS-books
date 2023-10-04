let api = "http://localhost:3000/"
let type = "Title";
let display = "list";

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
        $('code').html("\n" + JSON.stringify(data, null, '\t'));
        $('#items').empty()
        $.each(data, function(i, item) {
            let data = item;
            $('#items').append(`
            <div class="item" style="text-align: center;">
                <ul>
                    <li>Title <br>${data.Title || "N/A"}</li>
                    <li>Author <br>${data.Author || "N/A"}</li>
                    <li>Genre <br>${data.Genre || "N/A"}</li>
                    <li>Height <br>${data.Height || "N/A"}</li>
                    <li>Publisher <br>${data.Publisher || "N/A"}</li>
                </ul>
            </div>
            `);
        });
        console.log(JSON.stringify(data, null, '\t'));
    });
});

$('#toggleCheckbox').change(function() {
    console.log(this.checked)
    if(this.checked) {
        $('#json').css('display', 'none');
        $('#items').css('display', 'block');
        display = "list";
    } else {
        $('#json').css('display', 'block');
        $('#items').css('display', 'none');
        display = "json";
    }
});

async function setCode(searchtype, searchvalue) {
    const response = await fetch(`${api}books/search/${searchtype}/${searchvalue}`);
    const books = await response.json();
    return books;
}