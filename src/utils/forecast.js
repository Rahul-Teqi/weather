const request = require('request')

const forecast = (Lat,Lon,callback) =>{

    const url = "http://api.weatherstack.com/current?access_key=622b9adb4abbe5bbb474b270c4573d4f&query="+Lat+","+Lon+""

    setTimeout(()=>{

        request({url,json:true},(error,{body}={})=>{
 
            if(error){
                callback("Unable to connect weather service!",undefined)
            }else if(body.error){``
                callback("Unable to find location",undefined)
            }else{
                callback(
                    undefined,{
                    forecase:body.current.weather_descriptions[0],
                    temperature:body.current.temperature,
                    feelslike:body.current.feelslike }
                    )
            }
        })

    },2000)
}


module.exports = forecast