import React from "react";

class HeadingWidget extends React.Component {
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

    render () {
        if (!this.props.editing)
            this.state.widget_changing = this.state.widget;
        return(
            <div className="container border border-secondary">
                {
                    !this.state.editing &&
                    <div>
                        {this.state.widget_changing.size === 1 && <h1>{this.state.widget_changing.text}</h1>}
                        {this.state.widget_changing.size === 2 && <h2>{this.state.widget_changing.text}</h2>}
                        {this.state.widget_changing.size === 3 && <h3>{this.state.widget_changing.text}</h3>}
                        {this.state.widget_changing.size === 4 && <h4>{this.state.widget_changing.text}</h4>}
                        {this.state.widget_changing.size === 5 && <h5>{this.state.widget_changing.text}</h5>}
                        {this.state.widget_changing.size === 6 && <h6>{this.state.widget_changing.text}</h6>}
                    </div>
                }
                {
                    this.state.editing &&
                    <div>
                        <div>
                            <h5>Heading Widget</h5>
                            <input
                                onChange={(e) => this.setState({
                                    widget_changing: {
                                        ...this.state.widget_changing,
                                        text: e.target.value
                                    }
                                })}

                                value={this.state.widget_changing.text}/>
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

                        <span className="float-right">
                                <select
                                    onChange={(e) => this.setState( {
                                        widget_changing: {
                                            ...this.state.widget_changing,
                                            size: parseInt(e.target.value)
                                        }
                                    })}
                                    value={this.state.widget_changing.size}>
                                    <option value={1}>Heading 1</option>
                                    <option value={2}>Heading 2</option>
                                    <option value={3}>Heading 3</option>
                                    <option value={4}>Heading 4</option>
                                    <option value={5}>Heading 5</option>
                                    <option value={6}>Heading 6</option>
                                </select>

                                <button onClick={ () =>
                                    {
                                        this.props.saveWidget(this.state.widget_changing);
                                        this.setState({
                                            widget: this.state.widget_changing
                                        })
                                    }}>
                                    Save
                                </button>

                                {/*<select onChange={(e) => {
                                    const newType = e.target.value;
                                    this.setState(prevState => {
                                        this.state.widget.type = newType;
                                        return {
                                            widget: {
                                                ...widget, type: newType
                                            }
                                        }});
                                    this.props.updateWidget(this.state.widget.id, this.state.widget)
                                    }}
                                    value={this.state.widget.type}>

                                    <option value="HEADING">Heading</option>
                                    <option value="PARAGRAPH">Paragraph</option>
                                    <option value="YOUTUBE">YouTube</option>
                                    <option value="HTML">HTML</option>

                                </select>*/}

                            </span>

                            <div>
                                <div>
                                    <b>Preview</b>
                                </div>

                                <div>
                                    {this.state.widget_changing.size === 1 && <h1>{this.state.widget_changing.text}</h1>}
                                    {this.state.widget_changing.size === 2 && <h2>{this.state.widget_changing.text}</h2>}
                                    {this.state.widget_changing.size === 3 && <h3>{this.state.widget_changing.text}</h3>}
                                    {this.state.widget_changing.size === 4 && <h4>{this.state.widget_changing.text}</h4>}
                                    {this.state.widget_changing.size === 5 && <h5>{this.state.widget_changing.text}</h5>}
                                    {this.state.widget_changing.size === 6 && <h6>{this.state.widget_changing.text}</h6>}
                                </div>
                            </div>




                    </div>
                }

            </div>
        )
    }
}

export default HeadingWidget