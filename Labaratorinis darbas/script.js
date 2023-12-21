function toggleRowContent(row) {
    row.classList.toggle('open');
    
    /*
    const body = document.body;
    const isFooterHidden = body.classList.toggle('hide-footer', body.querySelector('.row.open') !== null);

    // If the footer is hidden, wait for a moment and then fade it in
    if (isFooterHidden) {
        setTimeout(() => {
            document.querySelector('footer').style.opacity = 1;
        }, 10); // Use a small delay to ensure the transition starts smoothly
    }
    */
}

// Skaiciavimai
// 1 variantas

function saveUserData() { 
        const form = document.getElementById('calculate');
        let name = form.fname.value;  // Use .value to get input value
        let surname = form.surname.value;
        let code = form.code.value;
        let grades = [form.g1.value, form.g2.value, form.g3.value, form.g4.value, form.g5.value];

        // Validate first name (allow only letters)
        if (!/^[A-Za-z]+$/.test(name)) {
            alert("Negaliojantis vardas");
            return;
        }

        // Validate last name (allow only letters)
        if (!/^[A-Za-z]+$/.test(surname)) {
            alert("Negaliojanti pavardė");
            return;
        }

        // Validate student code
        if (isNaN(code)) {
            alert("Negaliojantis studento kodas");
            return;
        }

        const student = {
            name: name,
            surname: surname,
            code: code,
            grades: grades
        };

        console.log("Saved information:", student);

        const averageGrade = (grades.reduce((acc, grade) => acc + parseInt(grade), 0) / grades.length).toFixed(2);
        console.log("Average mark: " + name + " " + surname + " (" + code + "): " + averageGrade);

        var displayDiv = document.createElement('div');
    displayDiv.innerHTML = "<h3>Studento informacija:</h3>" +
        "<p>Vardas: " + student.name + "</p>" +
        "<p>Pavardė: " + student.surname + "</p>" +
        "<p>Kodas: " + student.code + "</p><span style=\"padding: 20px;\">Pažymiai:</span>";
    for (let i = 0; i < grades.length; i++) {
        if (student.grades[i] <= 4) {
            displayDiv.innerHTML = displayDiv.innerHTML + "<span class=\"bad\">" + student.grades[i] + "</span><span>, </span>"
        } else if (student.grades[i] <= 8) {
            displayDiv.innerHTML = displayDiv.innerHTML + "<span class=\"good\">" + student.grades[i] + "</span><span>, </span>"
         } else {
            displayDiv.innerHTML = displayDiv.innerHTML + "<span class=\"great\">" + student.grades[i] + "</span><span>, </span>"
         }
        }
        displayDiv.innerHTML = displayDiv.innerHTML + "</p><br><p>" + "Pažymių vidurkis: " + name + " " + surname + " (" + code + "): " + averageGrade + "</p>";

        document.getElementById('results').innerHTML = ""; 
        document.getElementById('results').appendChild(displayDiv);
    }