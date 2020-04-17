// export const FIND_MODULES_FOR_COURSE = "FIND_MODULES_FOR_COURSE"
// export const findModulesForCourse = (modules) => ({
//     modules: modules,
//     type: FIND_MODULES_FOR_COURSE
// })
//
 export const CREATE_MODULE = "CREATE_MODULE"
export const createModule = (newModule) => ({
    type: CREATE_MODULE, //type is required
    newModule: newModule //these other attributes mean something to us, are sent as well

})
/// ^^^ ^^^ the createModule below is changed to one above for dynamic purposes ^^^ ^^^
// export const createModule = () => ({
//     type: CREATE_MODULE, //type is required
//     newModule: { //these other attributes mean something to us, are sent as well
//         title: "New Module",
//         _id: (new Date()).getTime()+""
//     }
// })

// export const createModule = (module) => ({
//     type: CREATE_MODULE,
//     module: module
// })
export const DELETE_MODULE = "DELETE_MODULE"
export const deleteModule = (moduleId) => ({
    type: DELETE_MODULE,
    moduleId: moduleId
})

export const SHOW_COURSE_MODULES = "SHOW_COURSE_MODULES"
export const findAllModules = (modules) => ({
    type: SHOW_COURSE_MODULES,
    modules: modules
})

export const UPDATE_MODULE = "UPDATE_MODULE"
export const updateModule = (moduleId, module) => ({
    type: UPDATE_MODULE,
    moduleId: moduleId,
    module: module
})

