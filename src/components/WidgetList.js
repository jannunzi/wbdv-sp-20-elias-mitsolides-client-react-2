import React from "react";
import {connect} from "react-redux";
import HeadingWidget from "./HeadingWidget";
import ParagraphWidget from "./ParagraphWidget";
import widgetService from "../services/WidgetService";
import ListWidget from "./ListWidget"
import {createWidget, deleteWidget, findAllWidgetsForTopic, updateWidget
, findAllWidgets} from "../actions/widgetActions";
import ImageWidget from "./ImageWidget";

class WidgetList extends React.Component {
    state = {
        editingWidgetId: '',
        widget: {
            id: ''
        },
        changing_widget: {
          id: ''
        },
        renderable: true
    }
    componentDidMount() {
        if(this.props.topicId){
            console.log("WidgetList, ComponentDidMount", this.props.topicId)
            this.props.findWidgetsForTopic(this.props.topicId);
            this.setState(prevState => ((prevState.renderable) ?
                {renderable: true} : {renderable: true})
            )

        }
        else {
            this.setState(prevState => ((prevState.renderable) ?
                {renderable: false} : {renderable: false})
            )
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(((prevProps.topicId !== this.props.topicId) || (prevProps.widgets.length !== this.props.widgets.length)) && (this.props.topicId))  {
            console.log("WidgetList, ComponentDidUpdate", this.props.topicId)
            this.props.findWidgetsForTopic(this.props.topicId);
        }
    }

    saveWidget = (widget) => {
        this.setState({
            editingWidgetId: ''
        })
        this.props.updateWidget(widget.id, widget)
    }

    render(){
        console.log(this.props.widgets);
        return(
            <div>
                <h1>Widget List</h1>
                <br/>
                <br/>

                {

                    (this.props.widgets && this.props.widgets.length > 0 && this.props.topicId) &&
                    this.props.widgets.map(widget =>
                        <div key={widget.id}>
                            {
                                widget.type === "HEADING" &&
                                    <HeadingWidget
                                        key={widget.id}
                                        saveWidget = {this.saveWidget}
                                        editing={this.state.editingWidgetId === widget.id}
                                        widget = {widget}
                                        {...this.props}/>
                            }
                            {
                                widget.type === "PARAGRAPH" &&
                                    <ParagraphWidget
                                        key={widget.id}
                                        saveWidget = {this.saveWidget}
                                        editing={this.state.editingWidgetId === widget.id}
                                        widget = {widget}/>
                            }
                            {
                                widget.type === "LIST" &&
                                <ListWidget
                                    key={widget.id}
                                    saveWidget = {this.saveWidget}
                                    editing={this.state.editingWidgetId === widget.id}
                                    widget = {widget}/>
                            }

                            {
                                widget.type === "IMAGE" &&
                                <ImageWidget
                                    key={widget.id}
                                    saveWidget = {this.saveWidget}
                                    editing={this.state.editingWidgetId === widget.id}
                                    widget = {widget}/>
                            }
                            <span>
                                { this.state.editingWidgetId !== widget.id &&
                                <button onClick={
                                    () => this.setState(
                                        {
                                        editingWidgetId: widget.id,
                                        widget: widget
                                    })}
                                >
                                    Edit
                                </button>
                                }
                                {this.state.editingWidgetId === widget.id &&
                                    <span>
                                        <button onClick={() => {
                                            this.props.deleteWidget(widget.id)
                                        }}>
                                            Delete
                                        </button>

                                        <button>Up</button>
                                        <button>Down</button>

                                        <select onChange={(e) => {
                                                    const newType = e.target.value;
                                                    let newText = '';
                                                    switch( newType ) {
                                                        case "HEADING":
                                                            newText = "Heading text";
                                                            break;

                                                        case "PARAGRAPH":
                                                            newText = "Paragraph text";
                                                            break;

                                                        case "LIST":
                                                            newText = "Enter one list item per line";
                                                            break;

                                                        case "IMAGE":
                                                            newText = "Image URL";
                                                            break;

                                                        default:
                                                            newText = "Should not reach";
                                                    }

                                                    this.setState(prevState => {
                                                        this.state.widget.type = newType;
                                                        this.state.widget.text = newText;
                                                        return {
                                                            widget: {
                                                                ...widget, type: newType, text: newText
                                                            }
                                                        }});
                                                    this.props.updateWidget(this.state.widget.id, this.state.widget)
                                                    }}
                                            value={this.state.widget.type}
                                        >

                                            <option value="HEADING">Heading</option>
                                            <option value="PARAGRAPH">Paragraph</option>
                                            <option value="LIST">List</option>
                                            <option value="IMAGE">Image</option>
                                            <option value="YOUTUBE">YouTube</option>
                                            <option value="HTML">HTML</option>

                                        </select>
                            </span>
                            }
                            </span>
                        <br/>
                        <br/>
                        </div>
                    )
                }
                {
                (this.props.topicId) &&
                <button onClick={() =>
                    this.props.createWidget(this.props.topicId)}>
                    +
                </button>
                }


            </div>
        )
    }
}

const stateToPropertyMapper = (state) => ({
    widgets: state.widgetReducer.widgets
})

const dispatchToPropertyMapper = (dispatcher) => ({
    findWidgetsForTopic: (topicId) =>
        widgetService.findWidgetsForTopic(topicId).then(widgets =>
            dispatcher(findAllWidgetsForTopic(widgets))),

    updateWidget: (widgetId, newWidget) =>
        widgetService.updateWidget(widgetId, newWidget)
            .then(status => dispatcher(
                updateWidget(widgetId, newWidget)
            )),

    deleteWidget: (widgetId) =>
        widgetService.deleteWidget(widgetId)
            .then(status =>
                dispatcher(deleteWidget(widgetId))),

    findAllWidgets: () =>
        widgetService.findAllWidgets().then(actualWidgets =>
            dispatcher(findAllWidgets(actualWidgets))),

    createWidget: (topicId) =>
        widgetService.createWidget(topicId, {
            title: "New Widget",
            type: "HEADING",
            size: 2,
        })
            .then(actualWidget =>
            dispatcher(createWidget(actualWidget)))
})

export default connect
(stateToPropertyMapper, dispatchToPropertyMapper)
(WidgetList)




//STATIC HTML WIDGET LIST VERSION BELOW, OLD, DO NOT REFER

//return (
//             <div>
//             <div className="row mb-4 mt-4">
//                 <div className="container">
//                     <button type="button"
//                             className="btn wbdv-widget-on-off">
//                         <i className="fas fa-toggle-off"></i>
//                     </button>
//                     <span className="wbdv-preview-text">Preview</span>
//                     <button type="button"
//                             className="btn btn-success wbdv-widget-save float-right">
//                         Save
//                     </button>
//                 </div>
//             </div>
//             <div className="wbdv-widget-box-border">
//             <div className="container border border-secondary">
//                 <div className="row wbdv-widget-box">
//                     <nav className="navbar navbar-expand-xs navbar-light bg-light container">
//
//                             <span className="font-weight-bold wbdv-heading-widget-title">
//                                 Heading widget
//                             </span>
//
//                         <form className="form-inline">
//                             <button
//                                 className="btn wbdv-widget-reorder-up"
//                                 type="button">
//                                 <i className="fas fa-arrow-up"></i>
//                             </button>
//
//                             <button
//                                 className="btn wbdv-widget-reorder-down"
//                                 type="button">
//                                 <i className="fas fa-arrow-down"></i>
//                             </button>
//
//                             <button
//                                 className="btn btn-sm dropdown-toggle"
//                                 type="button"
//                                 data-toggle="dropdown"
//                                 aria-haspopup="true"
//                                 aria-expanded="false"
//                             >
//                                 Heading
//                             </button>
//                             <div className="dropdown-menu">
//                                 <a className="dropdown-item" href="#">Some Heading Type</a>
//                                 <a className="dropdown-item" href="#">Another Type</a>
//                                 <a className="dropdown-item" href="#">One More!</a>
//                             </div>
//
//                             <button
//                                 className="btn wbdv-widget-reorder-close"
//                                 type="button">
//                                 <i className="fas fa-window-close"></i>
//                             </button>
//
//                         </form>
//
//                     </nav>
//
//                 </div>
//
//                 <div className="row container-fluid wbdv-widget-boxes">
//                     <div className="card container">
//                         <div className="card-body">
//                             Heading Text
//                         </div>
//                     </div>
//                 </div>
//
//                 <div className="row container-fluid wbdv-widget-boxes">
//                     <button
//                         className="btn dropdown-toggle border container-fluid"
//                         type="button"
//                         data-toggle="dropdown"
//                         aria-haspopup="true"
//                         aria-expanded="false"
//                     >
//                         Heading
//                     </button>
//                     <div className="dropdown-menu">
//                         <a className="dropdown-item" href="#">Some Heading Type</a>
//                         <a className="dropdown-item" href="#">Another Type</a>
//                         <a className="dropdown-item" href="#">One More!</a>
//                     </div>
//                 </div>
//
//                 <div className="row container-fluid wbdv-widget-boxes">
//                     <div className="card container">
//                         <div className="card-body">
//                             Widget Name
//                         </div>
//                     </div>
//                 </div>
//
//                 <div className="row wbdv-widget-boxes wbdv-widget-boxes-preview">
//                     <h4 className>Preview</h4>
//                 </div>
//
//                 <div className="row wbdv-widget-boxes row">
//                     <h2 className="wbdv-widget-boxes-Heading-Text">Heading Text</h2>
//                 </div>
//             </div>
//
//         </div>
//         </div>
//         )



//createWidget: (topicId) =>
//         widgetService.createWidget(topicId).then(actualWidget =>
//             dispatcher(createWidget(actualWidget)))