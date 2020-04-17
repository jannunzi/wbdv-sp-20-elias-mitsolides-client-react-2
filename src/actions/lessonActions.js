export const CREATE_LESSON = "CREATE_LESSON"
export const createLesson = (newLesson) => ({
    type: CREATE_LESSON,
    newLesson: newLesson
})

export const DELETE_LESSON = "DELETE_LESSON"
export const deleteLesson = (lessonId) => ({
    type: DELETE_LESSON,
    lessonId: lessonId
})

export const SHOW_MODULE_LESSONS = "SHOW_MODULE_LESSON"
export const findAllLessons = (lessons) => ({
    type: SHOW_MODULE_LESSONS,
    lessons: lessons
})

export const UPDATE_LESSON = "UPDATE_LESSON"
export const updateLesson = (lessonId, lesson) => ({
    type: UPDATE_LESSON,
    lessonId: lessonId,
    lesson: lesson
})