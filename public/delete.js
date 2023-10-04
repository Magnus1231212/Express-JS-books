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
        $('.data').empty()
        return;
    }
    setCode(type, e.target.value).then((data) => {
        $('.data').empty()
        $.each(data, function(i, item) {
            let data = item;
            $('.data').append(`
            <div class="item">
                <ul>
                    <li>Title <br>${data.Title}</li>
                    <li>Author <br>${data.Author}</li>
                    <li>Genre <br>${data.Genre}</li>
                    <li>Height <br>${data.Height}</li>
                    <li>Publisher <br>${data.Publisher}</li>
                    <button id="delete" value="${data.Title}" onclick="deleteBook(this);">Delete</button>
                </ul>
            </div>
            `);
        });
    });
});

async function deleteBook(book) { 
    fetch(`${api}books/by-name/${book.value}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then( (response) => {
        if (response.ok) {
            notify('success', 'Book deleted successfully');
            $(book).closest('div').remove();
        } else {
            notify('error', 'Error deleting book');
        }
    });
}

async function setCode(searchtype, searchvalue) {
    const response = await fetch(`${api}books/search/${searchtype}/${searchvalue}`);
    const books = await response.json();
    return books;
}