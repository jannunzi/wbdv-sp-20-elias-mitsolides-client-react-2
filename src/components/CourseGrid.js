import React from "react";
import CourseCard from "./CourseCard"

const CourseGrid = (attributes) =>
    <div>
        <div>
            <h2>Course Grid...{attributes.courses.length}</h2>
        </div>
    {
        //div className Row Start
        <div className = "row">
    {
    attributes.courses.map(function(course) {
        return <div className = "col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
             <ul className style={{border: "solid"}}>
                    <CourseCard
                        key={course._id}
                        showCourseEditor={attributes.showCourseEditor}
                        deleteCourse={attributes.deleteCourse}
                        course={course}/>
             </ul>
        </div>

        })
    }
        </div> //div className Row Ends
    }
    </div>

export default CourseGrid