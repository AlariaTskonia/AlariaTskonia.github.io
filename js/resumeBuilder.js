var bio = {
    "name": "Clara Reyes",
    "role": "Senior Sourcing Contract Specialist",
    "contacts": {
        "mobile": "951.555.5555",
        "email": "cr4725cs@gmail.com",
        "github": "AlariaTskonia",
        "gitUrl": "https://github.com/AlariaTskonia/",
        "location": "Riverside, CA",
        "googleplus": "https://plus.google.com/u/0/101064500005076612119/about"
    },
    "welcomeMessage": "Welcome!  Youkoso!  Bienvenue!  ¡Bienvenida!  Benvenuto!  Fáilte!  Willkommen!",
    "skills": [
        "Contract Administration",
        " Data Analysis",
        " Microsoft Office Suite",
        " Windows 9x, NT, XP, Vista, 7, Server 2003 & 2008",
        "Microsoft Visual Studio 2010",
        "SQL",
        "TCP/IP Protocol Suite Knowledge",
        "Network Security Methods",
        "Network / Server Management including IP Administration",
        "Peripheral Network Setup / Maintenance",
        "Internet Explorer/Mozilla Firefox/Google Chrome"
    ],
    "bioPic": "images/clara.jpg"

}


var education = {
    "schools": [
        {
            "name": "Pace University",
            "location": "Pleasantville, NY",
            "years": "2010 - 2013",
            "degree": "Associates of Science",
            "major": "Applied Information Technology, Networking Technologies",
            "url": "http://support.csis.pace.edu/nactel/"
        },
        {
            "name": "La Sierra High School",
            "location": "Riverside, CA",
            "years": "1996 - 2000",
            "degree": "High School Diploma",
            "major": "General Education",
            "url": "http://www.alvord.k12.ca.us/lasierra/"
        }
    ],
    "onlineCourses": [
        {
            "title": "JavaScript Syntax",
            "school": "Udacity",
            "dates": "2014",
            "url": "http://www.udacity.com/course/ud804"
        },
        {
            "title": "Intro to HTML and CSS",
            "school": "Udacity",
            "dates": "2014",
            "url": "http://www.udacity.com/course/ud304"
        },
        {
            "title": "Intro to Git and GutHub",
            "school": "Udacity",
            "dates": "2014",
            "url": "http://www.udacity.com/course/ud775"
        }
    ]
}


var work = {
    "jobs": [
        {
            "employer": "AT&T – Mobility Contract Administration Center",
            "title": "Senior Specialist",
            "location": "Riverside, CA",
            "dates": "December 16, 2013 – Present",
            "description": "Create/manage contracts with outside vendors for cell site maintainance."
        },
        {
            "employer": "AT&T – Construction & Engineering",
            "title": "Project Manager",
            "location": "Riverside, CA",
            "dates": "October 16, 2013 – December 16, 2013",
            "description": "Web developer and back up PC Coordinator."
        },
        {
            "employer": "AT&T – Construction & Engineering",
            "title": "PC Coordinator",
            "location": "Riverside, CA",
            "dates": "May 13, 2013 – October 15, 2013",
            "description": "Loaned as a PC coordinator: maintained, ordered, imaged computer equipment including servers and employee stations/laptops (Dell, HP, Apple)."
        },
        {
            "employer": "AT&T – Construction & Engineering",
            "title": "Engineering Administrator",
            "location": "Anaheim, CA",
            "dates": "May 5, 2013 – October 15, 2013",
            "description": "Title change from Staff Associate due to CWA Union contract renewal: Continued to Maintained/upgraded/created Microsoft Access databases as well as backup the AT&T California Substructure Department."
        },
        {
            "employer": "AT&T – Construction & Engineering",
            "title": "Staff Associate",
            "location": "Anaheim, CA",
            "dates": "May 27, 2007 – May 4, 2013",
            "description": "Maintained/upgraded/created Microsoft Access databases, as well as 1st, 2nd, and 3rd level management support."
        },
        {
            "employer": "Pacific Bell",
            "title": "DA Operator",
            "location": "Riverside, CA",
            "dates": "May 2, 2003 – May 26, 2007",
            "description": "411 directory assistance involved searching database systems for phone numbers (and reverse directory searches) in the USA."
        },
        {
            "employer": "Pacific Bell",
            "title": "Residential Service Representative",
            "location": "Tustin, CA",
            "dates": "November 2, 2002 – May 1, 2003",
            "description": "Service represenative for USA residential landlines."
        },
        {
            "employer": "Pacific Bell",
            "title": "DA Operator",
            "location": "Riverside, CA",
            "dates": "August 14, 2000 – November 1, 2002",
            "description": "411 directory assistance involved searching database systems for phone numbers (and reverse directory searches) in the USA."
        },
        {
            "employer": "Community Medical Group",
            "title": "Record Maintenance & Researcher",
            "location": "Riverside, CA",
            "dates": "June 1, 2000 – August 1, 2000",
            "description": "Maintained, filed, and researched patient medical records."
        }
    ]
}

var projects = {
    "project": [
        {
            "title": "Digital Vellum Project",
            "dates": "2010 - 2013",
            "description": "Converted antique vellum maps into a digital archive for AT&T California Engineers and Engineering Administrators",
            "images":  ["http://placehold.it/200/200","http://placehold.it/200/200"]
        },
        {
            "title": "Substructure Database",
            "description": "Created both front and back end systems to manage, maintain, and track distributed vellums, maps, facility records as well as customer and payment data for the AT&T California Substructure Desk",
            "dates": "2011 - 2013",
            "images": ["http://placehold.it/200/200","http://placehold.it/200/200"]
        }
    ]
    }


//Generic Biography
 /*   if (bio.skills !== null) {
        var formattedSkill = HTMLskills.replace("%data%", bio.skills)
        $("#skills").append(formattedSkill);
    }; */

    if (bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);
        for (var i = 0; i < bio.skills.length; i++) {
            var formattedSkill = HTMLskills.replace("%data%", bio.skills[i]);
            $("#skills").append(formattedSkill);
        }
    }

    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    $("#header").prepend(formattedName);

    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    $("#header").prepend(formattedRole);

    var formattedPic = HTMLbioPic.replace("%data%", bio.bioPic).replace("#", bio.contacts.googleplus);
    $("#header").prepend(formattedPic);

    var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    $("#topContacts").prepend(formattedMobile);
    $("#footerContacts").prepend(formattedMobile);

    var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
    $("#topContacts").prepend(formattedEmail);
    $("#footerContacts").prepend(formattedEmail);

    var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github).replace("#", bio.contacts.gitUrl);
    $("#topContacts").prepend(formattedGithub);
    $("#footerContacts").prepend(formattedGithub);

    var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
    $("#topContacts").prepend(formattedLocation);

    var formattedWelcome = HTMLWelcomeMsg.replace("%data%", bio.welcomeMessage);
    $("#header").prepend(formattedWelcome);


    function displayWork() {
        for (job in work.jobs) {
            $("#workExperience").append(HTMLworkStart);

            var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
            var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
            var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
            var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
            
            var formattedEmployerTitle = formattedEmployer + formattedTitle;

            $(".work-entry:last").append(formattedEmployerTitle);
            $(".work-entry:last").append(formattedDates);
            $(".work-entry:last").append(formattedDescription);
        };
    }

    displayWork();


//Internationalize Button which doesn't work...
    function inName(name) {
        name = bio.name.trim().split(" ");
        console.log(name);
        name[1] = name[1].toUpperCase();
        name[0] = name[0].slice(0, 1).toUpperCase() + name[0].slice(1).toLowerCase();

        return name[0] + " " + name[1];
    }
    $("#main").append(internationalizeButton);


//Project to be displayed
    projects.display = function () {
        for (proj in projects.project) {
            $("#projects").append(HTMLprojectStart);

            var formattedPTitle = HTMLprojectTitle.replace("%data%", projects.project[proj].title);
            $(".project-entry:last").append(formattedPTitle);

            var formattedPDates = HTMLprojectDates.replace("%data%", projects.project[proj].dates);
            $(".project-entry:last").append(formattedPDates);

            var formattedPDesc = HTMLprojectDescription.replace("%data%", projects.project[proj].description);
            $(".project-entry:last").append(formattedPDesc);

            if (projects.project[proj].images.length > 0) {
                for (image in projects.project[proj].images) {
                    var formattedPImg = HTMLprojectImage.replace("%data%", projects.project[proj].images);
                    $(".project-entry:last").append(formattedPImg);
                }
            }
        }
    }
    projects.display();


//Education to be displayed
    education.display = function () {
        for (edu in education.schools) {
            $("#education").append(HTMLschoolStart);

            var formattedSName = HTMLschoolName.replace("%data%", education.schools[edu].name).replace("#", education.schools[edu].url);
            var formattedSlocation = HTMLschoolLocation.replace("%data%", education.schools[edu].location);
            var formattedSYears = HTMLschoolDates.replace("%data%", education.schools[edu].years);
            var formattedSDegree = HTMLschoolDegree.replace("%data%", education.schools[edu].degree);
            var formattedSMajor = HTMLschoolMajor.replace("%data%", education.schools[edu].major);

            $(".education-entry:last").append(formattedSName);
            $(".education-entry:last").append(formattedSlocation);
            $(".education-entry:last").append(formattedSYears);
            $(".education-entry:last").append(formattedSDegree);
            $(".education-entry:last").append(formattedSMajor);
        }
    }
    education.display();


//Online Classes to be displayed

    function displayOnline() {
        for (oclass in education.onlineCourses) {
            $("#onlineCourse").append(HTMLonlineClasses);

            var formattedOTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[oclass].title);
            var formattedOschool = HTMLonlineSchool.replace("%data%", education.onlineCourses[oclass].school).replace("#", education.onlineCourses[oclass].url);
            var formattedODates = HTMLonlineDates.replace("%data%", education.onlineCourses[oclass].dates);
            var formattedOURL = HTMLonlineURL.replace("%data%", education.onlineCourses[oclass].url);

            var formattedOSchoolTitle = formattedOTitle + formattedOschool;

            $(".onlineCourse-entry:last").append(formattedOSchoolTitle);
            $(".onlineCourse-entry:last").append(formattedODates);
            $(".onlineCourse-entry:last").append(formattedOURL);
        }
    }

    displayOnline();




    $("#mapDiv").append(googleMap);