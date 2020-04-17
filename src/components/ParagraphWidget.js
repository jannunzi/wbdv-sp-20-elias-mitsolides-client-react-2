import React from "react";

export default class ParagraphWidget extends React.Component {

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
                        {this.state.widget_changing.text}
                    </span>
                }

                {
                    this.props.editing &&
                        <div>
                            <div>
                                <h5>Paragraph Widget</h5>
                                <textarea
                                    onChange={(e) => this.setState({
                                    widget_changing: {
                                        ...this.state.widget_changing,
                                        text: e.target.value
                                    }
                                })}

                                    value={this.state.widget_changing.text}
                                >
                                    {this.state.widget_changing.text}
                                </textarea>
                            </div>

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
                                {this.state.widget_changing.text}
                            </div>
                        </div>

                        </div>


                }

            </div>

        )
    }
}
