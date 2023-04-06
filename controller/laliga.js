const axios = require('axios');
const cheerio = require('cheerio');


const url = 'https://www.espn.in/football/table/_/league/esp.1';

exports.getlaliga=(req,res,next)=>
{
    var list=[];
    console.log("inside getLaliga block");
    axios.get(url).then(response=>
    {
        const $=cheerio.load
        (
            response.data,
        );
        const table=$('.Table__TBODY');
        console.log(table.attr('class'));
        const allTeams=table.children();
        console.log(allTeams.length);
        allTeams.each(function(i,element) 
        {   
            // console.log($(element).attr('class'));
            console.log($(element).children().length);
        });
    });
}