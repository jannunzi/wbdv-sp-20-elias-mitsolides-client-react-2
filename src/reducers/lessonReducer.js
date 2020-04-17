import {CREATE_LESSON, DELETE_LESSON, SHOW_MODULE_LESSONS, UPDATE_LESSON} from "../actions/lessonActions";

const initialState = {
    current_lesson:{},
    lessons: []
}

const lessonReducer = (state = initialState, action) => {

    switch (action.type){
        case SHOW_MODULE_LESSONS:
            return{
                lessons: action.lessons
            }
        case CREATE_LESSON:
            return {
                lessons: [
                    ...state.lessons,
                    action.newLesson
                ]
            }
        case DELETE_LESSON:
            return {
                lessons: state.lessons.filter(lesson => lesson._id !== action.lessonId)
            }
        case UPDATE_LESSON:
            return {
                lessons: [
                    ...state.lessons
                ]
            }
        default:
            return state
    }
}

export default lessonReducer