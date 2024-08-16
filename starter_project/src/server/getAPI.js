const meaningCloud = "https://api.meaningcloud.com/sentiment-2.1"
const axios = require("axios")


const getData = async (url, key) => {
    try {
        const response = await axios.get(`${meaningCloud}?key=${key}&url=${url}&lang=en`);
        const { code } = response.data.status;
        
        if (code == 100) {
            return handleError(code, "Please enter a valid URL");
        } else if (code == 212) {
            return handleError(code, response.data.status.msg);
        }
        return successResponse(response.data, code);
    } catch (error) {
        console.error('Error in getData:', error);
        return { error: 'An error occurred while fetching data' };
    }
};

const handleError = (code, msg) => {
    const error = {
        code: code,
        msg: msg
    }
    return error
}

const successResponse = (data, code) =>{
    const { score_tag, agreement, subjectivity, confidence, irony } = data
            let sample = {
                score_tag: score_tag,
                agreement: agreement,
                subjectivity: subjectivity,
                confidence: confidence,
                irony: irony
            }
            result = { sample, code: code }
            return result
}

module.exports = {
    getData
}