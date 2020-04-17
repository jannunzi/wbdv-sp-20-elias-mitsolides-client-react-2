import React from "react";
import CourseHeading from "../components/CourseHeading";
import CourseTable from "../components/CourseTable";
import CourseGrid from "../components/CourseGrid";
import CourseEditor from "../components/CourseEditor";
import {deleteCourse, createCourse, findAllCourses, findCourseById} from "../services/CourseService"
import {BrowserRouter as Router, Link, Route, Switch, useHistory} from "react-router-dom";
import CourseList from "../components/CourseList";

class CourseManager extends React.Component {
    state = {
        layout: 'table',
        editingCourse: false,
        newCourseTitle: 'Kingdom Hearts',
        courses: [],
        path_layout: 'grid',
        course_showing: false,
        courseNameFromId: ''
    }

    componentDidMount = async () => {

        const allCourses = await findAllCourses()
        this.setState({
            courses: allCourses
        })

        // findAllCourses()
        //     .then(courses => this.setState({
        //         courses: courses
        //     }))
    }

    courseShowingChange = () => {
        this.setState((prevState) => {
            if (prevState.course_showing === false) {
                return {
                    course_showing: true
                }
            }
            else {
                return {
                    course_showing: false
                }
            }
    })
    }

    deleteCourse = async (deletedCourse) => {
        const status = await deleteCourse(deletedCourse._id)
        const courses = await findAllCourses()
        this.setState({
            courses: courses
        })
        // this.setState(prevState => ({
        //     courses: prevState.courses.filter(course => course._id !== deletedCourse._id)
        // }))
    }
    toggle = () => {
        this.setState((prevState) => {

            if (prevState.layout === 'grid') {
                return {
                    layout: 'table',
                    path_layout: 'grid'
                }
            } else {
                return {
                    layout: 'grid',
                    path_layout: 'table'
                }
            }
        })
    }

    showCourseEditor = () =>
        this.setState({
            editingCourse: true
        })

    hideCourseEditor = () =>
        this.setState({
            editingCourse: false
        })

    findCourseName = async(courseId) => {
        const foundCourse = await findCourseById(courseId)
        console.log(foundCourse)
        console.log(foundCourse.title)
        this.setState({courseNameFromId: foundCourse.title})


    }

    addCourse = async () =>
    {
        const newCourse = {
            title: this.state.newCourseTitle
        }
        const actualCourse = await createCourse(newCourse)
        console.log(actualCourse)
        const allCourses = await findAllCourses()
        this.setState({
            courses: allCourses
        })
        // this.setState(prevState => ({
        //     courses: [
        //         ...prevState.courses,
        //         {
        //             _id: (new Date()).getTime() + "",
        //             title: prevState.newCourseTitle
        //         }
        //     ]
        // }))
    }

    updateForm = (e) =>
        this.setState({
            newCourseTitle: e.target.value
        })
    render2() {
        return(
            <h1>Hello World</h1>
        )
    }

    render() {
        return (
            <div>
                <div className="form-group row container-fluid">
                    <input

                        className="form-control col-10"
                    onChange={this.updateForm}
                    value={this.state.newCourseTitle}
                    />
                    <button className="col-2"
                            onClick={this.addCourse}>
                        Add Course
                    </button>
                </div>



                <Router>
                    {this.state.editingCourse === false &&
                    <div>
                        <CourseHeading/>
                        <Link onClick={this.toggle} to={`/${this.state.path_layout}`}>
                            Toggle
                        </Link>
                    </div>
                    }

                    {/*<Route path="/course/:courseId"*/}
                    {/*       exact={true}*/}
                    {/*       render={(props) =>*/}
                    {/*           <CourseEditor*/}
                    {/*               {...props} //makes name-value pairs, att-val*/}
                    {/*           courseId={props.match.params.courseId}*/}
                    {/*           courseName = {this.findCourseName}*/}
                    {/*           hideCourseEditor={this.hideCourseEditor}/>*/}
                    {/*       }/>*/}
                    {/*<Route path="/course/:courseId/module/:moduleId"*/}
                    {/*       exact={true}*/}
                    {/*       render={(props) =>*/}
                    {/*           <CourseEditor*/}
                    {/*               {...props}*/}
                    {/*               moduleId={props.match.params.moduleId}*/}
                    {/*               courseId={props.match.params.courseId}/>*/}
                    {/*       }/>*/}
                    {/*<Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"*/}
                    {/*       exact={true}*/}
                    {/*       render={(props) =>*/}
                    {/*           <CourseEditor*/}
                    {/*               {...props}*/}
                    {/*               lessonId={props.match.params.lessonId}*/}
                    {/*               moduleId={props.match.params.moduleId}*/}
                    {/*               courseId={props.match.params.courseId}/>*/}
                    {/*       }/>*/}
                    {/*<Route path="/course/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId"*/}
                    {/*       exact={true}*/}
                    {/*       render={(props) =>*/}
                    {/*           <CourseEditor*/}
                    {/*               {...props}*/}
                    {/*               topicId={props.match.params.topicId}*/}
                    {/*               lessonId={props.match.params.lessonId}*/}
                    {/*               moduleId={props.match.params.moduleId}*/}
                    {/*               courseId={props.match.params.courseId}/>*/}
                    {/*       }/>*/}

                   {/*<Route path = "/"*/}
                   {/*       exact={true}*/}
                   {/*       render = {() =>*/}
                   {/*           <CourseList*/}
                   {/*               toggle = {this.toggle}*/}
                   {/*               layout = {this.state.layout}*/}
                   {/*               showCourseEditor = {this.showCourseEditor}*/}
                   {/*               deleteCourse = {this.deleteCourse}*/}
                   {/*               courses = {this.state.courses}*/}
                   {/*           />*/}
                   {/*       }/>*/}
                    <Route path = "/grid"
                           exact={true}
                           render = {() =>
                               <CourseList
                                   toggle = {this.toggle}
                                   layout = {'grid'}
                                   showCourseEditor = {this.showCourseEditor}
                                   deleteCourse = {this.deleteCourse}
                                   courses = {this.state.courses}
                                   showingChange = {this.courseShowingChange}

                               />
                           }/>

                    <Route path = "/table"
                           exact={true}
                           render = {() =>
                               <CourseList
                                   toggle = {this.toggle}
                                   layout = {'table'}
                                   showCourseEditor = {this.showCourseEditor}
                                   deleteCourse = {this.deleteCourse}
                                   courses = {this.state.courses}
                                   showingChange = {this.courseShowingChange}
                               />
                           }/>


                </Router>

            </div>
        )
    }
}

export default CourseManager
