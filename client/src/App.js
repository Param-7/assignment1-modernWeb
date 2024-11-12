import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentList from './components/StudentList';
import CourseList from './components/CourseList';

function App() {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: '', department: '', semester: '', enrolledCourses: '', completedCourses: '' });
    const [newCourse, setNewCourse] = useState({ name: '', department: '', isOpen: false });

    useEffect(() => {
        // Fetch students
        axios.get('http://localhost:8000/api/students')
            .then(response => setStudents(response.data))
            .catch(error => console.error('Error fetching students:', error));
        
        // Fetch courses
        axios.get('http://localhost:8000/api/courses')
            .then(response => setCourses(response.data))
            .catch(error => console.error('Error fetching courses:', error));
    }, []);

    const addStudent = () => {
        const formattedStudent = {
            ...newStudent,
            enrolledCourses: newStudent.enrolledCourses.split(',').map(course => course.trim()),
            completedCourses: newStudent.completedCourses.split(',').map(course => course.trim())
        };
        
        axios.post('http://localhost:8000/api/students', formattedStudent)
            .then(response => {
                setStudents([...students, response.data]);
                setNewStudent({ name: '', department: '', semester: '', enrolledCourses: '', completedCourses: '' });
            })
            .catch(error => console.error('Error adding student:', error));
    };

    const addCourse = () => {
        axios.post('http://localhost:8000/api/courses', newCourse)
            .then(response => {
                setCourses([...courses, response.data]);
                setNewCourse({ name: '', department: '', isOpen: false });
            })
            .catch(error => console.error('Error adding course:', error));
    };

    return (
        <div>
            <h1>Student-Course Application</h1>
            <StudentList students={students} />
            <CourseList courses={courses} />

            <h2>Add New Student</h2>
            <div>
                <input type="text" placeholder="Name" value={newStudent.name} onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })} />
                <input type="text" placeholder="Department" value={newStudent.department} onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })} />
                <input type="number" placeholder="Semester" value={newStudent.semester} onChange={(e) => setNewStudent({ ...newStudent, semester: e.target.value })} />
                <input type="text" placeholder="Enrolled Courses (comma separated)" value={newStudent.enrolledCourses} onChange={(e) => setNewStudent({ ...newStudent, enrolledCourses: e.target.value })} />
                <input type="text" placeholder="Completed Courses (comma separated)" value={newStudent.completedCourses} onChange={(e) => setNewStudent({ ...newStudent, completedCourses: e.target.value })} />
                <button onClick={addStudent}>Add Student</button>
            </div>

            <h2>Add New Course</h2>
            <div>
                <input type="text" placeholder="Course Name" value={newCourse.name} onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} />
                <input type="text" placeholder="Department" value={newCourse.department} onChange={(e) => setNewCourse({ ...newCourse, department: e.target.value })} />
                <label>
                    <input type="checkbox" checked={newCourse.isOpen} onChange={(e) => setNewCourse({ ...newCourse, isOpen: e.target.checked })} />
                    Open for Enrollment
                </label>
                <button onClick={addCourse}>Add Course</button>
            </div>
        </div>
    );
}

export default App;

