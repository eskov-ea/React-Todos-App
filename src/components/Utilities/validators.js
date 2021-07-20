
const required = value => (!value ? 'Field is required' : undefined)
const isCorrectEmail = value => {
    if (!value) {
        return 'Field is required'
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(value).toLowerCase())) {
        return 'You entered wrong e-mail'
    }
    return undefined
}
const isCorrectPassword = value => {
    if (!value) {
        return 'Field is required'
    }
    if (value.length < 8) {
        return `Password should contain 8 symbols`
    }
    return undefined
}



