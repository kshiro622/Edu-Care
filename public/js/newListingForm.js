$(document).ready(function() {
    // Getting jQuery references to the form entries
    var category = $("#category");
    var specialty = $("#specialty");

    // Adding an event listener for when the form is submitted
    $('#new-listing-form').on("submit", function handleFormSubmit(event) {
        event.preventDefault();
        // Constructing a new volunteer listing object to hand to the database
        var newListing = {
            category: category.val(),
            specialty: specialty.val().trim(),
        };
        submitForm(newListing);
    });

    // Submits the form using post method
    function submitForm(Form) {
        $.post("/api/volunteer/listing", Form, function() {
            window.location.href = "/volunteer";
        });
    }
});
