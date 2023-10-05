let api = "http://localhost:3000/";

$("#add").click(function () {
  let title = $("#title").val();
  let author = $("#author").val();
  let genre = $("#genre").val();
  let height = $("#height").val();
  let publisher = $("#publisher").val();
  AddBook(title, author, genre, height, publisher).then(() => {
    title = $("#title").val("");
    author = $("#author").val("");
    genre = $("#genre").val("");
    height = $("#height").val("");
    publisher = $("#publisher").val("");
  });
});

async function AddBook(title, author, genre, height, publisher) {
  fetch(`${api}books/add/${title}/${author}/${genre}/${height}/${publisher}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.ok) {
      notify("success", "Book added successfully");
      console.log("Book added successfully");
    } else {
      notify("error", "Error adding book");
      console.log("Error adding book");
    }
  });
}
