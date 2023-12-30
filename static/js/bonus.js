//function that creates the gauge chart

function createGaugeChart(sample) {
    d3.json(url).then((data) => {

        let metadata = data.metadata;
        let value = metadata.filter(result => result.id == sample);
        console.log(value)

        let valueData = value[0];

        // used obejct.values method to get the value of the 6th property, the wfreq
        let washFrequency = Object.values(valueData)[6];

        let trace2 = {
            value: washFrequency,
            domain: { x: [0, 1], y: [0, 1] },
            title: {
                text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Weel",
                font: { color: "black", size: 16 }
            },
            type: "indicator",
            mode: "gauge+ number",
            gauge: {
                axis: { range: [0, 10], tickmode: "linear", tick0: 2, dtick: 2 },
                
                bar: { color: "red" },
                steps: [
                    { range: [0, 5], color: "beige" },
                    { range: [5, 7], color: "lightblue"},
                    { range: [7, 10], color: "royalblue" }
                  ]
            }
        }

        let layout = {
            width: 400,
            height: 400,
            margin: { t: 0, b: 0 }
        };

        Plotly.newPlot("gauge", [trace2], layout)
    });
};