$('.btn-primary').on('click', function() {
  $.get("api/movies", function(req, res) {
    console.log(res);
  });
});
