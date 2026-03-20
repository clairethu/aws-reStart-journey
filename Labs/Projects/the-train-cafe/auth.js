function openAuth() {
    document.getElementById('authModal').style.display = 'block';
    //alert("The 'Start Button' works! The logic is connected.");
}

function closeAuth() {
    document.getElementById('authModal').style.display = 'none';
}

function showSignUp() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('signupSection').style.display = 'block';
}

function showLogin() {
    document.getElementById('signupSection').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
}

// Close modal if user clicks outside of the white box
window.onclick = function(event) {
    let modal = document.getElementById('authModal');
    if (event.target == modal) {
        closeAuth();
    }
}