"use strict";
// 🎓 Student Grading System
// 🏫 Create a system that manages student records and calculates their average grade.
//
// 1. Implement a class `Gradebook<T>` to store student records.
// 2. Implement a method `addStudent` that adds a new student with an empty grade list.
// 3. Implement a method `addGrade` that records a new grade for a student.
// 4. Implement a method `getAverageGrade` that returns a student’s average grade. (Formula to get average: sumOfAllGrades / numberOfSubjects)
// 5. Implement a method `getStudentGrades` that returns all recorded grades for a student. 
// 6. Implement a method `updateSubjectGrade` that updates a subject grade for a student.
class Gradebook {
    constructor() {
        this.students = [];
    }
    addStudent(student) {
        this.students.push(student);
        return `${student.name} added to the gradebook.`;
    }
    addGrade(id, grade) {
        const student = this.students.find(s => s.id === id);
        if (!student)
            return "Student not found.";
        student.grades.push(grade);
        return `Grade recorded for ${grade.subject}.`;
    }
    getAverageGrade(id) {
        const student = this.students.find(s => s.id === id);
        if (!student)
            return "Student not found.";
        if (student.grades.length === 0)
            return 0;
        const total = student.grades.reduce((sum, g) => sum + g.grade, 0);
        return total / student.grades.length;
    }
    getStudentGrades(id) {
        const student = this.students.find(s => s.id === id);
        if (!student)
            return "Student not found.";
        return student.grades;
    }
    updateSubjectGrade(id, subject, newGrade) {
        const student = this.students.find(s => s.id === id);
        if (!student)
            return "Student not found.";
        const subjectGrade = student.grades.find(g => g.subject === subject);
        if (!subjectGrade)
            return `Subject ${subject} not found for student.`;
        subjectGrade.grade = newGrade;
        return `${subject} grade updated to ${newGrade}.`;
    }
}
const gradebook = new Gradebook();
console.log(gradebook.addStudent({ id: 1, name: "Alice", grades: [] }));
// "Alice added to the gradebook."
console.log(gradebook.addGrade(1, { subject: "Math", grade: 90 }));
// "Grade recorded for Math."
console.log(gradebook.addGrade(1, { subject: "English", grade: 80 }));
// "Grade recorded for English."
console.log(gradebook.addGrade(1, { subject: "Science", grade: 85 }));
// "Grade recorded for Science."
console.log(gradebook.getStudentGrades(1));
// [ { subject: 'Math', grade: 90 }, { subject: 'English', grade: 80 }, { subject: 'Science', grade: 85 } ]
console.log(gradebook.getAverageGrade(1));
// 85
console.log(gradebook.updateSubjectGrade(1, "English", 95));
// "English grade updated to 95."
console.log(gradebook.getStudentGrades(1));
// [ { subject: 'Math', grade: 90 }, { subject: 'English', grade: 95 }, { subject: 'Science', grade: 85 } ]
console.log(gradebook.getAverageGrade(1));
// 90
