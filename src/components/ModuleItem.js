
import {connect} from 'react-redux'
import {COURSES_MODULES_API_URL, MODULES_API_URL} from "../common/constants";
import {updateModule, deleteModule} from "../actions/moduleActions";
import moduleService from "../services/ModuleService"
import React, {Component} from 'react';

class ModuleItem extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {

        module_original: this.props.module,
        module_changing: this.props.module,
        editing: this.props.editing
    }
    render() {
        if (!this.props.editing)
            this.state.module_changing = this.state.module_original
        return (
            <li
                onClick  = {this.props.select}
                className={`list-group-item ${this.props.active ? 'active':''}`}>

                {!this.props.editing &&
                <span>
                    {this.state.module_changing.title}
                </span>}

                {
                    this.props.editing &&
                    <input
                        onChange={(e) => this.setState({
                            module_changing: {
                                ...this.state.module_changing,
                                title: e.target.value
                            }
                        })}
                        value={this.state.module_changing.title}/>
                }

                {this.props.editing && //DELETE BUTTON DELETE BUTTON BEGIN
                <span>

            <button type="button"
                    className="wbdv-module-item-delete-btn float-right"
                    onClick={() =>
                        //moduleService.deleteModule(module._id)} WHY THIS NEEDS REFRESH???
                        //my question: how does this render on the spot while somehow filling param deleteModule???
                        this.props.deleteModule(this.props.module._id)}>

                <i className="fas fa-window-close">
                </i>
            </button>


            <button type="button"
                    className="wbdv-module-item-edit-btn float-right"
                    onClick={() => {
                        this.props.updateModule(this.props.module._id, this.state.module_changing);
                        this.setState({
                            module_original: this.state.module_changing
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

            </li>
        );
    }
}

const stateToPropertyMapper = (state) => ({})//WHY THIS EMPTY COMP TO mod-list state to prop fun

const dispatchToPropertyMapper = (dispatch) => {
    return {
        //commonly one would move the objects being dispatched to an actions folder
        deleteModule: (moduleId) => {
            moduleService.deleteModule(moduleId)
                .then(status =>
                    dispatch(deleteModule(moduleId)))
        },
        updateModule: (moduleId, module) => {
            moduleService.updateModule(moduleId, module)
                .then(status => dispatch(updateModule(moduleId, module)))
        }
    }
}

export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(ModuleItem)

//const ModuleListItem = ({edit, select, save, editing, active, module, deleteModule}) =>

    // state = {
    //     active: false, //when title clicked, select this, highlight it
    //     highlighted: false, //true when clicked or editing
    //     editing: false, //if true render input field in place
    //     visible_edit: true, //pencil icon
    //     visible_delete: false, //x icon
    //     visible_confirm_changes: true, //check-mark icon
    //     module_title: this.props.module
    //
    // }
    // <li
    //     onClick = {select}
    //     className={`list-group-item ${active ? 'active':''}`}>
    //
    //     {module.title}
    //     {editing &&
    //     <span>
    //
    //         <button type="button"
    //                 className="wbdv-module-item-delete-btn float-right"
    //                 onClick={() =>
    //                 //moduleService.deleteModule(module._id)} WHY THIS NEEDS REFRESH???
    //                 //my question: how does this render on the spot while somehow filling param deleteModule???
    //                 deleteModule(module._id)}>
    //
    //             <i className="fas fa-window-close">
    //             </i>
    //         </button>
    //         <button type="button"
    //                 className="wbdv-module-item-edit-btn float-right"
    //                 onClick={() =>
    //                     save}>
    //             <i className="fas fa-check"></i>
    //         </button>
    //
    //     </span>}
    //
    //     {!editing &&
    //     <button onClick={edit}>
    //         <i className="fas fa-pencil-alt"></i>
    //     </button>}
    //
    // </li>



// const stateToPropertyMapper = (state) => ({})
//
// const dispatchToPropertyMapper = (dispatch) => {
//     return {
//         //commonly one would move the objects being dispatched to an actions folder
//         deleteModule: (moduleId) => {
//             moduleService.deleteModule(moduleId)
//                 .then(status =>
//             dispatch(deleteModule(moduleId)))
//         }
//     }
// }

// ({
//     deleteModule: (moduleId) => {
//         fetch(`${MODULES_API_URL}/${moduleId}`, {
//             method: 'DELETE'
//         }).then(response => response.json())
//             .then(status => dispatch({
//                 type: 'DELETE_MODULE',
//                 moduleId: moduleId
//             }))
//     }
// })

//export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(ModuleListItem)

// const ModuleItem = ({module, deleteModule}) => {//stateless react component
//     // constructor(props){
//     //     super(props)
//     // }
//     //
//     return(                 // {deleteModule(module.id)}>Delete</button>
//                             //would be called right away, use closure!1! () =>
//         <li className="list-group-item">
//             {module.title}
//             <button onClick={() => deleteModule(module.id)}>Delete</button>
//         </li>
//     )
// }
//
// export default ModuleItem
