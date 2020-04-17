import React from "react";
import {connect} from "react-redux"
import topicService from "../services/TopicService"
import {createTopic, findAllTopics} from "../actions/topicActions";
import TopicPillsItem from "./TopicPillsItem"

class TopicPills extends React.Component{
    componentDidMount() {
        this.props.findTopicsForLesson(this.props.lessonId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.lessonId !== prevProps.lessonId) {
            this.props.findTopicsForLesson(this.props.lessonId)
        }
    }

    state = {
        activeTopicId: this.props.topicId,
        editingTopicId: '',
    }

    render() {
        return (
            <ul className="nav nav-pills">
                {this.props.topics &&
                this.props.topics.map(topic =>

                    <TopicPillsItem
                        key={topic.id}
                        edit = {() => {
                            console.log('TOPIC EDIT')
                            const topicId = topic.id
                            this.props.history.push(`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${topicId}`)
                            this.setState({
                                editingTopicId: topic.id,
                                activeTopicId: topic.id
                            })
                        }}
                        select = {() => {
                            console.log('TOPIC SELECT')
                            const topicId = topic.id
                            this.props.history.push(`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${topicId}`)
                            this.setState({
                                activeTopicId: topic.id,
                            })
                            this.setState(
                                prevState => ((prevState.editingTopicId !== topic.id) ?
                                        {editingTopicId: ''} : {})
                                )
                        }}
                        save = {() => {
                            this.props.history.push(`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}`)
                            this.setState({
                                editingTopicId: '',
                                activeTopicId: ''
                            })
                        }}
                        editing={topic.id === this.state.editingTopicId}
                        active={topic.id === this.state.activeTopicId}
                        topic={topic}
                    />)

                }

                <li className="nav-item">

                    <button type = "button"
                            className="wbdv-topic-item-add-btn"
                            onClick={() => this.props.createTopic(this.props.lessonId)}>
                        <i className="fa fa-plus">
                        </i>
                    </button>
                </li>

            </ul>

        )
    }
}

const stateToPropertyMapper = (state) => {
    return {
        topics: state.topicReducer.topics
    }
}

const dispatchToPropertyMapper = (dispatch) => {
    return {
        findTopicsForLesson: (lessonId) => {
            topicService.findTopicsForLesson(lessonId).then(actualTopics =>
                dispatch(findAllTopics(actualTopics)))
        },
        createTopic: (lessonId) => {
            topicService.createTopic((lessonId), {
                title: "New Topic",
                lessonId: lessonId
            }).then(actualTopic =>
                dispatch(createTopic(actualTopic)))
        }
    }
}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(TopicPills)




//(
//             <ul className="nav nav-pills">
//                 <li className="nav-item wbdv-topic-pill">
//                     <a className="nav-link" href="#">
//                         Topic 1
//                     </a>
//                 </li>
//
//                 <li className="nav-item wbdv-topic-pill">
//                     <a className="nav-link active" href="#">
//                         Topic 2
//                     </a>
//                 </li>
//
//                 <li className="nav-item wbdv-topic-pill">
//                     <a className="nav-link" href="#">
//                         Topic 3
//                     </a>
//                 </li>
//
//                 <li className="nav-item">
//                     <a className="nav-link" href="#">
//
//                         <button type="button" className="wbdv-topic-add-btn">
//                             <i className="fa fa-plus">
//                             </i>
//                         </button>
//                     </a>
//                 </li>
//             </ul>
//         );