import React from "react";
import {connect} from "react-redux";
import lessonService from "../services/LessonService";
import {createLesson, findAllLessons} from "../actions/lessonActions";
import LessonItem from "./LessonItem"

class LessonTabs extends React.Component{
    componentDidMount() {
        this.props.findLessonsForModule(this.props.moduleId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.moduleId !== prevProps.moduleId) {
            this.props.findLessonsForModule(this.props.moduleId)
        }
    }

    state = {
        activeLessonId: this.props.lessonId,
        editingLessonId: '',

    }

    render() {
        return(
            <ul className="nav nav-tabs">
                {this.props.lessons &&
                this.props.lessons.map(lesson =>

                    <LessonItem
                        key={lesson._id}
                        edit = {() => {
                            console.log('LESSON EDIT')
                            const lessonId = lesson._id
                            this.props.history.push(`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${lessonId}`)
                            this.setState({   //more like push.setState
                                editingLessonId: lesson._id,
                                activeLessonId: lesson._id
                            })
                            //this.state.editingModuleId = module._id ... dont uncomment or else world explodes
                        }}
                        select = {() => {
                            console.log('LESSON SELECT')
                            const lessonId = lesson._id
                            this.props.history.push(`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${lessonId}`)

                            this.setState({   //more like push.setState
                                activeLessonId: lesson._id,//this is state.activeModuleId from??
                            })
                            // "old if ()" You know 41 run but not if 42/43 run
                            this.setState(
                                prevState => ((prevState.editingLessonId !== lesson._id) ?
                                    {editingLessonId: ''} : {})
                            )
                        }}
                        save = {() => {
                            this.props.history.push(`/course/${this.props.courseId}/module/${this.props.moduleId}`)
                            this.setState({
                                editingLessonId: '',
                                activeLessonId: ''
                            })
                        }}
                        editing={lesson._id === this.state.editingLessonId}
                        active={lesson._id === this.state.activeLessonId}
                        lesson={lesson}/>)

                }




                <li className="nav-item">

                    <button type = "button"
                            className="wbdv-lesson-item-add-btn"
                        onClick={() => this.props.createLesson(this.props.moduleId)}>
                        <i className="fa fa-plus">
                        </i>
                    </button>
                </li>
            </ul>
        )
    }
}
// <div>
// <h2>Lessons</h2>
// <ul className="nav nav-tabs">
//     <li className="nav-items">
//         <a className="nav-link" href="#">
//             Lesson 1
//         </a>
//     </li>
//
//     <li className="nav-items">
//         <a className="nav-link active" href="#">
//             Lesson 2
//         </a>
//     </li>
//
//     <li className="nav-items">
//         <a className="nav-link" href="#">
//             Lesson 3
//         </a>
//     </li>
// </ul>
//
// </div>




const stateToPropertyMapper = (state) => {
    return {
        lessons: state.lessonReducer.lessons
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findLessonsForModule: (moduleId) =>
            lessonService.findLessonsForModule(moduleId).then(actualLessons =>
                dispatch(findAllLessons(actualLessons))),
        createLesson: (moduleId) => {
            lessonService.createLesson((moduleId), {
                title: "New Lesson",
            }).then(actualLesson =>
            dispatch(createLesson(actualLesson)))
        }

    }
}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(LessonTabs)