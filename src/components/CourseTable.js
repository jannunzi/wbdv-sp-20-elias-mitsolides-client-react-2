import React from "react";
import CourseRow from "./CourseRow";

const CourseTable = ({courses, deleteCourse, showCourseEditor}) =>
    <div>
        <h2>Course Table...{courses.length}</h2>

        <div className="row">
            <div className = "col-3">
                Title
            </div>
            <div className = "col-3 d-none d-md-block">
                Owned By
            </div>
            <div className = "col-3 d-none d-lg-block">
                Last Modified
            </div>
            <div className = "col-2">
                <i className="fas fa-grip-horizontal"></i>
            </div>
            <div className = "col-1">
                <i className="fas fa-sort-alpha-down"></i>
            </div>
        </div>

            {
                courses.map(function(course, index) {
            return <ul className="list-group" style={{border: "solid"}}>
                    <CourseRow
                        showCourseEditor={showCourseEditor}
                        deleteCourse={deleteCourse}
                        key={course._id}
                        course={course}/>
            </ul>
                })
            }

    </div>
export default CourseTable