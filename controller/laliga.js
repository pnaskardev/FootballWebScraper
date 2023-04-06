const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


const url = 'https://www.flashscore.com/football/spain/laliga/standings/#/COQ6iu30/table/overall';

exports.getlaliga=(req,res,next)=>
{
   
    axios.get(url).then(response=>
    {
        var list=[];
        console.log("inside getLaliga block");
        const $=cheerio.load(response.data);
        const fullPage=$('.container');
        // console.log(fullPage.html());
        // const allDivElements = fullPage.find('div');
        // const tableDiv = fullPage.find('.tournament-table-standings');
        const tableDiv = fullPage.find('#tournament-table');
        console.log(tableDiv.attr('id'));
        console.log(tableDiv.html());
        // const allDivInsideTable=tableDiv.children();
        // console.log(allDivInsideTable.length);
        // allDivInsideTable.each(function(i, element) 
        // {   
        //     console.log('1');
        //     console.log($(this).attr('class'));
        // });
    });
}