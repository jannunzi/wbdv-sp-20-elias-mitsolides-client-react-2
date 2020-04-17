export const CREATE_TOPIC = "CREATE_TOPIC"
export const createTopic = (newTopic) => ({
    type: CREATE_TOPIC, //type is required
    newTopic: newTopic //these other attributes mean something to us, are sent as well
})

export const DELETE_TOPIC = "DELETE_TOPIC"
export const deleteTopic = (topicId) => ({
    type: DELETE_TOPIC,
    topicId: topicId
})

export const SHOW_LESSON_TOPICS = "SHOW_LESSON_TOPICS"
export const findAllTopics = (topics) => ({
    type: SHOW_LESSON_TOPICS,
    topics: topics
})

export const UPDATE_TOPIC = "UPDATE_TOPIC"
export const updateTopic = (topicId, topic) => ({
    type: UPDATE_TOPIC,
    topicId: topicId,
    topic: topic
})

