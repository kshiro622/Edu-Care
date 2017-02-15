$(document).ready(function() {
    // Getting jQuery references to the form entries
    var firstName = $("#first_name");
    var lastName = $("#last_name");
    var preferredCity = $("#preferred_city");

    var bio = $("#bio");

    // Adding an event listener for when the form is submitted
    $('#new-volunteer-form').on("submit", function handleFormSubmit(event) {
        event.preventDefault();
        // Constructing a new volunteer listing object to hand to the database
        var newVolunteer = {
            volunteer_first_name: firstName.val().trim(),
            volunteer_last_name: lastName.val().trim(),
            preferred_city: preferredCity.val().trim(),
            bio: bio.val()
        };

        submitForm(newVolunteer);
    });

    // Submits the form using post method
    function submitForm(Form) {
        $.post("/api/volunteer", Form, function() {
            window.location.href = "/volunteer";
        });
    }
});
