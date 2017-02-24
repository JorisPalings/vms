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
