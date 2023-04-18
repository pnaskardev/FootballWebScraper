const axios = require('axios');
const cheerio = require('cheerio');
const dotenv=require('dotenv');

dotenv.config();
const Standings=require('../models/standings');
const {Team}=require('../models/team');


exports.getData=async (league)=>
{
    console.log('inside getData');
    const url = `https://www.espn.in/football/table/_/league/${league}.1`;
    var list=[];
    console.log("inside getLaliga block");
    await axios.get(url).then(response=>
    {
        const $=cheerio.load
        (
            response.data,
        );
        const table=$('.Table__TBODY');
        console.log(table.attr('class'));
        const allTeams=table.children();
        console.log(allTeams.length/2);
        console.log(allTeams.length);
        for(var i=0;i<allTeams.length/2;i++)
        {
            var j=i+allTeams.length/2;
            console.log(j);
            let child=$(allTeams[i]).children();
            // console.log(child.attr('class'));
            let teamPosition=child.find('.team-position').text();
            // console.log(teamPosition);
            let teamLogo=child.find('.TeamLink__Logo > a').find('img').attr('src');
            let team=child.find('.hide-mobile > a');
            let teamName=team.text();
            let tableData=$(allTeams[j]).children();
            let gp=tableData.eq(0).text();
            let w=tableData.eq(1).text();
            let d=tableData.eq(2).text();
            let l=tableData.eq(3).text();
            let f=tableData.eq(4).text();
            let a=tableData.eq(5).text();
            let gd=tableData.eq(6).text();
            let p=tableData.eq(7).text();
            console.log(teamName);
            let teamObject=new Team
            (
                {
                    teamPosition,
                    teamLogo,
                    teamName,
                    gp,
                    w,
                    d,
                    l,
                    f,
                    a,
                    gd,
                    p
                }
            );
            list.push(teamObject);
        }
    });
    console.dir(list);

    try 
    {
        // check if there is already data stored for this league
        let leagueData=await Standings.findOne({leagueName:league});
        if (leagueData) 
        {
            // if there is existing data, update it
            leagueData.teams = list;
        }
        else 
        {
            // if there is no existing data, create a new instance of your league model
            leagueData = new Standings
            ({
                leagueName: league,
                teams: list
            });
        }

        // save the league data to MongoDB
        leagueData.save();
    } catch (error) 
    {
        console.log(error);    
    }

}