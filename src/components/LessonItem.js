import React from "react";
import lessonService from "../services/LessonService";
import {deleteLesson, updateLesson} from "../actions/lessonActions";

import {connect} from "react-redux";

class LessonItem extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {

        lesson_original: this.props.lesson,
        lesson_changing: this.props.lesson,
        editing: this.props.editing
    }
    render() {
        if (!this.props.editing)
            this.state.lesson_changing = this.state.lesson_original
        return (
            <li
                onClick  = {this.props.select}
                className={`nav-item`}>

                <a classfName={`nav-link ${this.props.active ? 'active':''}`}>

                {!this.props.editing &&
                <span>
                    {this.state.lesson_changing.title}
                </span>
                }

                {
                    this.props.editing &&
                    <input
                        onChange={(e) => this.setState({
                            lesson_changing: {
                                ...this.state.lesson_changing,
                                title: e.target.value
                            }
                        })}
                        value={this.state.lesson_changing.title}/>
                }

                {this.props.editing && //DELETE BUTTON DELETE BUTTON BEGIN
                <span>

            <button type="button"
                    className="wbdv-lesson-item-delete-btn float-right"
                    onClick={() =>
                        //moduleService.deleteModule(module._id)} WHY THIS NEEDS REFRESH???
                        //my question: how does this render on the spot while somehow filling param deleteModule???
                        this.props.deleteLesson(this.props.lesson._id)}>

                <i className="fas fa-window-close">

                </i>
            </button>


            <button type="button"
                    className="wbdv-lesson-item-edit-btn float-right"
                    onClick={() => {
                        this.props.updateLesson(this.props.lesson._id, this.state.lesson_changing);
                        this.setState({
                            lesson_original: this.state.lesson_changing
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

const stateToPropertyMapper = (state) => ({})//WHY THIS EMPTY COMP TO mod-list state to prop fun

const dispatchToPropertyMapper = (dispatch) => {
    return {
        //commonly one would move the objects being dispatched to an actions folder
        deleteLesson: (lessonId) => {
            lessonService.deleteLesson(lessonId)
                .then(status =>
                    dispatch(deleteLesson(lessonId)))
        },
        updateLesson: (lessonId, lesson) => {
            lessonService.updateLesson(lessonId, lesson)
                .then(status => dispatch(updateLesson(lessonId, lesson)))
        }
    }
}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(LessonItem)










//className={'nav-item'}
