import React from "react";

class ListWidget extends React.Component {

state = {
    editing: this.props.editing,
    widget: this.props.widget,
    widget_changing: this.props.widget,

}

componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.editing !== this.props.editing) {
        this.setState({
            editing: this.props.editing

        })
    }
}

    lines;
    newLines;
render(){                   //{widget.title}
    if (!this.props.editing) {
        this.state.widget_changing = this.state.widget;

        this.lines = this.state.widget.text.split('\n');
    }
    else {
        this.lines = this.state.widget_changing.text.split('\n');
    }


    return(
        <div className="container border border-secondary">

            {
                !this.props.editing && this.state.widget.listType === "UNORDERED" &&
                    //this.props.
                    <ul>
                        {this.lines.map(eachLine =>
                            <li value = {eachLine}>
                                {eachLine}
                            </li>
                        )} {/*curlies lit it up*/}
                    </ul>
            }

            {
                !this.props.editing && this.state.widget.listType === "ORDERED" &&
                //this.props.
                    <ol>
                        {this.lines.map(eachLine =>
                            <li value = {eachLine}>
                                {eachLine}
                            </li>
                        )} {/*curlies lit it up*/}
                    </ol>
            }

            {
                this.props.editing &&
                <div>
                        <div>
                            <h5>List Widget</h5>
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

                            <select
                                onChange={(e) => this.setState( {
                                    widget_changing: {
                                        ...this.state.widget_changing,
                                        listType: e.target.value
                                    }
                                })}
                                value={this.state.widget_changing.listType}>
                                    <option value="UNORDERED">Unordered List</option>
                                    <option value="ORDERED">Ordered List</option>
                            </select>

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

                        </div>



                    <div>
                        <div>
                            <b>Preview</b>
                        </div>

                        <div>
                            {
                            this.state.widget_changing.listType === "UNORDERED" &&
                            <ul>
                                {this.lines.map(eachLine =>
                                    <li value = {eachLine}>
                                        {eachLine}
                                    </li>
                                )}
                            </ul>
                            }

                            {
                                this.state.widget_changing.listType === "ORDERED" &&
                                <ol>
                                    {this.lines.map(eachLine =>
                                        <li value = {eachLine}>
                                            {eachLine}
                                        </li>
                                    )}
                                </ol>
                            }
                        </div>
                    </div>

                </div>


            }

        </div>

    )
}
}

export default ListWidget