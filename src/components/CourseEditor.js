import React from "react";
import ModuleList from "./ModuleList";
import LessonTabs from "./LessonTabs";
import TopicPills from "./TopicPills";
import WidgetList from "./WidgetList";
import {Link} from "react-router-dom";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import moduleReducer from "../reducers/moduleReducer";
import lessonReducer from "../reducers/lessonReducer";
import topicReducer from "../reducers/topicReducer";
import widgetReducer from "../reducers/widgetReducer";
//redux lets you make fsm s, can calc next state, sm has a set of states
//based on action transitions from one state to next

//calc next state, redux takes this fsm/reducer, prov with cur state and actions, prove next state
//undo could be, traverse this history by some backward index
// const moduleReducer = (state = initialState, action) => {
//     return state
// }

//redux keeps track of history of all states created
//made from fsm
//once we have store, we can provide that app level store to rest of app
//...with a component called <Provider>
// common practice is to keep reducers in their own file
//"only the reducer is managing state"

const reducers = combineReducers({
    moduleReducer, lessonReducer, topicReducer, widgetReducer
})

//const store = combineReducers({moduleReducer, lessonReducer})
const store = createStore(reducers)

const CourseEditor = ({hideCourseEditor, match, history, courseId, courseName, moduleId, lessonId, topicId, historyId}) =>
    <Provider store ={store}> {/*all under me share from this store*/}

    <div className="container-fluid border border-dark">

        <h1 className="wbdv-course-title">

            <Link to="/table">
                <i className="fas fa-window-close"></i>
            </Link>
            {/*<button*/}
            {/*        onClick={() => history.push("/")}*/}
            {/*        type="button"*/}
            {/*        className="wbdv-course-editor wbdv-close">*/}
            {/*    <i className="fas fa-window-close">*/}
            {/*    </i>*/}
            {/*</button>*/}
            {/*<button type="button">*/}
            {/*    <i className="fas fa-window-close" onClick={() => history.goBack()}></i>*/}
            {/*</button>*/}

            {/*{match.params.courseId  WHAT DOES MATCH AND PARAMS MEAN}*/}
            <span>CS {match.params.courseId} </span>

            <span>
                <button type="button" className="wbdv-page-tab">
                    Build
                </button>
            </span>

            <span>
                <button type="button" className="wbdv-page-tab">
                    Theme
                </button>
            </span>

            <span className="wbdv-new-page-btn">
                <button type="button" className="wbdv-new-page-tab">
                    <i className="fa fa-plus">
                    </i>
                </button>
            </span>
        </h1>

        <div className="row">
            <div className="col-4">
                <h4>Module List</h4>
                {/*module list, top pills, lesson tab can all read from the state variable*/}
                {/*specifically the store variable in the "Provider" tag*/}
                <ModuleList
                    history={history}
                    courseId={courseId}
                    moduleId={moduleId}/>
            </div>
            <div className="col-8">
                <LessonTabs
                    history={history}
                    courseId={courseId}
                    moduleId={moduleId}
                    lessonId={lessonId}
                />
                <TopicPills
                    history={history}
                    courseId={courseId}
                    moduleId={moduleId}
                    lessonId={lessonId}
                    topicId={topicId}
                />

                <WidgetList
                    history={history}
                    topicId = {topicId}/>
            </div>
        </div>
    </div> {/*container ends*/}
    </Provider>

export default CourseEditor