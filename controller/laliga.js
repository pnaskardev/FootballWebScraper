const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


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
        const fullPage=$('.Table__TBODY');
        console.log(fullPage.attr('class'));
        // const allDivElements = fullPage.find('div');
        // const tableDiv = fullPage.find('.tournament-table-standings');
        // const tableDiv = fullPage.find('#tournament-table');
        // console.log(tableDiv.attr('id'));
        // console.log(tableDiv.html());
        // const allDivInsideTable=tableDiv.children();
        // console.log(allDivInsideTable.length);
        // allDivInsideTable.each(function(i, element) 
        // {   
        //     console.log('1');
        //     console.log($(this).attr('class'));
        // });
    });
}