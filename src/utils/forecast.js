const request = require('request')


forecast = (cityName, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=d908aea91816647d2d19adbbad3d6b7d&query='+encodeURIComponent(cityName);

    request({url: url, json: true}, (error,response)=>{
    if(response){
        callback(undefined,response.body.current)
    }else{
        callback('Couldnt find the location. Try again', undefined)
    }
  
    })
}
module.exports ={
    forecast: forecast
}
