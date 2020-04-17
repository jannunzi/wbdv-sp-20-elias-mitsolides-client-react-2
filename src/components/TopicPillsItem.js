import React from "react";
import topicService from "../services/TopicService";
import {deleteTopic, updateTopic} from "../actions/topicActions";

import {connect} from "react-redux";

class TopicPillsItem extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {

    topic_original: this.props.topic,
    topic_changing: this.props.topic,
    editing: this.props.editing
    }
    render() {
        if (!this.props.editing)
            this.state.topic_changing = this.state.topic_original
        return (
            <li
                onClick = {this.props.select}
                className={`nav-item`}>

                <a className={`nav-link ${this.props.active ? 'active':''}`}>

                {!this.props.editing &&
                <span>
                    {this.state.topic_changing.title}
                </span>
                }

                    {
                        this.props.editing &&
                        <input
                            onChange={(e) => this.setState({
                                topic_changing: {
                                    ...this.state.topic_changing,
                                    title: e.target.value
                                }
                            })}
                            value={this.state.topic_changing.title}/>
                    }

                    {this.props.editing && //DELETE BUTTON DELETE BUTTON BEGIN
                        <span>

                            <button type="button"
                                    className="wbdv-topic-item-delete-btn float-right"
                                    onClick={() =>

                                        this.props.deleteTopic(this.props.topic.id)}>

                                <i className="fas fa-window-close">
                                </i>
                            </button>

                            <button type="button"
                                    className="wbdv-topic-item-edit-btn float-right"
                                    onClick={() => {
                                        this.props.updateTopic(this.props.topic.id, this.state.topic_changing);
                                        this.setState({
                                            topic_original: this.state.topic_changing
                                        })
                                        this.props.save();
                                    }}>
                                <i className="fas fa-check"></i>
                            </button>

                        </span>

                    }

                    {!this.props.editing &&
                    <button onClick={this.props.edit}>
                        <i className="fas fa-pencil-alt"></i>
                    </button>}

                </a>

            </li>
        );
    }
}

const stateToPropertyMapper = (state) => ({})

const dispatchToPropertyMapper = (dispatch) => {
    return {
        //commonly one would move the objects being dispatched to an actions folder
        deleteTopic: (topicId) => {
            topicService.deleteTopic(topicId)
                .then(status =>
                    dispatch(deleteTopic(topicId)))
        },
        updateTopic: (topicId, topic) => {
            topicService.updateTopic(topicId, topic)
                .then(status => dispatch(updateTopic(topicId, topic)))
        }
    }
}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(TopicPillsItem)

//constructor(props) {
//         super(props);
//     }
//
//     state = {
//         topic_original: this.props.topic,
//         topic_changing: this.props.topic,
//         editing: this.props.editing
//     }
//
//     render() {
//         if (!this.props.editing)
//             this.state.topic_changing = this.state.topic_original
//         return (
//
//         )
//     }