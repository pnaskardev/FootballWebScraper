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
        // allTeams.each(function(i,element) 
        // {   
        //     // console.log($(element).attr('class'));
        //     // console.log($(element).children().length);
        
        // });let
        for(var i=0;i<20;i++)
        {
            var j=i+20;
            let child=$(allTeams[i]).children();
            // console.log(child.attr('class'));
            let teamPosition=child.find('.team-position').text();
            // console.log(teamPosition);
            let teamLogo=child.find('.TeamLink__Logo > a').find('img');
            // console.log(teamLogo.attr('url'));
            let team=child.find('.hide-mobile > a');
            let teamname=team.text();
            let tableData=$(allTeams[j]).children();
            let gp=tableData.eq(0).text();
            let w=tableData.eq(1).text();
            let d=tableData.eq(2).text();
            let l=tableData.eq(3).text();
            let f=tableData.eq(4).text();
            let a=tableData.eq(5).text();
            let gd=tableData.eq(6).text();
            let p=tableData.eq(7).text();
        }
    });
}