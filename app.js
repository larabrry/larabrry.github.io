const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


function init() {
    let dropdownMenu = d3.selectAll('#selDataset');

    //samples.json is considered to be a dynamic data
    d3.json(url).then((data) => {

        let names = data.names;
        //used the forEach method to populate the dropdownMenu
        names.forEach((id) => {
            dropdownMenu.append("option")
                .text(id)
                .property("value", id);

        });

        //used the first sample from the names array to create the initial charts
        let sample1 = names[0];

        createBarChart(sample1);
        createBubbleChart(sample1);
        createMetadata(sample1);
        createGaugeChart(sample1);

    });

    
};


// function to update the charts as new sample is selected
function optionChanged(value) {

    updatePlotly(value);
};

// function that creates the bar chart
function createBarChart(sample) {

    d3.json(url).then((data) => {

        let sampleData = data.samples;

        // filtered the data by each individual "id"
        let value = sampleData.filter(result => result.id == sample);

        // stored the elements needed in variable
        let valueData = value[0];
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // used the slice method to get the top ten results for each element, used reverse to display data in descending order
        let xTicks = sample_values.slice(0, 10).reverse();
        let yTicks = otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let labels = otu_labels.slice(0, 10).reverse();

        let trace = {
            x: xTicks,
            y: yTicks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        let layout = {
            title: "Top 10 OTUs Per Individual"
        };

        Plotly.newPlot("bar", [trace], layout)

    });
};

//function that creates the bubble chart

function createBubbleChart(sample) {
    d3.json(url).then((data) => {

        // stored the sample array in a variable
        let sampleData = data.samples;
        // filtered by each id
        let value = sampleData.filter(result => result.id == sample);

        // stored needed elemants in variables
        let valueData = value[0];
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;


        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: { title: "OTU ID" },
        };

        Plotly.newPlot("bubble", [trace1], layout);
    });
};

//function that displays the sample metadata

function createMetadata(sample) {
    d3.json(url).then((data) => {
        
        // assigned the metadata array to a variable
        let metadata = data.metadata;

        // filtered by each id, then stored the id in a variable
        let value = metadata.filter(result => result.id == sample);
        let valueData = value[0];

        // selected the metadata panel and cleared it prior to populating it
        d3.select("#sample-metadata").html("");

        // used the object.entries method to get the keys and values pairs, then appended the demographic panel
        Object.entries(valueData).forEach(([key, value]) => {
            console.log(`${key}:${value}`);

            d3.select("#sample-metadata").append("h5").text(`${key}:${value}`);
        });
    });
};


//function that updates all the charts when a new sample is selected
function updatePlotly(value) {

    createBarChart(value);
    createBubbleChart(value);
    createMetadata(value);
    createGaugeChart(value);
};


init();

