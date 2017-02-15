//Shows modal if user entered wrong username or password and was redirected
$.get('/signin', function() {
    var queryString = window.location.search;
    if (queryString === '?login=bad') {
        $('#bad-login').modal('open');
    }
});
