#IronHacks 2017 - Sijin Wang

1. Name: Great Lafayette Markets

2. Keywords You should include at least 3 keywords for your project to identify the features of your project: category, distance, schedule(open time)

3. Description of the datasets and function design

	Please provide a name+link+basicInfo to each dataset you have used.
		
		1)Agricultural Marketing Service https://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html Local markets info 
		
		2)GHCND dataset https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND using the updated temperature info
		
	Used the primary dataset ”online climate data” from data.gov as the second dataset above.
	All these datasets are from data.gov or data.indy.gov.

4.Brief Description
	The site currently only works for West Lafayette / Lafayette area because of the dataset limitation. Users need to enter their zip code at the first page to get all local markets around that zipcode. 


Fill in the structued description:

Map View:

Basic Map with specific location: centered at the zipcode users entered.
Markers for location of markets. Mouseover on marker to see the name. Click to see more information.

Data Visualization:

Using radar chart to evaluate each markets

Interaction Form:

Local farmer markets outputs are listed in a table and the detailed information about local markets.
Input information: zip code to locate the user and find markets around that zip code in Lafayette / West Lafayette area.

5. Build Case How can we build and access your project on a Linux/Unix machine if you use external dependencies besides HTML/CSS/Javascript? List the dependencies you used, such as python, node.js, etc. List the steps we should follow to build the project. NO.

6. Test Case Which browsers did you test your project on? Chrome, Safari.

7. Additional information You Want to Share with Us: 
	1) Time limitation: near final week, I can not focus on this project all the time.
	2) It is hard to find related data, like the average rate of a market or prices in that market.
	3) Do not know why click event is nor working on markers.(if I have more time, I believe I can fix this).
	4) Due to 3), there is no visualization at current stage.