import React from 'react'

export const Message = ({ message }) => {
    if (message === null || message === '') {
        return null
    }

    return (
        <div className="message">
            {message}
        </div>
    )
}

export const Error = ({ error }) => {
    if (error === null || error === '') {
        return null
    }

    return (
        <div className="error">
            {error}
        </div>
    )
}

