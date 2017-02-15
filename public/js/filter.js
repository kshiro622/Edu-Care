$(document).ready(function() {
    //click checkboxes
    $(document).on('click', '#cat-search-button', function(event) {
        var checkedBoxes = $('input[type="checkbox"]:checked');
        var categories = Array.prototype.map.call(checkedBoxes, function(obj) {
            return $(obj).data('category');
        });
        var queryStringComponents = categories.map(function(cat) {
            return '&cat=' + cat;
        });
        var queryString = queryStringComponents.join('');
        window.location.search = queryString;
    });
    //populate autocomplete
    //then submit search term
    $.ajax({
            method: 'GET',
            url: '/api/specialties',
        })
        .done(function(data) {
            var categoryData = {};
            data.forEach(function(element) {
                categoryData[element.specialty] = null;
            });
            $('input.autocomplete').autocomplete({
                data: categoryData,
                limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
            });
            $(document).on('submit', '#autocomplete-form', function(event) {
                event.preventDefault();
                var searchTerm = $('#autocomplete-input').val();
                var specQueryString = 'spec=' + searchTerm;
                window.location.search = specQueryString;
            });
        });
    //if no search results exist
    // self executing function
    (function checkResults() {
        if ($('#listing-collapsible').html().trim() === '') {
            var message = '<p>Your search did not match any listings.</p>' +
                '<p>Suggestions:</p>' +
                '<ul><li>- Make sure all words are spelled correctly.</li>' +
                '<li>- Try a different search for category or specialty.</li></ul>';
            $('#listings-div').html(message);
        }
    })();
});
