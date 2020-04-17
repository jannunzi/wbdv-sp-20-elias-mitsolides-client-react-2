import {API_URL} from "../common/constants";

//in last assignment, these were encapped in a class, and accessed through
//an instance variable
//here, file itself is an encapsulation
//note functions not declared in top level name space
//in es6, only importing and exporting lets you access actual variables/functions


// function AdminUsercourseserviceClient() {
//     this.updateCourse = updateCourse;
//     this.deleteCourse = deleteCourse;
//     this.createCourse = createCourse;        why not need this?
//     this.findAllCourses = findAllCourses;
//     this.url = API_URL;
//     var self = this;

//export const
export const updateCourse = async (courseId, course) => {
        const response = await fetch(`${API_URL}/${courseId}`, {
            method: 'PUT',
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json'
            }
        })
        return await response.json()
    }

export const deleteCourse = async (courseId) => {
        const response = await fetch(`${API_URL}/${courseId}`, {
            method: 'DELETE'
        })
        return await response.json()
    }
                //tag function as async to improve readability
export const createCourse = async (course) =>
                        //await makes it work the way async actually does
    {                       //fetch goes, blocks, waits, then passes into response
        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(course),
            headers: {
                'content-type': 'application/json'
            }
        })
        return await response.json()//we're not waiting on this, we will be poked at
    }

export const findAllCourses = () => {
        return fetch(API_URL)
            .then(response => response.json())
    }

export const findCourseById = (courseId) => {
        return fetch(`${API_URL}/${courseId}`)
            .then(response => response.json())

}


