import CourseHeading from "./CourseHeading";
import CourseTable from "./CourseTable";
import CourseGrid from "./CourseGrid";
import React from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";

const CourseList =
    ({
        toggle, layout, showCourseEditor, deleteCourse, courses
     }) =>
    <div>

        {layout === 'table' &&
        //<Link to="/table">
        <CourseTable
            showCourseEditor={showCourseEditor}
            deleteCourse={deleteCourse}
            courses={courses}/>

        //</Link>
        }


        {layout === 'grid' &&
            //<Link to="/grid">
        <CourseGrid
            showCourseEditor={showCourseEditor}
            deleteCourse={deleteCourse}
            courses={courses}/>

            //</Link>
            }



    </div>

export default CourseList

