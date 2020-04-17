import React from "react";
import {updateCourse} from "../services/CourseService";
import {Link} from "react-router-dom";

class CourseRow extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        editing: false,
        course_original: this.props.course,
        course: this.props.course,
        visible_delete: true,
        active: false,  // is what makes it light blue
        visible_save: false,
        new_date: new Date()
    };

    editCourse = () => {
    if (this.state.editing === false ) {

        this.setState(prevState => ({
            active: !prevState.active
        }))
    }
    };

    render() {
        return(
            <li className={`list-group-item ${this.state.active?'active':''}`}
                onClick={() => this.editCourse()}>
                <div className="row">

                    <div className="col-3">
                        {   !this.state.editing &&
                        <Link to={`/course/${this.props.course._id}`}//course id appended
                        style={{color: 'orange'}}>
                            {this.state.course.title}
                        </Link>
                        }

                        {
                            this.state.editing &&
                            <input
                                onChange={(e) => this.setState({
                                    course: {
                                        ...this.state.course,
                                        title: e.target.value
                                    }
                                })}
                                value={this.state.course.title}/>
                        }
                    </div>

                    <div className="col-3 d-none d-md-block">
                        Me
                    </div>

                    <div className = "col-3 d-none d-lg-block">
                        {`${this.state.new_date.getMonth()+1} /
                            ${this.state.new_date.getDate()} /
                            ${this.state.new_date.getFullYear()}
                        `}
                    </div>

                    <div className = "col-3 d-block justify-content-end">
                {
                    (!this.state.editing && this.state.active) &&
                <button onClick={() => { //Edit Button
                    this.setState({active: true});
                    this.setState({visible_delete: ! this.state.visible_delete})
                    this.setState({visible_save: !this.state.visible_save})
                    this.setState({editing: !this.state.editing });
                    this.editCourse();
                }}
                        className="fas fa-pencil-alt">

                </button>
                }

                {
                    (this.state.visible_delete && this.state.active) &&
                    <button onClick={() => this.props.deleteCourse(this.props.course)}
                    className="fas fa-trash-alt fa">
                    </button>
                }

                {
                this.state.visible_save &&
                    <button onClick={() => {
                        updateCourse(this.state.course._id, this.state.course).then(status => {
                            this.setState({visible_delete: !this.state.visible_delete});
                            this.setState({editing: false});
                            this.setState({course_original: this.state.course});
                            this.setState({visible_save: !this.state.visible_save});
                            this.setState({active: false});
                        });
                    }}
                        className="fas fa-check">
                    </button>
                }
                    </div>

                </div>
            </li>
        )
    }
}

export default CourseRow