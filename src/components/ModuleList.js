import React from "react";
import ModuleItem from "./ModuleItem";
import {connect} from "react-redux";
import {createModule, findAllModules} from "../actions/moduleActions";
import moduleService from "../services/ModuleService";


//want components to be as self contained as possible
//...shouldn't propagate its own state, if any, out of its boundaries
class ModuleList extends React.Component {

    componentDidMount() {//lets us handle, among other things, events this is loaded with
        this.props.findModulesForCourse(this.props.courseId)//HOW WAS THIS FOUND THROUGH PROPS
    }

    state = {
        activeModuleId: this.props.moduleId,
        activeModule: '', //is never used
        editingModuleId: '',

    }

    render() {
        return(
    <ul className="list-group">
        {/*modules and is a truthy to ensure that it, an array/some state prop used, worked*/}
        {/*and that if its not true for whatever reason, the whole thing doesnt kaboom*/}
        {/*this components "modules" parameter will be from the global fsm, not its parent component*/}
        {/*must connect the store, which has fsm which has modules list, map it into this modules property*/}
        {/*some map function can help, which grabs modules which grabs from global state, redux helps*/}

        {this.props.modules &&
        this.props.modules.map(module =>

            <ModuleItem
                key={module._id}
                edit = {() => {
                    console.log('editeditedit')
                    const moduleId = module._id
                    this.props.history.push(`/course/${this.props.courseId}/module/${moduleId}`)
                    this.setState({   //more like push.setState
                        editingModuleId: module._id,
                        activeModuleId: module._id
                    })
                    //this.state.editingModuleId = module._id ... dont uncomment or else world explodes
                }}
                select = {() => {
                    console.log('SELECT 1 SELECT 1 SELECT 1 SELECT 1')
                    const moduleId = module._id
                    this.props.history.push(`/course/${this.props.courseId}/module/${moduleId}`)

                    this.setState({   //more like push.setState
                        activeModuleId: module._id,//this is state.activeModuleId from??
                    })
                    // "old if ()" You know 41 run but not if 42/43 run
                    this.setState(
                        prevState => ((prevState.editingModuleId != module._id) ?
                            {editingModuleId: ''} : {})
                    )
                }}
                save = {() => {
                    this.props.history.push(`/course/${this.props.courseId}`)
                    console.log('savesavesave')
                    this.setState({
                        editingModuleId: '',
                        activeModuleId: ''
                    })
                }}
                editing={module._id === this.state.editingModuleId}
                active={module._id === this.state.activeModuleId}
                module={module}/>)

        }
        <li className="list-group-item wbdv-module-item">
            {/*here we wanna work to the reducer, add a new module to that states module list*/}
            {/*upon adding the onclick, add createModule as a param (an event handler) to this reducer*/}
            {/*like with stateToPropMapper but reverse, wanna create a map from component to reducer, notify change*/}
            {/*wanna create a map from component to reducer, calculate next state, make new mapper below*/}
            <button type="button"
                    className="wbdv-module-item-add-btn"
                    onClick={() => this.props.createModule(this.props.courseId)}>
                <i className="fa fa-plus">
                </i>
            </button>
        </li>
    </ul>

)

}
}

//this returned module list is connected to the comps modules parameter by connect()
const stateToPropertyMapper = (state) => {
    return {
        modules: state.moduleReducer.modules
    }
}

//this returned createModule fun is connected to the comps createModule parameter by connect()
//notify reducer of a new module, reducer makes a new state w/ that module, then send back new state
//these are called dispatchers, where such callbacks are handled
//conclusion the createModule para in this component is mapped to this fun's createModule
//connect() does that mapping
//!!!! \/ \/ \/ \/ \/ !!!!
//when onclick, createModule does a dispatch(), goes to courseEditor,
//...up to that <Provider> store, then into moduleReducer through the const "store"
// which causes moduleReducer to run again with the action parameter filled which our act here
const dispatchToPropertyMapper = (dispatch) => {
    return {
        findModulesForCourse: (courseId) =>
            moduleService.findModulesForCourse(courseId).then(actualModules =>
                dispatch(findAllModules(actualModules))),
        //this createModule must match the parameter/import name
        //for server purposes, send new thing to server, then pass module to dispatcher
        createModule: (courseId) => {
            moduleService.createModule(courseId, {
                title: "New Module",
            }).then(actualModule =>
            dispatch(createModule(actualModule))) //this here takes the process of making a new module object from the actions folder, practice
        }
    }
}
//for dynamic displays, nice to go to server, store some part of the server,
// come back and pass that returned block as an argument


        //connect is a function of redux, used to map a whole state's module list into this parameter
        //pass mapper as argument, pass that mappers return onto main fun here
        //second arg here, dispatch will map properties to a function sending things to reducer
export default connect(stateToPropertyMapper, dispatchToPropertyMapper)(ModuleList)