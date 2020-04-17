import React from "react";

export default class ImageWidget extends React.Component {
    state = {
        editing: this.props.editing,
        widget: this.props.widget,
        widget_changing: this.props.widget
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.editing !== this.props.editing) {
            this.setState({
                editing: this.props.editing

            })
        }
    }

    render(){                   //{widget.title}
        if (!this.props.editing)
            this.state.widget_changing = this.state.widget;
        return(
            <div className="container border border-secondary">

                {
                    !this.props.editing &&
                    <span>
                        <img className="widget_picture"
                             src="http://lorempixel.com/300/150/"
                             alt="Url Not Yet Recognizable"/>
                    </span>
                }

                {
                    this.props.editing &&
                    <div>
                        <input
                            onChange={(e) => this.setState({
                                widget_changing: {
                                    ...this.state.widget_changing,
                                    text: e.target.value
                                }
                            })}

                            value={this.state.widget_changing.text}/>

                        <br/>
                        <div>
                            <h5>Widget Title</h5>
                            <input
                                onChange={(e) => this.setState({
                                    widget_changing: {
                                        ...this.state.widget_changing,
                                        title: e.target.value
                                    }
                                })}

                                value={this.state.widget_changing.title}/>
                        </div>



                            <button onClick={() =>
                            {
                                this.props.saveWidget(this.state.widget_changing);
                                this.setState({
                                    widget: this.state.widget_changing
                                })
                            }}>
                                Save
                            </button>



                        <div>
                            <div>
                                <b>Preview</b>
                            </div>

                            <div>
                                <span>
                                    <img className="widget_picture"
                                         src={this.state.widget_changing.text}
                                         alt="Url Not Yet Recognizable"/>
                                </span>
                            </div>
                        </div>

                    </div>


                }

            </div>

        )
    }


}