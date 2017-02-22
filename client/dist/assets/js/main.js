// When the user clicks on the profile picture,
// toggle between hiding and showing the dropdown content

function triggerProfileDropdown() {
    document.getElementById('profileDropdown').classList.toggle('show');
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
     if(!event.target.matches('.img-profile') && !event.target.matches('.dropdown')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        var i;
        for(i = 0; i < dropdowns.length; i ++) {
            var openDropdown = dropdowns[i];
            if(openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

var passwordInput = document.getElementById('password');
var colors = ["grey", "red", "orange", "yellow", "green"];

// Function to rate a password based on length as well as complexity
// http://stackoverflow.com/questions/948172/password-strength-meter
function ratePassword(password) {
    var score = 0;

    // Award every unique letter until 5 repetitions
    var letters = new Object();
    for(var i = 0; i < password.length; i ++) {
        letters[password[i]] = (letters[password[i]] || 0) + 1;
        score += 5.0 / letters[password[i]];
    }

    // Bonus points for mixing it up
    var variations = {
        digits: /\d/.test(password),
        lower: /[a-z]/.test(password),
        upper: /[A-Z]/.test(password),
        nonWords: /\W/.test(password),
    }

    variationCount = 0;
    for(var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    // Change the text color of the password input field accordingly
    if(score > 80) {
        colorIndex = 4;
    } else if(score > 60) {
        colorIndex = 3;
    } else if(score > 30) {
        colorIndex = 2;
    } else if(score >= 5) {
        colorIndex = 1;
    } else {
        colorIndex = 0;
    }

    passwordInput.style.color = colors[colorIndex];
}

passwordInput.oninput = function() {
	this.onkeydown = null;
	ratePassword(this.value);
};

passwordInput.onkeydown = function() {
	ratePassword(this.value);
};
