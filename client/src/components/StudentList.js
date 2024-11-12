import React from 'react';

function StudentList({ students }) {
    return (
        <div>
            <h2>Student List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Semester</th>
                        <th>Enrolled Courses</th>
                        <th>Completed Courses</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.department}</td>
                            <td>{student.semester}</td>
                            <td>{student.enrolledCourses.join(', ')}</td>
                            <td>{student.completedCourses.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;
