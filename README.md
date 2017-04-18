#IronHacks 2017

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

[Y] Basic Map with specific location: centered at the zipcode users entered.
[Y/N] Markers for location of markets
[Y/N] Labels for markets' names
[Y] InfoWindow to show detail information of a market

Data Visualization:

[Y/N] [describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...)
[Y/N] [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables ...)

Interaction Form:

[Y/N] [List] Any information output? list them. (text field, text area, label, plain HTML ...)
[Y/N] [List] Any operation option (filters)? List them. (search markets, search vegetables, filter based on price, sort based on convenience ...)
[Y/N] [List] Any information input? List them. (comments, markers, user preference ...)
[Y/N] [List] Interaction with Map? List them. (filter on price will affect map markers, sort on price will affect map markers, ...)
[Y/N] [List] Interaction with data visualization? List them. (filter, sort, set variables ...)

5. Build Case How can we build and access your project on a Linux/Unix machine if you use external dependencies besides HTML/CSS/Javascript? List the dependencies you used, such as python, node.js, etc. List the steps we should follow to build the project.

6. Test Case Which browsers did you test your project on? Chrome, 

7. Additional information You Want to Share with Us E.g. any problems you faced/fixed, where you reached out to for help, etc.