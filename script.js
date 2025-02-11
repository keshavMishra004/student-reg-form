document.addEventListener("DOMContentLoaded", loadStudents);

document.getElementById("student-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let studentId = document.getElementById("student-id").value.trim();
    let email = document.getElementById("email").value.trim();
    let contact = document.getElementById("contact").value.trim();

    if (!name.match(/^[A-Za-z ]+$/) || isNaN(studentId) || !email.includes("@") || isNaN(contact)) {
        alert("Please enter valid details.");
        return;
    }

    let student = { name, studentId, email, contact };
    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    document.getElementById("student-form").reset();
    loadStudents();
});

function loadStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let tableBody = document.getElementById("student-table");

    tableBody.innerHTML = "";
    students.forEach((student, index) => {
        let row = `<tr>
            <td>${student.name}</td>
            <td>${student.studentId}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students"));
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}

function editStudent(index) {
    let students = JSON.parse(localStorage.getItem("students"));
    let student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("student-id").value = student.studentId;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}
