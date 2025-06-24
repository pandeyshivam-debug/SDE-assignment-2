// const API_BASE_URL = "http://localhost:3000/api"

// export const searchUser = async (email, name) => {
//   const res = await axios.get(`${API_BASE_URL}/search`, {
//     params: { ...(email && { email }), ...(name && { name }) },
//   })
//   return res.data
// }


import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.8/+esm'

const API_BASE_URL = "http://localhost:3000/api"

/**
 * Searches for a user by email or name.
 * At least one of them must be provided.
 */
export const searchUser = async (email, name) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: { email, name }
        })
        return response.data
    } catch (err) {
        // Let the calling code handle the error
        throw err
    }
}
