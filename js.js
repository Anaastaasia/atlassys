document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    validateForm();
});

const inputs = document.querySelectorAll("input");
inputs.forEach(input => {
    input.addEventListener("blur", validateInput);
});

const dobInput = document.getElementById("dob");
dobInput.addEventListener("focus", function() {
    const button = document.querySelector(".calendar-button");
    button.style.display = 'none';
});
dobInput.addEventListener("blur", resetButton);

function openCalendar(button) {
    const dateInput = document.getElementById("dob");
    dateInput.focus();
    dateInput.type = 'date';
    button.style.display = 'none';
}

function resetButton() {
    const button = document.querySelector(".calendar-button");
    const dateInput = document.getElementById("dob");
    if (!dateInput.value) {
        dateInput.type = 'text';
    }
    button.style.display = 'flex';
}

function validateInput(event) {
    const input = event.target;
    let isValid = true;

    if (["yourName", "userName", "presentAddress", "city", "country", "permanentAddress"].includes(input.id)) {
        isValid = input.value.trim().length >= 2;
    }

    if (input.id === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailPattern.test(input.value.trim());
    }

    if (input.id === "password") {
        isValid = input.value.trim().length >= 3;
    }

    if (input.id === "postalCode") {
        const postalCodePattern = /^\d{5}$/;
        isValid = postalCodePattern.test(input.value.trim());
    }

    if (input.id === "dob") {
        const dob = input.value;
        isValid = validateDOB(dob);
    }

    if (!isValid) {
        input.classList.add("error");
    } else {
        input.classList.remove("error");
    }
}

function validateForm() {
    let errorMessages = [];
    inputs.forEach(input => {
        const event = { target: input };
        validateInput(event);
        if (input.classList.contains("error")) {
            errorMessages.push(`${input.id.replace(/([A-Z])/g, ' $1').trim()} is invalid.`);
        }
    });
    const errorMessageDiv = document.getElementById("errorMessages");
    if (errorMessages.length > 0) {
        errorMessageDiv.innerHTML = errorMessages.join("<br>");
    } else {
        errorMessageDiv.innerHTML = "Form submitted successfully!";
    }
}

function validateDOB(dob) {
    if (!dob) return false;
    const dateOfBirth = new Date(dob);
    const earliestDate = new Date('1920-01-01');
    return dateOfBirth >= earliestDate && dateOfBirth <= new Date();
}

function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    const nav = document.querySelector('.nav');
    
    // Добавляем или удаляем класс "active" для отображения меню
    sidebar.classList.toggle('active');
    nav.classList.toggle('active');
}
