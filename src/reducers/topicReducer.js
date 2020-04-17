import {CREATE_TOPIC, DELETE_TOPIC, SHOW_LESSON_TOPICS, UPDATE_TOPIC} from "../actions/topicActions";

const initialState = {
    topic:{},
    topics:[]
}


const topicReducer = (state = initialState, action) => {
    switch (action.type){
        case SHOW_LESSON_TOPICS:
            return {
                topics: action.topics
            }
        case CREATE_TOPIC:
            return {
                topics: [
                    ...state.topics,
                    action.newTopic
                ]
            }
        case DELETE_TOPIC:
            return {
                topics: state.topics.filter(topic => topic.id !== action.topicId)
            }
        case UPDATE_TOPIC:
            return {
                topics: [
                    ...state.topics
                ]
            }
        default:
            return state
    }
}

export default topicReducer