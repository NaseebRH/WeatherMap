let citiesData = '';
$('#btn').click(function(h){
    console.log(h)
    event.preventDefault(h);
    function weather(){
        let name = $('#input').val();
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&APPID=64c9384c61a11bef86287320dd197f1f`;
        $.getJSON(url, function(data){
            console.log(data);
            changeD(data);
       
        });
    }
    weather();
    function changeD(data){
      let cityImage = getCityImg(data.name); 
        let city = data.name;
        let country = data.sys.country;
        let temp = Math.round(data.main.temp)
        let desc = data.weather[0].description;
        let icon = data.weather[0].icon;
        let windSpeed = Math.round(data.wind.speed);
        let iconSrc = `image/${icon}.png`;
        let max = data.main.temp_max;
        let min = data.main.temp_min;        ;
        let id = data.weather[0].id;
        let weatherImg = selectImg(id);
          console.log(weatherImg);
        $('#country').html(country);
        $('#city').html(city);
        $('#temp').html(`${temp} °C` );
        $('#desc').html(desc);
        $('#icon').attr('src',iconSrc);
        $('#wind').html(`wind speed : ${windSpeed} k/m`);
        //$('body').css('background-image','url(' + weatherImg + ')');
        $('body').css('background-image', 'url(' + cityImage + ')');
        $('#max').html(`Max :${max} °C`);
        $('#min').html(`Min : ${min} °C`);

    }

    function selectImg(id){
      let img = {
        rain : "https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        sunny : "https://images.pexels.com/photos/3590/nature-sky-sunny-clouds.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        snow : "https://images.pexels.com/photos/66284/winter-nature-season-trees-66284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        cloud :"https://images.pexels.com/photos/601798/pexels-photo-601798.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        mist :"https://images.pexels.com/photos/5230/road-fog-foggy-mist.jpg?auto=compress&cs=tinysrgb&h=650&w=940",
        drizzle :"https://images.pexels.com/photos/125510/pexels-photo-125510.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        thunder : "https://images.pexels.com/photos/1446076/pexels-photo-1446076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      };
      if (id >= 200 && id < 300){
        return img.thunder;
      }else if (id >= 801 && id < 900) {
      return img.cloud;
      }else if (id >= 300 && id < 500){
        return img.drizzle;
      }else if (id >= 500 && id < 600) {
        return img.rain;
      }else if (id >= 600 && id < 700) {
        return img.snow;
      }else if (id = 800 ){
        return img.sunny;
      }else if (id >= 700 && id < 800){
        return img.mist;
      }
    }
 

});

(async function getCities(){
  let urlCity = `https://api.teleport.org/api/urban_areas/?embed=ua:item/ua:images`;
  let res1 = await fetch(urlCity);
   citiesData = await res1.json();
 
 })()
 function getCityImg(city) {
  for (let i = 0; i < citiesData["_embedded"]["ua:item"].length; i++) {
    if (citiesData["_embedded"]["ua:item"][i]["name"].toLowerCase() === city.toLowerCase()) {

      // console.log(citiesData["_embedded"]["ua:item"][i]["_embedded"]["ua:images"][
      //   "photos"
      // ][0]["image"]["mobile"])
      return citiesData["_embedded"]["ua:item"][i]["_embedded"]["ua:images"][
           "photos"
         ][0]["image"]["mobile"];
        

      break;
    }
  }
}
$('#far').click(function(){
  let fahrenheit = Math.floor(data.main.temp * 9 / 5 - 459.67);
  $('#temp').empty();
  $('#max').empty();
  $('#min').empty();
  $('#temp').append(fahrenheit + '°F');
  $('#max').append(fahrenheit + '°F');
  $('#min').append(fahrenheit + '°F');
})

/*document.getElementById('btn').onclick = searchCity;

function searchCity() {
  let city = document.getElementById('city').value;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=64c9384c61a11bef86287320dd197f1f`;
   console.log(url);
  if (city != '') {
    getWeather(url);


  } else alert('this Field cannot be empty');
}


function show(data) {
  document.getElementById('demo').innerHTML = data;

}
async function getWeather(url) {
  try {
    let res = await fetch(url);
    console.log(res);
    let data = await res.json();
    console.log(data);

    console.log(data.weather[0].description);
    show(data.weather[0].description);
  } catch (error) {
    console.log(error)
  }
}*/