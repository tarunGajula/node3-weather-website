

const geocode = (adrs, callback) => {
    const url ='https://abc.com'
    
    const error = undefined
    const address = adrs
    if(error){
        callback('Couldnt find the location. Try again', undefined)
    }else{
        callback(undefined,address)
    }
}

module.exports = {
    geocode: geocode
}