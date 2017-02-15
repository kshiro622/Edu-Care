-- Creates seed data for tables
INSERT INTO Volunteers (volunteer_first_name, volunteer_last_name, preferred_city, bio)
VALUES ("Alan", "Ashbeck", "Chicago", "test");

INSERT INTO Listings (specialty, category, VolunteerId)
VALUES ("Coding", "Lecturer", "1"),
	   ("Basketball", "Panelist", "1");

INSERT INTO Volunteers (volunteer_first_name, volunteer_last_name, preferred_city, bio)
VALUES ("Aisha", "Ahmad", "Chicago", "test");

INSERT INTO Listings (specialty, category, VolunteerId)
VALUES ("Art", "General", "2"),
	   ("Birds", "Career", "2");
	   