/**
 * 1. get form, input and results-container
 * 2. listen for form submission
 * - get email, clear previous content
 * use axios, send email in query, get result 
 */

import { searchUser } from "./api.js"

const form = document.getElementById('search-form')
const emailInput = document.getElementById('search-input-email')
const nameInput = document.getElementById('search-input-name')
const button = document.getElementById('search-button')
const resultsContainer = document.getElementById('results-container') 

const API_BASE_URL = "http://localhost:3000/api"

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = emailInput.value.trim()
    const name = nameInput.value.trim()

    if (!email && !name) {
        displayError("Please enter either an email or a name.")
        return
    }

    resultsContainer.innerHTML = `
    <div class="loading-container">
        <div class="spinner"></div>
        <p>Searching...</p>
    </div>
    `
    button.disabled = true

    try {
        const user = await searchUser(email, name)
        // const res = await axios.get(`${API_BASE_URL}/search`, {
        //     params: { email, name }
        // })
        await delay(1500)
        // displayBustedResult(res.data)
        displayBustedResult(user)
    } catch(err) {
        // await delay(1000)
        // if(err.response && err.response.status === 404)
        //     displaySafeResult(err.response.data.message)
        // else if(err.response && err.response.status === 400)
        //     displayError(err.response.data.error)
        // else
        //     displayError("Could not connect to the server, please try again")
        await delay(1000)
        console.error("Caught error:", err)

        const status = err?.response?.status
        const message = err?.response?.data?.message
        const errorText = err?.response?.data?.error

        if (status === 404) {
            displaySafeResult(message || "User not found")
        } else if (status === 400) {
            displayError(errorText || "Invalid input")
        } else {
            displayError("Could not connect to the server, please try again")
        }
    } finally {
        button.disabled = false
    }
})

const displayBustedResult = (user) => {
    // console.log("Found user:", user);

    resultsContainer.innerHTML = `
        <div class = "card">
            <img src = "${user.picture}" alt = "User picture">
            <h3>Busted!<h3>
            <p><strong>${user.firstName} ${user.lastName}</strong> (${user.age}) was found in our database.</p>
            <p>They live in ${user.city}</p>
        </div>
    `
}

const displaySafeResult = (message) => {
    resultsContainer.innerHTML = `<p class = "safe">${message}</p>`
}

const displayError = (message) => {
    resultsContainer.innerHTML = `<p class = "error">${message}</p>`
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
