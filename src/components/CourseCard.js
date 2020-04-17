import React from 'react'
import {updateCourse} from "../services/CourseService";
import {Link} from "react-router-dom";


export default class CourseCard extends React.Component{
    constructor(props) {
        super(props);
    }

    state = {
        editing: false,
        course_original: this.props.course,
        course: this.props.course,
        visible_delete: true,
        active: false,
        visible_save: false
    }

    editCourse = () => {
        //if (this.state.editing )
        this.setState(prevState => ({
            active: !prevState.active
        }))
    }

    render() { return (
        <div className="card" styles={{width: '18rem'}}>
            <img className="card-img-top"
                 src="https://picsum.photos/300/200"/>
            <div className="card-body">
                {!this.state.editing &&
                <Link className="card-title"
                      to={`/course/${this.props.course._id}`}>
                    {this.state.course.title}
                </Link>
                }
                {
                    this.state.editing &&
                    <input
                        className="card-title form-control"
                       href="#"
                        onChange={(e) => this.setState({
                            course: {
                                ...this.state.course,
                                title: e.target.value
                            }
                        })}
                        value={this.state.course.title}/>


                }
                <p className="card-text">
                    {
                        !this.state.editing &&
                        <button onClick={() => { //Edit Button
                            this.setState({visible_delete: ! this.state.visible_delete})
                            this.setState({visible_save: !this.state.visible_save})
                            this.setState({editing: !this.state.editing });}}
                        className="fas fa-pencil-alt">

                        </button>
                    }
                    {
                        this.state.visible_delete &&
                        <button className="fas fa-trash-alt fa"
                           onClick={() => this.props.deleteCourse(this.props.course)}
                           >
                        </button>

                    }
                    {
                        this.state.visible_save &&
                        <button
                                onClick={() => {
                            updateCourse(this.state.course._id, this.state.course).then(status => {})
                            this.setState({visible_delete: ! this.state.visible_delete})
                            this.setState({editing: false})
                            this.setState({course_original:this.state.course})
                            this.setState({visible_save: ! this.state.visible_save})
                        }}
                        className="fas fa-check">

                        </button>
                    }
                </p>
                </div>
        </div>
    )
    }
}