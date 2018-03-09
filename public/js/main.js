$('.btn-primary').on('click', function() {
  event.preventDefault();
  // console.log('test')

  var choice = {
    movieName: $('#movieName').val().trim(),
    relYear: $('#relYear').val().trim()
  };

  console.log(choice)
  $.get("/api/", choice, function(data) {
    console.log(data);
  });
});
